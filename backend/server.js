import { createServer } from 'http';
import { Server } from 'socket.io';
import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).option('file', {
    alias: 'f',
    type: 'string',
    description: 'Path to the tasks JSON file',
    default: '../VOORBEELDtasks.json'
}).argv;

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

const tasksFilePath = path.resolve(argv.file);

if (!fs.existsSync(tasksFilePath)) {
    console.error(`Error: The file "${tasksFilePath}" does not exist.`);
    process.exit(1);
}

const watcher = chokidar.watch(tasksFilePath, {
    persistent: true,
});

const readAndEmitTasks = (socket) => {
    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading tasks file:', err);
            return;
        }
        try {
            const tasks = JSON.parse(data);
            socket.emit('tasks-updated', tasks);
            console.log('Tasks data sent to client.');
        } catch (parseErr) {
            console.error('Error parsing tasks file:', parseErr);
        }
    });
};

io.on('connection', (socket) => {
    console.log('A user connected');

    readAndEmitTasks(socket);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

watcher.on('change', (path) => {
    console.log(`File ${path} has been changed`);
    readAndEmitTasks(io);
});

httpServer.listen(3000, () => {
    console.log('WebSocket server listening on port 3000');
    console.log(`Watching for changes in: ${tasksFilePath}`);
}); 