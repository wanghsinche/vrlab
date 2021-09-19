import { Table, Tag, Space } from 'antd';
import ContentLayout from '@/components/contentlayout';

const columns = [
    {
        title: 'id',
        dataIndex: 'key',
        key: 'id',
        render: (text: string) => <a>{text}</a>,
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
                <a>导出成绩</a>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        name: 'VR课堂',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'ＵＮＩＴＹ制作',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'ＡＲ考试',
        tags: ['cool', 'teacher'],
    },
];

export default function CourseMgrPage() { 
    return <ContentLayout title="Course Manage">
        <Table columns={columns} dataSource={data} /> 
    </ContentLayout>;
};
