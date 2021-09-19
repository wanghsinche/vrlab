import React from 'react';
import { Card, Space } from 'antd';
import { ApolloProvider, useQuery } from '@apollo/client';
import { client, serverURL } from '@/utils/graphql';
import { LIST_COURSES } from '@/utils/schema';
import { ListCoursesQuery } from '@/generated/graphql';
import { Link } from 'umi';
import ContentLayout from '@/components/contentlayout';

const Course: React.FC = () => {
    const { data } = useQuery<ListCoursesQuery>(LIST_COURSES);

    const items = data?.courses!.map(el => (
        <Card key={el?.id} title={el?.name} extra={<Link to={`/course/${el?.id}`}>View Course</Link>} style={{ width: 300, height: 360 }} cover={<img src={serverURL + el?.cover?.url} width="300" height="160" />}>
            <p>Card content</p>
            <p>{el?.description}</p>
        </Card>));

    return <ContentLayout>
        <h1>Course</h1>
        <Space>
            {items}
        </Space>
    </ContentLayout>;
}

export default function CoursePage() {
    return <ApolloProvider client={client}>
        <Course />
    </ApolloProvider>
};