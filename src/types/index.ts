import type Node from 'reactflow';
import type Edge from 'reactflow';


export interface CloudflareDiagram {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
  createdAt: string;
  updatedAt: string;
}

export interface DiagramStore {
  diagrams: CloudflareDiagram[];
  currentDiagramId: string | null;
  getCurrentDiagram: () => CloudflareDiagram | null;
  createDiagram: (name: string) => void;
  updateDiagram: (id: string, updates: Partial<CloudflareDiagram>) => void;
  deleteDiagram: (id: string) => void;
  setCurrentDiagram: (id: string) => void;
  addNode: (node: Node) => void;
  updateNode: (nodeId: string, updates: Partial<Node>) => void;
  removeNode: (nodeId: string) => void;
  addEdge: (edge: Edge) => void;
  updateEdge: (edgeId: string, updates: Partial<Edge>) => void;
  removeEdge: (edgeId: string) => void;
  exportDiagram: (format: 'svg' | 'png' | 'jpeg') => Promise<string>;
}

export interface CloudflareProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
}
