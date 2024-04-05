import React from 'react';
import { Card } from 'antd';

const TaskCollaps: React.FC = (title) => (
    <Card style={{ width: 300 }}>
        <p>{title}</p>
    </Card>
);

export default TaskCollaps;