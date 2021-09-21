import { Table, Tag, Space } from 'antd';
import ContentLayout from '@/components/contentlayout';
import { ApolloProvider, useQuery } from '@apollo/client';
import { client, serverURL } from '@/utils/graphql';
import { ListCoursesQuery } from '@/generated/graphql';
import { LIST_COURSES } from '@/utils/schema';
import { downloadFile } from './download';

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
    },
    {
        title: 'Cover',
        dataIndex: 'cover',
        key: 'cover',
        render: (v:any)=><div style={{textAlign:'left'}}>
            <img src={serverURL + v?.url} width={50}/>
        </div>
    },
    {
        title: 'Status',
        dataIndex: 'available',
        key: 'available',
        render: (v:boolean)=>v?<Tag color="green">进行中</Tag> : <Tag color="volcano">已停课</Tag>
    },
    {
        title: 'Action',
        key: 'id',
        dataIndex: 'id',
        render: (v:string, record: any) => (
            <Space size="middle">
                <a>Edit</a>
                <a onClick={()=>downloadFile(v)}>导出成绩</a>
            </Space>
        ),
    },
];

const CourseMgr = ()=>{
    const { data: courseData, loading } = useQuery<ListCoursesQuery>(LIST_COURSES);
    
    const data: any = courseData?.courses;

    return <ContentLayout title="Course Manage">
        <Table columns={columns} dataSource={data} loading={loading}/> 
    </ContentLayout>;
};

export default function CourseMgrPage() { 
    return <ApolloProvider client={client}>
        <CourseMgr />
    </ApolloProvider>;
};
