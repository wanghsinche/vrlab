import { Divider } from 'antd';
import { ContentLayout } from '@/components/contentlayout';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import { client } from '@/utils/graphql';
import { ME } from '@/utils/schema';
import { MeQuery, } from '@/generated/graphql';
import { Detail } from '../student/detail';
import React from 'react';
import { SysInfo } from './sysinfo';

const Profile = () => {
    const { data } = useQuery<MeQuery>(ME);
   return <Detail id={data?.me?.id}/>
};


export default function ProfilePage() {
    return <ApolloProvider client={client}>
        <ContentLayout title="信息管理">
            <Profile />
            <Divider >系统概览</Divider>
            <SysInfo />
        </ContentLayout>
    </ApolloProvider>;
}
