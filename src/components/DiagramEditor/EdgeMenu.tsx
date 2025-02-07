import React from 'react';
import type Edge from 'reactflow';

interface EdgeMarker {
  type: 'arrow' | 'arrowclosed';
  width: number;
  height: number;
  color: string;
}
import styles from './EdgeMenu.module.css';

interface EdgeMenuProps {
  edge: Edge;
  position: { x: number; y: number };
  onClose: () => void;
  onUpdate: (edgeId: string, updates: Partial<Edge>) => void;
}

const EdgeMenu: React.FC<EdgeMenuProps> = ({ edge, position, onClose, onUpdate }) => {
  const [config, setConfig] = React.useState({
    animated: edge.animated || false,
    arrowType: edge.markerEnd ? 'arrow' : 'none',
    color: edge.style?.stroke || '#999',
    label: edge.label || '',
    style: edge.style?.strokeDasharray ? 'dashed' : 'solid'
  });

  // Update local state when edge prop changes
  React.useEffect(() => {
    setConfig({
      animated: edge.animated || false,
      arrowType: edge.markerEnd ? 'arrow' : 'none',
      color: edge.style?.stroke || '#999',
      label: edge.label || '',
      style: edge.style?.strokeDasharray ? 'dashed' : 'solid'
    });
  }, [edge]);

  const handleAnimatedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setConfig(prev => ({ ...prev, animated: newValue }));
    onUpdate(edge.id, { 
      animated: newValue,
      style: {
        ...edge.style,
        stroke: config.color,
      },
      markerEnd: config.arrowType === 'arrow' ? {
        type: 'arrowclosed',
        width: 10,
        height: 10,
        color: config.color
      } : undefined
    });
  };

  const handleArrowChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setConfig(prev => ({ ...prev, arrowType: value }));
    onUpdate(edge.id, {
      style: {
        ...edge.style,
        stroke: config.color,
      },
      markerEnd: value === 'none' ? undefined : {
        type: 'arrowclosed',
        width: 10,
        height: 10,
        color: config.color
      }
    });
  };

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    // If switching to solid, turn off animation
    const newAnimated = value === 'solid' ? false : config.animated;
    setConfig(prev => ({ ...prev, style: value, animated: newAnimated }));
    onUpdate(edge.id, {
      style: {
        ...edge.style,
        stroke: config.color,
        strokeDasharray: value === 'dashed' ? '5,5' : undefined,
      },
      animated: newAnimated,
      markerEnd: config.arrowType === 'arrow' ? {
        type: 'arrowclosed',
        width: 10,
        height: 10,
        color: config.color
      } : undefined
    });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setConfig(prev => ({ ...prev, color }));
    onUpdate(edge.id, {
      style: {
        ...edge.style,
        stroke: color,
      },
      markerEnd: config.arrowType === 'arrow' ? {
        type: 'arrowclosed',
        width: 10,
        height: 10,
        color
      } : undefined
    });
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfig(prev => ({ ...prev, label: value }));
    onUpdate(edge.id, { 
      label: value,
      style: {
        ...edge.style,
        stroke: config.color,
      },
      markerEnd: config.arrowType === 'arrow' ? {
        type: 'arrowclosed',
        width: 10,
        height: 10,
        color: config.color
      } : undefined
    });
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.menu}`)) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  return (
    <div 
      className={styles.menu}
      style={{ 
        left: position.x,
        top: position.y,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.menuItem}>
        <label>Arrow:</label>
        <select value={config.arrowType} onChange={handleArrowChange}>
          <option value="none">None</option>
          <option value="arrow">Arrow</option>
        </select>
      </div>
      {config.style === 'dashed' && (
        <div className={styles.menuItem}>
          <label>
            <input
              type="checkbox"
              checked={config.animated}
              onChange={handleAnimatedChange}
            />
            Animated
          </label>
        </div>
      )}
      <div className={styles.menuItem}>
        <label>Color:</label>
        <input
          type="color"
          value={config.color}
          onChange={handleColorChange}
        />
      </div>
      <div className={styles.menuItem}>
        <label>Label:</label>
        <input
          type="text"
          value={config.label}
          onChange={handleLabelChange}
          placeholder="Enter label"
        />
      </div>
      <div className={styles.menuItem}>
        <label>Style:</label>
        <select value={config.style} onChange={handleStyleChange}>
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
        </select>
      </div>
    </div>
  );
};

export default EdgeMenu;
