import { CloudflareDiagram } from '../src/types';
import type { KVNamespace, EventContext } from '@cloudflare/workers-types';

interface Env {
  diagrams: KVNamespace;
}

export async function onRequestPost(context: EventContext<Env, string, Record<string, unknown>>) {
  try {
    // Parse the request body
    const diagram: CloudflareDiagram = await context.request.json();

    // Generate a unique ID for the shared diagram
    const sharedId = crypto.randomUUID();

    // Store the diagram in KV
    await context.env.diagrams.put(sharedId, JSON.stringify(diagram));

    // Return the sharing ID
    return new Response(JSON.stringify({ id: sharedId }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (error: unknown) {
    console.error('Failed to share diagram:', error);
    return new Response(JSON.stringify({ error: 'Failed to share diagram' }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
}

export async function onRequestGet(context: EventContext<Env, string, Record<string, unknown>>) {
  try {
    // Get the diagram ID from the URL
    const url = new URL(context.request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'Diagram ID is required' }), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 400,
      });
    }

    // Get the diagram from KV
    const diagram = await context.env.diagrams.get(id);

    if (!diagram) {
      return new Response(JSON.stringify({ error: 'Diagram not found' }), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 404,
      });
    }

    // Return the diagram
    return new Response(diagram, {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (error: unknown) {
    console.error('Failed to retrieve diagram:', error);
    return new Response(JSON.stringify({ error: 'Failed to retrieve diagram' }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
}
