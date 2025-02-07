import React, { useState, useEffect } from 'react';
import { CLOUDFLARE_CATEGORIES } from '../../utils/cloudflareProducts';

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
  const [availableIcons, setAvailableIcons] = useState<string[]>([]);

  useEffect(() => {
    // Fetch list of icons from public/icons directory
    fetch('/icons')
      .then(response => response.text())
      .then(text => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const links = Array.from(doc.querySelectorAll('a'))
          .map(a => a.getAttribute('href'))
          .filter(href => href && href.endsWith('.svg'))
          .map(href => href as string);
        setAvailableIcons(links);
      })
      .catch(console.error);
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

        <select
          value={iconUrl}
          onChange={(e) => setIconUrl(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            marginBottom: '8px',
            backgroundColor: 'white'
          }}
        >
          <option value="">Select icon (optional)</option>
          {availableIcons.map((icon) => (
            <option key={icon} value={`/icons/${icon}`}>
              {getIconName(icon)}
            </option>
          ))}
        </select>
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
