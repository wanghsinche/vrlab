import { Table, Tag, Space, Button, Input } from 'antd';
import { ContentLayout, Toolbar } from '@/components/contentlayout';
import { ApolloProvider, useQuery } from '@apollo/client';
import { client, serverURL } from '@/utils/graphql';
import { ListCoursesQuery } from '@/generated/graphql';
import { LIST_COURSES } from '@/utils/schema';
import { downloadFile } from './download';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { throttle } from '@/utils/throttle';

const columns = [
    {
        title: '课程ID',
        dataIndex: 'id',
        key: 'id',
        width: 100
    },
    {
        title: '课程名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '课程信息',
        dataIndex: 'description',
        key: 'description',
        ellipsis: 20,
    },
    {
        title: '课程封面',
        dataIndex: 'cover',
        key: 'cover',
        render: (v: any) => <div style={{ textAlign: 'left' }}>
            <img src={serverURL + v?.url} width={50} />
        </div>
    },
    {
        title: '课程状态',
        dataIndex: 'available',
        key: 'available',
        render: (v: boolean, rec: any) => rec.isTemplate ? <Tag color="blue">课程模板</Tag> : v ? <Tag color="green">进行中</Tag> : <Tag color="volcano">已停课</Tag>
    },
    {
        title: '操作',
        key: 'id',
        dataIndex: 'id',
        width: 250,
        render: (v: string, record: any) => (
            <Space size="middle">
                <Link to={'/course/' + v}>查看</Link>
                <Link to={'/manage/coursemgr/' + v}>编辑</Link>
                <Button onClick={() => downloadFile(v)} disabled={record.isTemplate} type="link">导出成绩</Button>
            </Space>
        ),
    },
];

const CourseMgr = () => {
    const [filter, setFilter] = useState<string>('');

    const { data: courseData, loading } = useQuery<ListCoursesQuery>(LIST_COURSES, {
        fetchPolicy: "no-cache"
    });

    const data: any = useMemo(() => filter ? courseData?.courses?.filter(el => el?.description?.includes(filter)) : courseData?.courses, [filter, courseData?.courses]);

    return <ContentLayout title="课程管理">
        <Toolbar >
            <Input.Search placeholder="根据老师，学院或班级查找" allowClear onSearch={v => setFilter(v)} />
            <Link to="/manage/coursemgr/add"><Button type="primary">添加课程</Button></Link>
        </Toolbar>
        <Table columns={columns as any} dataSource={data} loading={loading} rowKey="id" />
    </ContentLayout>;
};

export default function CourseMgrPage() {
    return <ApolloProvider client={client}>
        <CourseMgr />
    </ApolloProvider>;
};
