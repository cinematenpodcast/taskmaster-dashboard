import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import { selectTasks } from '../features/tasks/tasksSlice';
import type { Task } from '../types';

const DependencyGraph: React.FC = () => {
    const tasksData = useSelector(selectTasks);

    const { nodes, edges } = useMemo(() => {
        if (!tasksData.master || !tasksData.master.tasks) {
            return { nodes: [], edges: [] };
        }
        const tasks: Task[] = tasksData.master.tasks;
        const initialNodes = tasks.map((task, i) => ({
            id: String(task.id),
            data: { label: task.title },
            position: { x: (i % 5) * 200, y: Math.floor(i / 5) * 100 },
        }));

        const initialEdges = tasks.flatMap(task =>
            (task.dependencies || []).map(depId => ({
                id: `e${depId}-${task.id}`,
                source: String(depId),
                target: String(task.id),
                animated: true,
            }))
        );

        return { nodes: initialNodes, edges: initialEdges };
    }, [tasksData]);

    return (
        <div style={{ height: '80vh' }} id="dependency-graph">
            <ReactFlow nodes={nodes} edges={edges}>
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default DependencyGraph; 