import { memo, useState } from 'react';
import { Handle } from 'reactflow';
import Node from 'reactflow';
import useDiagramStore from '../../store/diagramStore';

// Po ition enum since it's not exported from reactflow
enum Position {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom'
}

export interface CloudflareNodeData {
  productId?: string;
  name: string;
  category: string;
  iconUrl?: string;
}

const CloudflareNode = memo(({ data, id }: Node<CloudflareNodeData>) => {
  const [isHovered, setIsHovered] = useState(false);
  const { removeNode } = useDiagramStore();
  return (
    <div 
      className="cloudflare-node" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
      background: 'white',
      border: '1px solid #e5e5e5',
      padding: '10px',
      borderRadius: '8px',
      width: '150px',
      position: 'relative',
    }}>
      {isHovered && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeNode(id);
          }}
          style={{
            position: 'absolute',
            top: -10,
            right: -10,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#ff4444',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            padding: 0,
            zIndex: 10
          }}
        >
          ×
        </button>
      )}
      {/* Invisible handles with larger hit areas */}
      {/* Handles that work as both source and target */}
      {/* Source handles */}
      <Handle 
        type="source"
        id="top-source"
        position={Position.Top} 
        style={{ 
          background: '#4f46e5',
          width: '8px',
          height: '8px',
          border: '2px solid white',
          top: -4
        }}
        isConnectable={true}
      />
      <Handle 
        type="source"
        id="bottom-source"
        position={Position.Bottom} 
        style={{ 
          background: '#4f46e5',
          width: '8px',
          height: '8px',
          border: '2px solid white',
          bottom: -4
        }}
        isConnectable={true}
      />
      <Handle 
        type="source"
        id="left-source"
        position={Position.Left} 
        style={{ 
          background: '#4f46e5',
          width: '8px',
          height: '8px',
          border: '2px solid white',
          left: -4
        }}
        isConnectable={true}
      />
      <Handle 
        type="source"
        id="right-source"
        position={Position.Right} 
        style={{ 
          background: '#4f46e5',
          width: '8px',
          height: '8px',
          border: '2px solid white',
          right: -4
        }}
        isConnectable={true}
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '40px', height: '40px' }}>
          <img 
            src={data.iconUrl || (data.productId ? `src/assets/icons/${data.productId}.svg` : '')}
            alt={data.name}
            style={{ width: '100%', height: '100%' }}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4eiIvPjwvc3ZnPg==';
            }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 'bold' }}>{data.name}</div>
          <div style={{ fontSize: '0.8em', color: '#666666' }}>{data.category}</div>
        </div>
      </div>
    </div>
  );
});

export default CloudflareNode;
