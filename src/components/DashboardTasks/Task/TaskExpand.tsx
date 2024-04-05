import React from 'react';
import { Card } from 'antd';

const TaskExpand: React.FC = () => (
    <Card title="Card title" bordered={false} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
    </Card>
);

export default TaskExpand;