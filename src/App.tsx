import React from 'react';
import DiagramEditor from './components/DiagramEditor';
import DiagramList from './components/DiagramList';
import ExportPanel from './components/ExportPanel';
import 'reactflow/dist/style.css';

const App: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <header style={{
        padding: '12px 20px',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        background: '#fff'
      }}>
        <img 
          src="/cloudflare-logo.svg" 
          alt="Cloudflare" 
          style={{ height: '24px', marginRight: '20px' }} 
        />
        <h1 style={{ 
          margin: 2, 
          fontSize: '18px',
          fontWeight: 500,
          color: '#333'
        }}>
          Diagram tool
        </h1>
      </header>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden'
      }}>
        {/* Left Sidebar - Diagram List */}
        <DiagramList />

        {/* Main Content - Diagram Editor */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative'
        }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <DiagramEditor />
          </div>
          
          {/* Bottom Panel - Export Options */}
          <ExportPanel />
        </div>
      </div>
    </div>
  );
};

export default App;
