import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setupSocket } from './socket';
import { selectTasksStatus } from './features/tasks/tasksSlice';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

function App() {
  const status = useSelector(selectTasksStatus);

  useEffect(() => {
    setupSocket();
  }, []);

  return (
    <>
      <header className="app-header">
        <h1>Taskmaster Dashboard</h1>
        <div className="connection-status">
          Connection: <span className={`status-${status}`}>{status}</span>
        </div>
      </header>
      <main>
        <KanbanBoard />
      </main>
    </>
  );
}

export default App;
