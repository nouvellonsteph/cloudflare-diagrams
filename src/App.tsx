import React from 'react';
import DiagramEditor from './components/DiagramEditor';
import DiagramList from './components/DiagramList';
import ExportPanel from './components/ExportPanel';
import 'reactflow/dist/style.css';

const App: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
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
  );
};

export default App;
