import React, { useEffect, useState } from 'react';
import { Descriptions, Tag, Spin } from 'antd';
export function SysInfo() {
    const [i, setI] = useState(0);
    useEffect(() => {
        const t = setInterval(() => {
            setI(Date.now());
        }, 1000);
        return () => clearInterval(t);
    }, []);

    return <div>
        <h1>系统概览</h1>
        <Descriptions style={{ background: '#fff' }} bordered key={i}>
            <Descriptions.Item label="产品">VRLAB</Descriptions.Item>
            <Descriptions.Item label="后端服务器">基于Nodejs的Strapi</Descriptions.Item>
            <Descriptions.Item label="前端框架">Umijs</Descriptions.Item>
            <Descriptions.Item label="请求库">GraphQL</Descriptions.Item>
            <Descriptions.Item label="当前时间" span={2}>
                <Tag>{new Date().toLocaleString()}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="运行状态" span={3}>
                <Tag color="green" >running</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Config Info">
                Data disk type: SQLite
            <br />
            Database version: 3.4
            <br />
            Storage space: 10 GB
            <br />
            Region: East China 1<br />
            </Descriptions.Item>
        </Descriptions>
    </div>;
}