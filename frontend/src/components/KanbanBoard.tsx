import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTasks } from '../features/tasks/tasksSlice';
import type { Task } from '../types';
import TaskDetailsModal from './TaskDetailsModal';
import './KanbanBoard.css';

const KanbanBoard: React.FC = () => {
    const tasksData = useSelector(selectTasks);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
    };

    const handleCloseModal = () => {
        setSelectedTask(null);
    };

    return (
        <>
            <div id="kanban-board" className="kanban-board">
                {Object.keys(columns).map(columnName => (
                    <div key={columnName} className="kanban-column">
                        <h2>{columnName} ({columns[columnName].length})</h2>
                        <div className="tasks-container">
                            {columns[columnName].map((task: Task) => (
                                <div key={task.id} className={`kanban-task priority-${task.priority}`} onClick={() => handleTaskClick(task)}>
                                    <h3>{task.title}</h3>
                                    <p>{task.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {selectedTask && <TaskDetailsModal task={selectedTask} onClose={handleCloseModal} />}
        </>
    );
};

export default KanbanBoard; 