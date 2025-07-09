const path = require('path');
const { watchTasks } = require('./file-monitor');

// Define the path to the tasks.json file.
// This assumes the script is run from the `backend` directory.
const tasksFilePath = path.join(__dirname, '..', '.taskmaster', 'tasks', 'tasks.json');

// Start watching the file.
watchTasks(tasksFilePath);

console.log('Backend service started.'); 