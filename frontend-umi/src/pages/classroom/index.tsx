import { Table, Tag, Space } from 'antd';
import {ContentLayout} from '@/components/contentlayout';

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (tags: string[]) => (
            <>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_:string, record: any) => (
            <Space size="middle">
                <a>View</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const data = [
    {
        id: '1',
        key: '1',
        name: '2020级机电一班',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        id: '2',
        key: '2',
        name: '2020级机械2班',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        id: '3',
        key: '3',
        name: '2020级机械一班',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

export default function ClassPage() { 
    return <ContentLayout title="Class Manage">
        <Table columns={columns} dataSource={data} /> 
    </ContentLayout>;
};
