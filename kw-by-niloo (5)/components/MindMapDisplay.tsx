import React, { useMemo } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Position, Node, Edge } from 'reactflow';
import { ClusteringData } from '../types';

interface MindMapDisplayProps {
    data: ClusteringData;
}

const nodeStyles = {
    root: {
        background: '#14b8a6', // teal-500
        color: 'white',
        border: '2px solid #0f766e', // teal-700
        borderRadius: '50%',
        width: 150,
        height: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'center' as const,
    },
    topic: {
        background: '#6366f1', // indigo-500
        color: 'white',
        border: '2px solid #4338ca', // indigo-700
        borderRadius: '8px',
        padding: '10px 15px',
        fontSize: '16px',
        textAlign: 'center' as const,
    },
    keyword: {
        background: '#4b5563', // gray-600
        color: 'white',
        border: '2px solid #374151', // gray-700
        borderRadius: '8px',
        padding: '5px 10px',
        fontSize: '12px',
    },
};


const MindMapDisplay: React.FC<MindMapDisplayProps> = ({ data }) => {
    const { nodes, edges } = useMemo(() => {
        const initialNodes: Node[] = [];
        const initialEdges: Edge[] = [];
        const rootNodeId = 'root';
        const topicRadius = 450;
        const keywordRadius = 180;
        const centerX = 0;
        const centerY = 0;

        // 1. Root Node
        initialNodes.push({
            id: rootNodeId,
            position: { x: centerX, y: centerY },
            data: { label: 'خوشه‌های کلیدی' },
            type: 'input',
            style: nodeStyles.root,
        });

        // 2. Topic Nodes and Edges
        data.forEach((cluster, index) => {
            const angle = (index / data.length) * 2 * Math.PI;
            const topicX = centerX + Math.cos(angle) * topicRadius;
            const topicY = centerY + Math.sin(angle) * topicRadius;
            const topicNodeId = `topic-${cluster.topicId}`;

            initialNodes.push({
                id: topicNodeId,
                position: { x: topicX, y: topicY },
                data: { label: `${cluster.topicName} (${cluster.count})` },
                style: nodeStyles.topic,
                sourcePosition: Position.Bottom,
                targetPosition: Position.Top,
            });

            initialEdges.push({
                id: `edge-root-to-${topicNodeId}`,
                source: rootNodeId,
                target: topicNodeId,
                animated: false,
                style: { stroke: '#6366f1', strokeWidth: 2 },
            });

            // 3. Keyword Nodes and Edges
            const maxKeywordsToShow = 10; // Limit keywords per topic for readability
            const visibleKeywords = cluster.keywords.slice(0, maxKeywordsToShow);
            
            visibleKeywords.forEach((keyword, kwIndex) => {
                const kwAngle = (kwIndex / visibleKeywords.length) * 2 * Math.PI;
                const kwX = topicX + Math.cos(kwAngle) * keywordRadius;
                const kwY = topicY + Math.sin(kwAngle) * keywordRadius;
                const keywordNodeId = `kw-${cluster.topicId}-${kwIndex}`;

                initialNodes.push({
                    id: keywordNodeId,
                    position: { x: kwX, y: kwY },
                    data: { label: keyword },
                    type: 'output',
                    style: nodeStyles.keyword,
                    sourcePosition: Position.Left,
                    targetPosition: Position.Right,
                });

                initialEdges.push({
                    id: `edge-${topicNodeId}-to-${keywordNodeId}`,
                    source: topicNodeId,
                    target: keywordNodeId,
                    style: { stroke: '#4b5563', strokeWidth: 1 },
                });
            });
        });

        return { nodes: initialNodes, edges: initialEdges };
    }, [data]);

    return (
        <div style={{ height: '75vh', width: '100%' }} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                proOptions={{ hideAttribution: true }}
                nodesDraggable={true}
                nodesConnectable={false}
            >
                <Background color="#404040" gap={16} />
                <Controls showInteractive={false} />
                <MiniMap nodeStrokeWidth={3} zoomable pannable />
            </ReactFlow>
        </div>
    );
};

export default MindMapDisplay;