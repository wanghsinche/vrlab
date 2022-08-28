import React, { useEffect, useState } from 'react';
import { Card, Input, Empty, Spin } from 'antd';
import { ApolloProvider, useQuery } from '@apollo/client';
import { client, serverURL } from '@/utils/graphql';
import { LIST_COURSES_QUERY, ME } from '@/utils/schema';
import { ListCoursesQueryQuery, ListCoursesQueryQueryVariables, MeQuery, ProfileQuery } from '@/generated/graphql';
import { Link } from 'umi';
import { ContentLayout, Toolbar } from '@/components/contentlayout';
import { REST_PROFILE } from '@/utils/restschema';

const Course: React.FC = () => {
    const { data: meData } = useQuery<MeQuery>(ME);

    const { data: profileData, refetch } = useQuery<ProfileQuery>(REST_PROFILE, {
        variables: { id: meData?.me?.id },
        skip: !meData?.me
    });

    const [searchV, setSearchV] = useState<string>();
    const [filter, setFilter] = useState<string | null | undefined>(null);
    const { data, loading } = useQuery<ListCoursesQueryQuery, ListCoursesQueryQueryVariables>(LIST_COURSES_QUERY, {
        // fetchPolicy: "no-cache",
        variables: {
            search: filter
        },
        skip: filter === null
    });

    useEffect(() => {
        if (profileData?.user?.class) {
            setSearchV(profileData?.user?.class.name as string);
            setFilter(profileData?.user?.class.name);
        }
    }, [profileData?.user])

    const items = data?.courses?.filter(el => el?.available)!.map(el => (
        <Card key={el?.id} title={<span style={{ fontSize: 14 }}>{el?.name}</span>}
            extra={<Link to={`/course/${el?.id}`}>进入</Link>}
            style={{ width: 200, margin: "10px 5px" }}
            cover={<img src={serverURL + el?.cover?.url} width="200" height="100" />}>
            <div style={{ fontSize: '.8em' }}>{'课程 ID:' + el?.id}</div>
            <div style={{ fontSize: '.8em' }}>{el?.description}</div>
        </Card>));

    return <ContentLayout title="进行中的课程">
        <Toolbar ><Input.Search allowClear value={searchV} onChange={(e) => setSearchV(e.target.value)} onSearch={(v) => setFilter(v)} placeholder="根据老师，学院或班级查找" /></Toolbar>
        {!items?.length && <Empty >请重新搜索</Empty>}
        <Spin spinning={loading}>
        <div style={{ display: "flex", justifyContent: "flex-start", width: "100%", flexWrap: "wrap" }}>
            {items}
        </div>
        </Spin>
    </ContentLayout>;
}

export default function CoursePage() {
    return <ApolloProvider client={client}>
        <Course />
    </ApolloProvider>
};