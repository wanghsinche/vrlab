import React, { PropsWithChildren } from 'react';
import { Space } from 'antd';
export function ContentLayout(p: PropsWithChildren<{ title?: string }>) {
    return <div style={{ padding: 10 }}>
        <h1>{p.title}</h1>
        {p.children}
    </div>
}
export function Toolbar(p: PropsWithChildren<{ addon?: React.ReactNode }>) {
    return <div style={{
        padding: '8px 16px',
        background: '#fff',
        boxShadow: '0 1px 4px rgb(0 21 41 / 8%)',
        margin: '16px 0',
    }}>
        <div style={{ float: 'left', lineHeight: '32px' }}>{p.addon}</div>
        <div style={{
            display: 'flex',
            justifyContent: 'right'
        }}>
            {p.children}
        </div>
    </div>;
}