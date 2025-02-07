import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type Node from 'reactflow';
import type Edge from 'reactflow';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import { CloudflareDiagram, DiagramStore } from '../types';

const generateId = () => Math.random().toString(36).substring(2, 9);

// Migrate existing diagrams to use 'default' edge type
const migrateDiagrams = (diagrams: CloudflareDiagram[]): CloudflareDiagram[] => {
  return diagrams.map(diagram => ({
    ...diagram,
    edges: diagram.edges.map(edge => ({
      ...edge,
      type: 'default'
    }))
  }));
};

const useDiagramStore = create<DiagramStore>()(
  persist(
    (set, get) => ({
      diagrams: migrateDiagrams([]),
      currentDiagramId: null,

      getCurrentDiagram: () => {
        const { diagrams, currentDiagramId } = get();
        return diagrams.find(d => d.id === currentDiagramId) || null;
      },

      createDiagram: (name: string) => {
        const newDiagram: CloudflareDiagram = {
          id: generateId(),
          name,
          nodes: [],
          edges: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set(state => ({
          diagrams: [...state.diagrams, newDiagram],
          currentDiagramId: newDiagram.id,
        }));
      },

      updateDiagram: (id: string, updates: Partial<CloudflareDiagram>) => {
        set(state => ({
          diagrams: state.diagrams.map(diagram =>
            diagram.id === id
              ? {
                  ...diagram,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : diagram
          ),
        }));
      },

      deleteDiagram: (id: string) => {
        set(state => ({
          diagrams: state.diagrams.filter(d => d.id !== id),
          currentDiagramId:
            state.currentDiagramId === id ? null : state.currentDiagramId,
        }));
      },

      setCurrentDiagram: (id: string) => {
        set({ currentDiagramId: id });
      },

      addNode: (node: Node) => {
        const diagram = get().getCurrentDiagram();
        if (!diagram) return;

        set(state => ({
          diagrams: state.diagrams.map(d =>
            d.id === diagram.id
              ? {
                  ...d,
                  nodes: [...d.nodes, node],
                  updatedAt: new Date().toISOString(),
                }
              : d
          ),
        }));
      },

      updateNode: (nodeId: string, updates: Partial<Node>) => {
        const diagram = get().getCurrentDiagram();
        if (!diagram) return;

        set(state => ({
          diagrams: state.diagrams.map(d =>
            d.id === diagram.id
              ? {
                  ...d,
                  nodes: d.nodes.map(node =>
                    node.id === nodeId ? { ...node, ...updates } : node
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : d
          ),
        }));
      },

      removeNode: (nodeId: string) => {
        const diagram = get().getCurrentDiagram();
        if (!diagram) return;

        set(state => ({
          diagrams: state.diagrams.map(d =>
            d.id === diagram.id
              ? {
                  ...d,
                  nodes: d.nodes.filter(node => node.id !== nodeId),
                  edges: d.edges.filter(
                    edge => edge.source !== nodeId && edge.target !== nodeId
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : d
          ),
        }));
      },

      addEdge: (edge: Edge) => {
        const diagram = get().getCurrentDiagram();
        if (!diagram) return;

        // Ensure edge type is always 'default'
        const normalizedEdge = {
          ...edge,
          type: 'default'
        };

        

        set(state => ({
          diagrams: state.diagrams.map(d =>
            d.id === diagram.id
              ? {
                  ...d,
                  edges: [...d.edges, normalizedEdge],
                  updatedAt: new Date().toISOString(),
                }
              : d
          ),
        }));
      },

      updateEdge: (edgeId: string, updates: Partial<Edge>) => {
        const diagram = get().getCurrentDiagram();
        if (!diagram) return;

        set(state => ({
          diagrams: state.diagrams.map(d =>
            d.id === diagram.id
              ? {
                  ...d,
                  edges: d.edges.map(edge =>
                    edge.id === edgeId
                      ? { ...edge, ...updates, type: 'default' }
                      : edge
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : d
          ),
        }));
      },

      removeEdge: (edgeId: string) => {
        const diagram = get().getCurrentDiagram();
        if (!diagram) return;

        set(state => ({
          diagrams: state.diagrams.map(d =>
            d.id === diagram.id
              ? {
                  ...d,
                  edges: d.edges.filter(edge => edge.id !== edgeId),
                  updatedAt: new Date().toISOString(),
                }
              : d
          ),
        }));
      },

      exportDiagram: async (format: 'svg' | 'png' | 'jpeg') => {
        const element = document.querySelector('.react-flow') as HTMLElement;
        if (!element) throw new Error('Flow element not found');

        const exportFunctions = {
          svg: toSvg,
          png: toPng,
          jpeg: toJpeg,
        };

        return exportFunctions[format](element, {
          quality: 1,
          backgroundColor: '#ffffff',
        });
      },
    }),
    {
      name: 'cloudflare-diagram-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Migrate any existing diagrams when the store is rehydrated
          state.diagrams = migrateDiagrams(state.diagrams);
        }
      },
    }
  )
);

export default useDiagramStore;
