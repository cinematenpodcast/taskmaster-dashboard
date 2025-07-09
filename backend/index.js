const path = require('path');
const http = require('http');
const { Server } = require("socket.io");
const { watchTasks, getTasks, taskEmitter } = require('./file-monitor');

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for simplicity in development
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

io.on('connection', (socket) => {
  console.log(`[${new Date().toISOString()}] A user connected: ${socket.id}`);
  
  // Send the current task data to the newly connected client
  socket.emit('tasks-updated', getTasks());

  socket.on('disconnect', () => {
    console.log(`[${new Date().toISOString()}] User disconnected: ${socket.id}`);
  });
});

// Listen for task updates and broadcast to all clients
taskEmitter.on('tasks-updated', (tasks) => {
  console.log(`[${new Date().toISOString()}] Broadcasting task update to all clients.`);
  io.emit('tasks-updated', tasks);
});

// Define the path to the tasks.json file.
const tasksFilePath = path.join(__dirname, '..', 'VOORBEELDtasks.json');

// Start watching the file.
watchTasks(tasksFilePath);

server.listen(PORT, () => {
  console.log(`Backend service started. WebSocket server listening on port ${PORT}`);
}); 