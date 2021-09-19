import { Descriptions, Tag } from 'antd';
import ContentLayout from '@/components/contentlayout';
import { ApolloProvider, useQuery } from '@apollo/client';
import { client } from '@/utils/graphql';
import { ME, PROFILE } from '@/utils/schema';
import { MeQuery, ProfileQuery } from '@/generated/graphql';

const Profile = () => {
    const {data} = useQuery<MeQuery>(ME);
    const {data:profileData} = useQuery<ProfileQuery>(PROFILE, {
        variables: {id:data?.me?.id},
        skip: !data?.me?.id
    });
    return <ContentLayout title="Profile">
        <Descriptions bordered style={{background: '#fff'}}>
            <Descriptions.Item label="UserName">{data?.me?.username}</Descriptions.Item>
            <Descriptions.Item label="Email">{data?.me?.email}</Descriptions.Item>
            <Descriptions.Item label="Role"><Tag>{data?.me?.role?.name}</Tag></Descriptions.Item>
            <Descriptions.Item label="Name" span={2}>
                {profileData?.user?.realname}
            </Descriptions.Item>
            <Descriptions.Item label="Class">{profileData?.user?.class?.name}</Descriptions.Item>
        </Descriptions>
    </ContentLayout>;
};


export default function ProfilePage() {
    return <ApolloProvider client={client}>
        <Profile />
    </ApolloProvider>;
}
