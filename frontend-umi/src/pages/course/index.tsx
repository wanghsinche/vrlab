import React from 'react';
import { Card, Space } from 'antd';
import { ApolloProvider, useQuery } from '@apollo/client';
import { client, serverURL } from '@/utils/graphql';
import { LIST_COURSES, ILIST_COURSES } from '@/utils/schema';
import { Link } from 'umi';
const Course: React.FC = () => {
    const { data } = useQuery<ILIST_COURSES>(LIST_COURSES);

    const items = data?.courses.map(el => (
    <Card key={el.id} title={el.name} extra={<Link to={`/course/${el.id}`}>View Course</Link>} style={{ width: 300, height: 360}} cover={<img src={serverURL + el.cover.url} width="300" height="160"/>}>
        <p>Card content</p>
        <p>{el.description}</p>
    </Card>));

    return <div>
        <h1>Course</h1>
        <Space>
            {items}
        </Space>
    </div>;
}

export default function CoursePage() {
    return <ApolloProvider client={client}>
        <Course />
    </ApolloProvider>
};