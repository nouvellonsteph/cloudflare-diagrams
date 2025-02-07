import React, { useState, useEffect } from 'react';
import IconGallery from './IconGallery';
import { getAvailableIcons } from '../../utils/iconUtils';

// Get icon name from path by removing .svg extension
const getIconName = (path: string) => {
  const filename = path.split('/').pop() || '';
  return filename.replace('.svg', '');
};

interface CustomNodeFormProps {
  onSubmit: (data: { name: string; category: string; iconUrl: string }) => void;
}

const CustomNodeForm: React.FC<CustomNodeFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [availableIcons, setAvailableIcons] = useState<string[]>([]);

  useEffect(() => {
    // Load icons when component mounts
    getAvailableIcons().then(icons => {
      //console.log('Available icons:', icons);
      setAvailableIcons(icons);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && category) {
      onSubmit({ name, category, iconUrl });
      setName('');
      setCategory('');
      setIconUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '12px', borderTop: '1px solid #eee' }}>
      <div style={{ marginBottom: '12px' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            marginBottom: '8px'
          }}
          required
        />
        
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            marginBottom: '8px',
            backgroundColor: 'white'
          }}
          required
        >
        </input>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
          {iconUrl && (
            <img 
              src={iconUrl} 
              alt="Selected icon" 
              style={{ width: '24px', height: '24px' }} 
            />
          )}
          <button
            type="button"
            onClick={() => setIsGalleryOpen(true)}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'white',
              cursor: 'pointer',
              textAlign: 'left',
              color: iconUrl ? 'black' : '#666'
            }}
          >
            {iconUrl ? getIconName(iconUrl) : 'Select icon (optional)'}
          </button>
          {iconUrl && (
            <button
              type="button"
              onClick={() => setIconUrl('')}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'white',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      <IconGallery
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        icons={availableIcons}
        onSelectIcon={(icon) => {
          setIconUrl(icon);
          setIsGalleryOpen(false);
        }}
      />

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#f6821f',
          color: 'white',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Create Custom Node
      </button>
    </form>
  );
};

export default CustomNodeForm;
