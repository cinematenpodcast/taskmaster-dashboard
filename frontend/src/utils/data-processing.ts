export const calculateMetrics = (tasksData: any) => {
    if (!tasksData || !tasksData.master || !tasksData.master.tasks) {
        return {
            totalTasks: 0,
            completedTasks: 0,
            pendingTasks: 0,
            tasksByStatus: {},
            tasksByPriority: {},
        };
    }

    const tasks = tasksData.master.tasks;
    const totalTasks = tasks.length;
    let completedTasks = 0;
    let pendingTasks = 0;
    const tasksByStatus: { [key: string]: number } = {};
    const tasksByPriority: { [key: string]: number } = {};

    tasks.forEach((task: any) => {
        // Status metrics
        if (task.status === 'done') {
            completedTasks++;
        } else if (task.status === 'pending') {
            pendingTasks++;
        }
        tasksByStatus[task.status] = (tasksByStatus[task.status] || 0) + 1;

        // Priority metrics
        if (task.priority) {
            tasksByPriority[task.priority] = (tasksByPriority[task.priority] || 0) + 1;
        }
    });

    return {
        totalTasks,
        completedTasks,
        pendingTasks,
        tasksByStatus,
        tasksByPriority,
    };
}; 