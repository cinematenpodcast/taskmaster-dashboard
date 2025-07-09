import React from 'react';
import { useSelector } from 'react-redux';
import { selectTasks } from '../features/tasks/tasksSlice';
import { calculateMetrics } from '../utils/data-processing';
import './DashboardOverview.css';

const DashboardOverview: React.FC = () => {
    const tasksData = useSelector(selectTasks);
    const metrics = calculateMetrics(tasksData);

    return (
        <div className="dashboard-overview">
            {Object.entries(metrics).map(([key, value]) => (
                <div key={key} className="metric-card">
                    <h3>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>
                    <p>{String(value)}</p>
                </div>
            ))}
        </div>
    );
};

export default React.memo(DashboardOverview); 