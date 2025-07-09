const fs = require('fs');
const chokidar = require('chokidar');
const EventEmitter = require('events');

class TaskEmitter extends EventEmitter {}
const taskEmitter = new TaskEmitter();

// This will hold the parsed task data in memory.
let taskData = {};

const loadTasks = (filePath) => {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(fileContent);

    // Basic validation
    if (parsedData && parsedData.master && Array.isArray(parsedData.master.tasks)) {
      taskData = parsedData;
      taskEmitter.emit('tasks-updated', taskData); // Emit event with new data
      console.log(`[${new Date().toISOString()}] Successfully loaded and validated tasks from ${filePath}`);
    } else {
      console.error(`[${new Date().toISOString()}] Error: Invalid task structure in ${filePath}.`);
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error reading or parsing ${filePath}:`, error.message);
  }
};

const watchTasks = (filePath) => {
  // Initialize watcher.
  const watcher = chokidar.watch(filePath, {
    persistent: true,
    ignoreInitial: true, // Don't fire on initial add
  });

  console.log(`[${new Date().toISOString()}] Watching for changes in ${filePath}...`);

  // Add event listeners.
  watcher
    .on('add', path => {
        console.log(`[${new Date().toISOString()}] File ${path} has been added. Reloading tasks...`);
        loadTasks(path);
    })
    .on('change', path => {
        console.log(`[${new Date().toISOString()}] File ${path} has been changed. Reloading tasks...`);
        loadTasks(path);
    })
    .on('unlink', path => {
        console.log(`[${new Date().toISOString()}] File ${path} has been removed. Clearing task data.`);
        taskData = {}; // Clear data if file is removed
        taskEmitter.emit('tasks-updated', taskData); // Emit event with empty data
    })
    .on('error', error => console.error(`[${new Date().toISOString()}] Watcher error: ${error}`));
  
  // Load initial data
  loadTasks(filePath);
};

// Export a function to get the current task data
const getTasks = () => taskData;

module.exports = { watchTasks, getTasks, taskEmitter }; 