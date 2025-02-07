import React, { useState } from 'react';
import useDiagramStore from '../../store/diagramStore';

type ExportFormat = 'svg' | 'png' | 'jpeg';

const ExportPanel: React.FC = () => {
  const { exportDiagram, getCurrentDiagram } = useDiagramStore();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: ExportFormat) => {
    const diagram = getCurrentDiagram();
    if (!diagram) return;

    try {
      setIsExporting(true);
      const dataUrl = await exportDiagram(format);
      
      // Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${diagram.name}-${new Date().toISOString()}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export diagram. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportButton = (format: ExportFormat) => (
    <button
      onClick={() => handleExport(format)}
      disabled={isExporting || !getCurrentDiagram()}
      style={{
        padding: '8px 16px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        backgroundColor: 'white',
        cursor: isExporting || !getCurrentDiagram() ? 'not-allowed' : 'pointer',
        opacity: isExporting || !getCurrentDiagram() ? 0.6 : 1,
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      {isExporting ? 'Exporting...' : `Export as ${format.toUpperCase()}`}
    </button>
  );

  return (
    <div style={{
      padding: '20px',
      borderTop: '1px solid #ddd',
      backgroundColor: '#f8f9fa'
    }}>
      <h3 style={{ marginBottom: '16px' }}>Export Diagram</h3>
      <div style={{ display: 'flex', gap: '12px' }}>
        {exportButton('svg')}
        {exportButton('png')}
        {exportButton('jpeg')}
      </div>
      {!getCurrentDiagram() && (
        <div style={{ 
          marginTop: '12px',
          color: '#666',
          fontSize: '0.9em'
        }}>
          Select a diagram to enable export options
        </div>
      )}
    </div>
  );
};

export default ExportPanel;
