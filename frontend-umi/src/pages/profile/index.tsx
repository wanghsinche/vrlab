import { Descriptions, Tag, Form, Button, Input, Select, message, Popconfirm } from 'antd';
import { FormItemProps } from 'antd/es/form/FormItem';
import { ContentLayout } from '@/components/contentlayout';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import { client } from '@/utils/graphql';
import { ME, PROFILE, CLASSES, updateProfile } from '@/utils/schema';
import { MeQuery, ProfileQuery, ClassroomQuery, UpdateProfileMutation, UpdateProfileMutationVariables, ResetPasswordMutation, ResetPasswordMutationVariables } from '@/generated/graphql';
import { useCallback, useEffect, useState } from 'react';
import { PasswordForm } from './password';
const FormItem = (p: FormItemProps) => {
    const { children, ...others } = p;
    return <Form.Item noStyle={true} rules={[{ required: false }]} {...others}>{children}</Form.Item>;
}

const Profile = () => {
    const { data } = useQuery<MeQuery>(ME);
    const { data: profileData, refetch } = useQuery<ProfileQuery>(PROFILE, {
        variables: { id: data?.me?.id },
        skip: !data?.me?.id
    });
    const { data: classData } = useQuery<ClassroomQuery>(CLASSES);
    const [form] = Form.useForm();
    const [editing, setEditing] = useState(false);
    const [reseting, setReseting] = useState(false);

    const [updateProfileAct, { loading, data: updateRes }] = useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(updateProfile);

    useEffect(() => {
        form.setFieldsValue({
            email: profileData?.user?.email,
            realname: profileData?.user?.realname,
            realid: profileData?.user?.realid,
            class: profileData?.user?.class?.id
        });
    }, [editing, profileData]);

    useEffect(() => {
        if (updateRes) {
            setEditing(false);
            message.success("update sucessfully");
            refetch();
        }
    }, [updateRes]);

    const onFinish = useCallback((v) => {
        if (!data?.me?.id) {
            return;
        }
        updateProfileAct({
            variables: {
                ...v,
                id: data.me.id,
            }
        })
    }, [data?.me?.id]);

    const formDom = <>
        <Descriptions.Item label="UserName">
            {profileData?.user?.username}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
            <FormItem name="email" >
                <Input type="email" disabled={!editing} />
            </FormItem>
        </Descriptions.Item>
        <Descriptions.Item label="Role"><Tag color="blue">{profileData?.user?.role?.name}</Tag></Descriptions.Item>
        <Descriptions.Item label="RealName">
            <FormItem name="realname" >
                <Input type="text" disabled={!editing} />
            </FormItem>
        </Descriptions.Item>
        <Descriptions.Item label="RealID">
            <FormItem name="realid" >
                <Input type="text" disabled={!editing} />
            </FormItem>
        </Descriptions.Item>
        <Descriptions.Item label="Class">
            <FormItem name="class" >
                <Select style={{ minWidth: 100 }} disabled={!editing} options={classData?.classes?.map(el => ({
                    label: el!.name, value: el!.id,
                }))} />
            </FormItem>
        </Descriptions.Item>
        <Descriptions.Item label="Password">
            <Button onClick={() => setReseting(true)} type="link" disabled={reseting || editing}>Reset Password</Button>
        </Descriptions.Item>

        <Descriptions.Item label="Action" span={2}>
            <Button.Group>
                {editing && <Popconfirm title="Are you sure?" onConfirm={() => form.submit()}><Button htmlType="submit" type="primary" loading={loading}>Save</Button></Popconfirm>}
                {editing && <Button onClick={() => setEditing(false)}>Cancel</Button>}
                {!editing && <Button type="primary" onClick={() => setEditing(true)}>Update Profile</Button>}
            </Button.Group>
        </Descriptions.Item>
    </>;

    const onResetClose = useCallback(() => {
        setReseting(false);
    }, []);

    return <div>
        <Form form={form} onFinish={onFinish} >
            <Descriptions bordered style={{ background: '#fff' }}>
                {formDom}
            </Descriptions>
        </Form>
        <PasswordForm show={reseting} onClose={onResetClose} />
    </div>;
};


export default function ProfilePage() {
    return <ApolloProvider client={client}>
        <ContentLayout title="Profile">
            <Profile />
        </ContentLayout>
    </ApolloProvider>;
}
