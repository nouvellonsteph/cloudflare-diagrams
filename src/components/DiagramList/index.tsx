import React, { useState, useCallback } from 'react';
import useDiagramStore from '../../store/diagramStore';

type ExportFormat = 'svg' | 'png' | 'jpeg';

const DiagramList: React.FC = () => {
  const { diagrams, createDiagram, deleteDiagram, setCurrentDiagram, currentDiagramId, exportDiagram } = useDiagramStore();
  const [newDiagramName, setNewDiagramName] = useState('');
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    diagramId: string;
  } | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Close context menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleContextMenu = useCallback((e: React.MouseEvent, diagramId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      diagramId
    });
  }, []);

  const handleExport = async (format: ExportFormat, diagramId: string) => {
    try {
      setIsExporting(true);
      setCurrentDiagram(diagramId);
      const dataUrl = await exportDiagram(format);
      
      // Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = dataUrl;
      const diagram = diagrams.find(d => d.id === diagramId);
      link.download = `${diagram?.name}-${new Date().toISOString()}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export diagram. Please try again.');
    } finally {
      setIsExporting(false);
      setContextMenu(null);
    }
  };

  const handleCreateDiagram = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDiagramName.trim()) {
      createDiagram(newDiagramName.trim());
      setNewDiagramName('');
    }
  };

  return (
    <div style={{
      padding: '20px',
      borderRight: '1px solid #ddd',
      width: isCollapsed ? '60px' : '300px',
      height: '100vh',
      overflowY: 'auto',
      backgroundColor: '#f8f9fa',
      transition: 'width 0.3s ease'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        {!isCollapsed && <h2 style={{ margin: 0 }}>Diagrams</h2>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            backgroundColor: 'white',
            cursor: 'pointer',
            marginLeft: 'auto'
          }}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      
      {!isCollapsed && (
        <form onSubmit={handleCreateDiagram} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={newDiagramName}
              onChange={(e) => setNewDiagramName(e.target.value)}
              placeholder="New diagram name"
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                flex: 1,
                minWidth: 0
              }}
            />
            <button
              type="submit"
              disabled={!newDiagramName.trim()}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#f6821f',
                color: 'white',
                cursor: newDiagramName.trim() ? 'pointer' : 'not-allowed',
                whiteSpace: 'nowrap'
              }}
            >
              Create
            </button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {diagrams.map((diagram) => (
          <div
            key={diagram.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              borderRadius: '4px',
              backgroundColor: diagram.id === currentDiagramId ? '#e9ecef' : 'white',
              border: '1px solid #ddd',
              cursor: 'pointer',
              position: 'relative',
              minWidth: 0
            }}
            onClick={() => setCurrentDiagram(diagram.id)}
            onContextMenu={(e) => handleContextMenu(e, diagram.id)}
          >
            {isCollapsed ? (
              <div style={{ 
                width: '20px', 
                height: '20px', 
                backgroundColor: diagram.id === currentDiagramId ? '#f6821f' : '#ddd',
                borderRadius: '50%'
              }} />
            ) : (
              <>
                <div style={{ 
                  flex: 1,
                  minWidth: 0,
                  marginRight: '8px'
                }}>
                  <div style={{ 
                    fontWeight: 'bold',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {diagram.name}
                  </div>
                  <div style={{ 
                    fontSize: '0.8em', 
                    color: '#666',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {new Date(diagram.updatedAt).toLocaleDateString()}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteDiagram(diagram.id);
                  }}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {contextMenu && (
        <div
          style={{
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            zIndex: 1000,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ padding: '8px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>
            Export as
          </div>
          {(['svg', 'png', 'jpeg'] as ExportFormat[]).map((format) => (
            <button
              key={format}
              onClick={() => handleExport(format, contextMenu.diagramId)}
              disabled={isExporting}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 16px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: isExporting ? 'not-allowed' : 'pointer',
                textAlign: 'left',
                ':hover': {
                  backgroundColor: '#f8f9fa'
                }
              }}
            >
              {format.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiagramList;
