import { Table, Tag, Select, Button, Input, Space } from 'antd';
import { ContentLayout, Toolbar } from '@/components/contentlayout';
import { ApolloProvider, useQuery } from '@apollo/client';
import { client } from '@/utils/graphql';
import { Link } from 'umi';
import { CLASSES, listUsers } from '@/utils/schema';
import { ClassroomQuery, ListCoursesQueryVariables, ListUsersQuery, ListUsersQueryVariables } from '@/generated/graphql';
import { useEffect, useState } from 'react';

const columns = [
    {
        title: 'username',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '姓名',
        dataIndex: 'realname',
        key: 'realname',
    },
    {
        title: '学号',
        dataIndex: 'realid',
        key: 'realid',
    },
    {
        title: '班级',
        dataIndex: 'class',
        key: 'class',
        render: (v: any) => <Tag>{v?.name}</Tag>
    },
    {
        title: 'role',
        key: 'role',
        dataIndex: 'role',
        render: (v: any) => <Tag color="blue" >
            {v.name}
        </Tag>,
    },
    {
        title: 'Action',
        key: 'action',
        render: (_: string) => (
            <a>Edit</a>
        ),
    },
];


const Student = () => {
    const [currentClass, setClass] = useState('3');
    const { data, loading, refetch } = useQuery<ListUsersQuery, ListUsersQueryVariables>(listUsers, {
        variables: {
            classroom: currentClass
        }
    });
    const { data: classData, loading: classLoading } = useQuery<ClassroomQuery>(CLASSES);
    const addon = <Space>
        <Input.Search placeholder="search by name, email, student ID" />
        <Select value={currentClass} onChange={s => setClass(s)} options={classData?.classes?.map(el => ({
            label: el!.name!, value: el!.id!
        }))} />
    </Space>;

    useEffect(()=>{
        refetch();
    }, [currentClass]);

    return <ContentLayout title="User Manage">
        <Toolbar addon={addon}>
            <Link to="/manage/student/adduser"><Button type="primary">Add Users</Button></Link>
        </Toolbar>
        <Table columns={columns} dataSource={data?.users as any} loading={loading || classLoading} />
    </ContentLayout>;
}

export default function StudentPage() {
    return <ApolloProvider client={client}>
        <Student />
    </ApolloProvider>;
};
