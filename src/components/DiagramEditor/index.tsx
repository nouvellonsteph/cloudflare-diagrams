import React, { useCallback, useRef, useState, DragEvent, KeyboardEvent } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from 'reactflow';
import ReactFlowInstance from 'reactflow';
import NodeDragHandler from 'reactflow';
import OnEdgesDelete from 'reactflow';
import OnNodesDelete from 'reactflow';
import Edge from 'reactflow';
import Connection from 'reactflow';
import NodeTypes from 'reactflow';
import Node from 'reactflow';
import 'reactflow/dist/style.css';

import CloudflareNode from './CloudflareNode';
import EdgeMenu from './EdgeMenu';
import ProductSelector from './ProductSelector';
import useDiagramStore from '../../store/diagramStore';

const nodeTypes: NodeTypes = {
  cloudflareProduct: CloudflareNode,
};

const DiagramEditor: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = React.useState<ReactFlowInstance | null>(null);
  const {
    getCurrentDiagram,
    addEdge: addEdgeToStore,
    updateEdge: updateEdgeInStore,
    removeEdge: removeEdgeFromStore,
    updateNode,
    addNode,
    removeNode,
  } = useDiagramStore();

  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

  const diagram = getCurrentDiagram();

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge: Edge = {
        id: `e${connection.source}-${connection.target}-${Math.random().toString(36).substring(2, 9)}`, // Use random string for uniqueness
        source: connection.source!,
        target: connection.target!,
        type: 'default',
        targetHandle: connection.targetHandle,
        sourceHandle: connection.sourceHandle,
        label: '',
        data: { editable: true }
      };
      console.log('onConnect', connection, edge);
      addEdgeToStore(edge);
    },
    [addEdgeToStore]
  );

  const onEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      if (!edge.data?.editable) return;
      
      event.stopPropagation();
      setSelectedEdge(edge);
      setMenuPosition({ x: event.clientX, y: event.clientY });
    },
    []
  );

  const handleCloseMenu = useCallback(() => {
    setSelectedEdge(null);
    setMenuPosition(null);
  }, []);

  const onEdgeDelete: OnEdgesDelete = useCallback(
    (edges: Edge[]) => {
      edges.forEach(edge => removeEdgeFromStore(edge.id));
      console.log('onEdgeDelete', edges);
    },
    [removeEdgeFromStore]
  );

  const onNodesDelete: OnNodesDelete = useCallback(
    (nodes: Node[]) => {
      nodes.forEach(node => removeNode(node.id));
      console.log('onNodesDelete', nodes);
    },
    [removeNode]
  );

  const onNodeDrag: NodeDragHandler = useCallback(
    (_: MouseEvent, node: Node) => {
      const { id, position } = node;
      updateNode(id, { position });
    },
    [updateNode]
  );

  const onNodeDragStop = onNodeDrag;

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));

      // Get the position where the node was dropped
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: `${data.data.productId}-${Date.now()}`,
        type: data.type,
        position,
        data: data.data,
      };

      addNode(newNode);
    },
    [reactFlowInstance, addNode]
  );

  const onSelectionChange = useCallback((params: { nodes: Node[] }) => {
    setSelectedNodes(params.nodes);
    // Focus the wrapper div when a node is selected to enable keyboard events
    if (params.nodes.length > 0 && reactFlowWrapper.current) {
      reactFlowWrapper.current.focus();
    }
  }, []);

  if (!diagram) {
    return null;
  }

  return (
    <div 
      ref={reactFlowWrapper}
      style={{ width: '100%', height: '100vh' }}
      tabIndex={0} // Make div focusable to capture keyboard events
    >
      <ReactFlow
        nodes={diagram.nodes}
        edges={diagram.edges}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onEdgesDelete={onEdgeDelete}
        onNodesDelete={onNodesDelete}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onEdgeClick={onEdgeClick}
        onSelectionChange={onSelectionChange}
        fitView
        defaultEdgeOptions={{
          type: 'default',
          animated: false,
          style: { stroke: '#999', strokeWidth: 2, color: '#999' },
          markerEnd: {
            type: 'arrowclosed',
            width: 10,
            height: 10,
            color: '#999'
          },
          data: { editable: true }
        }}
        connectionMode="loose"
        snapToGrid={true}
        snapGrid={[15, 15]}
      >
        <ProductSelector reactFlowInstance={reactFlowInstance} />
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      {selectedEdge && menuPosition && (
        <EdgeMenu
          edge={selectedEdge}
          position={menuPosition}
          onClose={handleCloseMenu}
          onUpdate={updateEdgeInStore}
        />
      )}
    </div>
  );
};

export default DiagramEditor;
