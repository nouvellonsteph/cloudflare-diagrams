import React from 'react';

interface IconGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  icons: string[];
  onSelectIcon: (iconPath: string) => void;
}

const IconGallery: React.FC<IconGalleryProps> = ({ isOpen, onClose, icons, onSelectIcon }) => {
  if (!isOpen) return null;

  // Get icon name from path by removing .svg extension
  const getIconName = (path: string) => {
    const filename = path.split('/').pop() || '';
    return filename.replace('.svg', '');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '800px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
          <h2 style={{ margin: 0 }}>Select Icon</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '5px',
            }}
          >
            ×
          </button>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '16px',
        }}>
          {icons.map((icon) => (
            <div
              key={icon}
              onClick={() => onSelectIcon(icon)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
                border: '1px solid #eee',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                backgroundColor: 'white',
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f5f5f5';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = 'white';
              }}
            >
              <img
                src={icon}
                alt={getIconName(icon)}
                style={{
                  width: '40px',
                  height: '40px',
                  marginBottom: '8px',
                }}
              />
              <span style={{
                fontSize: '12px',
                textAlign: 'center',
                wordBreak: 'break-word',
              }}>
                {getIconName(icon)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IconGallery;
