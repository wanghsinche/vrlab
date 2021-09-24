import React from 'react';
import { Card } from 'antd';
import { ApolloProvider, useQuery } from '@apollo/client';
import { client, serverURL } from '@/utils/graphql';
import { LIST_COURSES } from '@/utils/schema';
import { ListCoursesQuery } from '@/generated/graphql';
import { Link } from 'umi';
import {ContentLayout} from '@/components/contentlayout';

const Course: React.FC = () => {
    const { data } = useQuery<ListCoursesQuery>(LIST_COURSES, {
        fetchPolicy:"no-cache"
    });

    const items = data?.courses!.map(el => (
        <Card  key={el?.id} title={el?.name} 
        extra={<Link to={`/course/${el?.id}`}>View</Link>} 
        style={{ width: 200,  margin:"10px 5px" }} 
        cover={<img src={serverURL + el?.cover?.url} width="200" height="100" />}>
            <div style={{fontSize: '.8em'}}>{'Course ID:'+el?.id}</div>
            <div style={{fontSize: '.8em'}}>{el?.description}</div>
        </Card>));

    return <ContentLayout title="Course List">
        <div style={{display:"flex", justifyContent:"flex-start", width:"100%", flexWrap:"wrap"}}>
            {items}
        </div>
    </ContentLayout>;
}

export default function CoursePage() {
    return <ApolloProvider client={client}>
        <Course />
    </ApolloProvider>
};