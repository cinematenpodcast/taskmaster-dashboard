import React from 'react';
import { useSelector } from 'react-redux';
import { selectTasks } from '../features/tasks/tasksSlice';
import { calculateMetrics } from '../utils/data-processing';
import './DashboardOverview.css';

const DashboardOverview: React.FC = () => {
    const tasksData = useSelector(selectTasks);
    const metrics = calculateMetrics(tasksData);

    return (
        <div id="dashboard-overview" className="dashboard-overview">
            <div className="metric-card">
                <h3>Total Tasks</h3>
                <p>{metrics.totalTasks}</p>
            </div>
            <div className="metric-card">
                <h3>Completed Tasks</h3>
                <p>{metrics.completedTasks}</p>
            </div>
            <div className="metric-card">
                <h3>Pending Tasks</h3>
                <p>{metrics.pendingTasks}</p>
            </div>
        </div>
    );
};

export default DashboardOverview; 