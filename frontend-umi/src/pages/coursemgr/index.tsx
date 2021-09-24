import { Table, Tag, Space, Button } from 'antd';
import { ContentLayout, Toolbar } from '@/components/contentlayout';
import { ApolloProvider, useQuery } from '@apollo/client';
import { client, serverURL } from '@/utils/graphql';
import { ListCoursesQuery } from '@/generated/graphql';
import { LIST_COURSES } from '@/utils/schema';
import { downloadFile } from './download';
import { Link } from 'react-router-dom';

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        width: 50
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        ellipsis: 20,
    },
    {
        title: 'Cover',
        dataIndex: 'cover',
        key: 'cover',
        render: (v: any) => <div style={{ textAlign: 'left' }}>
            <img src={serverURL + v?.url} width={50} />
        </div>
    },
    {
        title: 'Status',
        dataIndex: 'available',
        key: 'available',
        render: (v: boolean, rec: any) => rec.isTemplate? <Tag color="blue">课程模板</Tag> : v ? <Tag color="green">进行中</Tag> : <Tag color="volcano">已停课</Tag>
    },
    {
        title: 'Action',
        key: 'id',
        dataIndex: 'id',
        width: 200,
        render: (v: string, record: any) => (
            <Space size="middle">
                <Link to={'/course/' + v}>查看</Link>
                <Link to={'/manage/coursemgr/' + v}>编辑</Link>
                <a onClick={() => downloadFile(v)}>导出成绩</a>
            </Space>
        ),
    },
];

const CourseMgr = () => {
    const { data: courseData, loading } = useQuery<ListCoursesQuery>(LIST_COURSES,{
        fetchPolicy:"no-cache"
    });

    const data: any = courseData?.courses;

    return <ContentLayout title="Course Manage">
        <Toolbar >
            <Link to="/manage/coursemgr/add"><Button type="primary">添加课程</Button></Link>
        </Toolbar>
        <Table columns={columns as any} dataSource={data} loading={loading} rowKey="id"/>
    </ContentLayout>;
};

export default function CourseMgrPage() {
    return <ApolloProvider client={client}>
        <CourseMgr />
    </ApolloProvider>;
};
