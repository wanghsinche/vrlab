import { Table, Tag, Select, Button, Input, Space } from 'antd';
import { ContentLayout, Toolbar } from '@/components/contentlayout';
import { ApolloProvider, useQuery } from '@apollo/client';
import { client } from '@/utils/graphql';
import { Link } from 'umi';
import { CLASSES, listUsers } from '@/utils/schema';
import { ClassroomQuery, ListCoursesQueryVariables, ListUsersQuery, ListUsersQueryVariables } from '@/generated/graphql';
import { useEffect, useMemo, useState } from 'react';

const columns = [
    {
        title: '用户名',
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
        title: '角色权限',
        key: 'role',
        dataIndex: 'role',
        render: (v: any) => <Tag color="blue" >
            {v.name}
        </Tag>,
    },
    {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        render: (id: string) => (
            <Space>
                <Link to={"/manage/student/" + id}>详情</Link>
            </Space>
        ),
    },
];


const Student = () => {
    const [currentClass, setClass] = useState('');
    const { data, loading, refetch } = useQuery<ListUsersQuery, ListUsersQueryVariables>(listUsers, {
        variables: {
            classroom: currentClass
        },
        skip: !currentClass
    });
    const [filter, setFilter] = useState('');
    const finalData = useMemo(() => filter ? data?.users?.filter(el => ('' + el?.realname + el?.realid + el?.username).includes(filter)) : data?.users, [data, filter]);

    const { data: classData, loading: classLoading } = useQuery<ClassroomQuery>(CLASSES);

    const addon = <Space>
        <Input.Search placeholder="查询学号，邮箱，姓名" onSearch={(s) => setFilter(s)} allowClear />
        <Select value={currentClass}
            style={{ minWidth: 100 }}
            showSearch
            filterOption={(input, option) =>
                (option?.label as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={s => setClass(s)} options={classData?.classes?.map(el => ({
                label: el!.name!, value: el!.id!
            }))} />
    </Space>;

    useEffect(() => {
        refetch();
    }, [currentClass]);

    useEffect(() => {
        if (classData?.classes?.length) {
            setClass(classData?.classes?.[0]?.id as string);
        }
    }, [classData])

    return <ContentLayout title="用户管理">
        <Toolbar addon={addon}>
            <Link to="/manage/student/add"><Button type="primary">添加用户</Button></Link>
        </Toolbar>
        <Table rowKey="username" columns={columns} dataSource={finalData as any} loading={loading || classLoading} />
    </ContentLayout>;
}

export default function StudentPage() {
    return <ApolloProvider client={client}>
        <Student />
    </ApolloProvider>;
};
