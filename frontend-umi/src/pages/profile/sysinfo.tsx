import React, { useEffect, useState } from 'react';
import { Descriptions, Tag, Spin } from 'antd';
import { GetSystemInfoQuery } from '@/generated/graphql';
import { getSystemInfo } from '@/utils/schema';
import { useQuery } from '@apollo/client';
export function SysInfo() {
    const [i, setI] = useState(0);
    const { data: systemData } = useQuery<GetSystemInfoQuery>(getSystemInfo);

    useEffect(() => {
        const t = setInterval(() => {
            setI(Date.now());
        }, 1000);
        return () => clearInterval(t);
    }, []);

    return <div>
        <Descriptions style={{ background: '#fff' }} bordered key={i}>
            <Descriptions.Item label="产品">{systemData?.systeminfo?.product}</Descriptions.Item>
            <Descriptions.Item label="后端服务器">{systemData?.systeminfo?.server}</Descriptions.Item>
            <Descriptions.Item label="前端框架">{systemData?.systeminfo?.frontend}</Descriptions.Item>
            <Descriptions.Item label="请求库">{systemData?.systeminfo?.request}</Descriptions.Item>
            <Descriptions.Item label="当前时间" span={2}>
                <Tag>{new Date().toLocaleString()}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="运行状态" span={3}>
                <Tag color="green" >running</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="其他信息">
                {systemData?.systeminfo?.config && Object.entries(systemData.systeminfo.config).map(([k, v]) => (
                    <div>
                        <span className="ant-btn-link" style={{ marginRight: 10}}>{k}</span>: {v}
                    </div>
                ))}
            </Descriptions.Item>
        </Descriptions>
    </div>;
}