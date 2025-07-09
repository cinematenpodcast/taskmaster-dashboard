export interface Task {
    id: string | number;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'done' | 'cancelled';
    priority: 'low' | 'medium' | 'high';
    dependencies: (string | number)[];
} 