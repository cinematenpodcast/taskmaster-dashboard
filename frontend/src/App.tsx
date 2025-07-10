import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { setupSocket } from './socket';
import { selectTasksStatus } from './features/tasks/tasksSlice';
import KanbanBoard from './components/KanbanBoard';
import DashboardOverview from './components/DashboardOverview';
import DependencyGraph from './components/DependencyGraph';
import './App.css';

function App() {
  const status = useSelector(selectTasksStatus);

  useEffect(() => {
    setupSocket();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Taskmaster Dashboard</h1>
          <nav>
            <NavLink to="/">Kanban Board</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/dependencies">Dependency Graph</NavLink>
          </nav>
          <div className="connection-status">
            Connection: <span className={`status-${status}`}>{status}</span>
          </div>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<KanbanBoard />} />
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/dependencies" element={<DependencyGraph />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
