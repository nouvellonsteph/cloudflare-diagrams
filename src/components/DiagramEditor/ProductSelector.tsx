import React, { useState } from 'react';
import ReactFlowInstance from 'reactflow';
import { CLOUDFLARE_CATEGORIES, CLOUDFLARE_PRODUCTS } from '../../utils/cloudflareProducts';
import CustomNodeForm from './CustomNodeForm';
import useDiagramStore from '../../store/diagramStore';

interface ProductSelectorProps {
  reactFlowInstance?: ReactFlowInstance | null;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({ reactFlowInstance }) => {
  const { addNode } = useDiagramStore();
  const [showCustomForm, setShowCustomForm] = useState(false);

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>, 
    productId?: string, 
    customData?: { name: string; category: string; iconUrl: string }
  ) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({
      type: 'cloudflareProduct',
      data: customData || {
        productId,
        name: CLOUDFLARE_PRODUCTS.find(p => p.id === productId)?.name,
        category: CLOUDFLARE_PRODUCTS.find(p => p.id === productId)?.category,
      },
    }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style={{
      position: 'absolute',
      right: '20px',
      top: '20px',
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      width: '250px',
      maxHeight: 'calc(100vh - 200px)',
      overflowY: 'auto',
      zIndex: 1000,
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '16px' 
      }}>
        <h3 style={{ margin: 0 }}>Cloudflare Products</h3>
        <button
          onClick={() => setShowCustomForm(!showCustomForm)}
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
        >
          {showCustomForm ? 'Hide Custom' : 'Add Custom'}
        </button>
      </div>

      {showCustomForm && (
        <CustomNodeForm
          onSubmit={(data) => {
            if (reactFlowInstance) {
              // Position at top left with margin
              const topLeft = reactFlowInstance.project({
                x: 50, // 50px margin from left
                y: 50, // 50px margin from top
              });

              // Create and add the new node
              const newNode = {
                id: `custom-${Date.now()}`,
                type: 'cloudflareProduct',
                position: topLeft,
                data: {
                  name: data.name,
                  category: data.category,
                  iconUrl: data.iconUrl
                },
              };

              addNode(newNode);
              setShowCustomForm(false);
            }
          }}
        />
      )}
      
      {Object.values(CLOUDFLARE_CATEGORIES).map(category => (
        <div key={category} style={{ marginBottom: '20px' }}>
          <h4 style={{ 
            color: 'var(--text-secondary)',
            fontSize: '0.9em',
            marginBottom: '8px'
          }}>
            {category}
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {CLOUDFLARE_PRODUCTS
              .filter(product => product.category === category)
              .map(product => (
                <div
                  key={product.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, product.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)',
                    cursor: 'grab',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget;
                    target.style.transform = 'translateY(-2px)';
                    target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget;
                    target.style.transform = 'none';
                    target.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ width: '24px', height: '24px' }}>
                    <img 
                      src={`/icons/${product.id}.svg`}
                      alt={product.name}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <div>
                    <div style={{ fontWeight: 500 }}>{product.name}</div>
                    <div style={{ 
                      fontSize: '0.8em',
                      color: 'var(--text-secondary)'
                    }}>
                      {product.description}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSelector;
