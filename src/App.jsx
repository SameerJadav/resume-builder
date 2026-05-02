import { ResumeProvider } from './context/ResumeContext';
import { Toolbar } from './components/toolbar/Toolbar';
import { SplitPane } from './components/layout/SplitPane';
import { EditorPanel } from './components/editor/EditorPanel';
import { PreviewPanel } from './components/preview/PreviewPanel';
import './App.css';

function App() {
  return (
    <ResumeProvider>
      <Toolbar />
      <SplitPane
        left={<EditorPanel />}
        right={<PreviewPanel />}
      />
    </ResumeProvider>
  );
}

export default App;
