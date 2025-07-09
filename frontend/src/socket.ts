import { io } from 'socket.io-client';
import { store } from './app/store';
import { setTasks, setTasksLoading, setTasksFailed } from './features/tasks/tasksSlice';

const SOCKET_URL = 'http://localhost:3001';

export const socket = io(SOCKET_URL);

export const setupSocket = () => {
    socket.on('connect', () => {
        console.log('Connected to WebSocket server');
        store.dispatch(setTasksLoading());
    });

    socket.on('tasks-updated', (tasks) => {
        console.log('Received tasks-updated event', tasks);
        store.dispatch(setTasks(tasks));
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
    });

    socket.on('connect_error', (err) => {
        console.error('Connection error:', err);
        store.dispatch(setTasksFailed(err.message));
    });
}; 