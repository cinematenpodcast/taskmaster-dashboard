import React from 'react';
import { useSelector } from 'react-redux';
import { selectTasks } from '../features/tasks/tasksSlice';
import type { Task } from '../types';
import './KanbanBoard.css';

const KanbanBoard: React.FC = () => {
    const tasksData = useSelector(selectTasks);

    if (!tasksData.master || !tasksData.master.tasks) {
        return <div id="kanban-board">Loading tasks...</div>;
    }

    const tasks: Task[] = tasksData.master.tasks;

    const columns: { [key: string]: Task[] } = {
        'Pending': tasks.filter((task: Task) => task.status === 'pending'),
        'In Progress': tasks.filter((task: Task) => task.status === 'in-progress'),
        'Done': tasks.filter((task: Task) => task.status === 'done'),
        'Cancelled': tasks.filter((task: Task) => task.status === 'cancelled'),
    };

    return (
        <div id="kanban-board" className="kanban-board">
            {Object.keys(columns).map(columnName => (
                <div key={columnName} className="kanban-column">
                    <h2>{columnName} ({columns[columnName].length})</h2>
                    <div className="tasks-container">
                        {columns[columnName].map((task: Task) => (
                            <div key={task.id} className={`kanban-task priority-${task.priority}`}>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KanbanBoard; 