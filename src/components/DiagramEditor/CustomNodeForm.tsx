import React, { useState } from 'react';
import { CLOUDFLARE_CATEGORIES } from '../../utils/cloudflareProducts';

interface CustomNodeFormProps {
  onSubmit: (data: { name: string; category: string; iconUrl: string }) => void;
}

const CustomNodeForm: React.FC<CustomNodeFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [iconUrl, setIconUrl] = useState('');

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
          placeholder="Node name"
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            marginBottom: '8px'
          }}
          required
        />
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          <option value="">Select category</option>
          {Object.values(CLOUDFLARE_CATEGORIES).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="url"
          value={iconUrl}
          onChange={(e) => setIconUrl(e.target.value)}
          placeholder="Icon URL (optional)"
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            marginBottom: '8px'
          }}
        />
      </div>

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
