import React from 'react';
import type { Task } from '../types';
import './TaskDetailsModal.css';

interface TaskDetailsModalProps {
    task: Task;
    onClose: () => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ task, onClose }) => {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{task.title}</h2>
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>
                <div className="modal-body">
                    <p><strong>Status:</strong> {task.status}</p>
                    <p><strong>Priority:</strong> {task.priority}</p>
                    <p><strong>Description:</strong> {task.description}</p>
                    {task.dependencies && task.dependencies.length > 0 && (
                        <div>
                            <strong>Dependencies:</strong>
                            <ul>
                                {task.dependencies.map(depId => <li key={depId}>{depId}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskDetailsModal; 