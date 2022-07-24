import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Select, Button, Popconfirm, Descriptions, Empty, message, Tag, PageHeader, Modal } from 'antd';
import { FormItemProps } from 'antd/es/form/FormItem';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import { ClassroomQuery, MeQuery, ProfileQuery, ResetPasswordMutation, ResetPasswordMutationVariables, UpdateProfileMutation, UpdateProfileMutationVariables } from '@/generated/graphql';
import { CLASSES, ME, PROFILE, resetPassword, updateProfile } from '@/utils/schema';
import { ContentLayout, Toolbar } from '@/components/contentlayout';
import { history } from 'umi';
import { client } from '@/utils/graphql';
import { REST_PROFILE, rest_resetPassword, rest_updateProfile } from '@/utils/restschema';
import { PasswordForm } from '@/pages/profile/password';

const FormItem = (p: FormItemProps) => {
    const { children, ...others } = p;
    return <Form.Item noStyle={true} rules={[{ required: false }]} {...others}>{children}</Form.Item>;
}

export const Detail = ({ id }: { id?: string;  }) => {
    const { data: meData } = useQuery<MeQuery>(ME);

    const { data: profileData, refetch } = useQuery<ProfileQuery>(REST_PROFILE, {
        variables: { id },
    });
    const { data: classData } = useQuery<ClassroomQuery>(CLASSES);
    const [form] = Form.useForm();
    const [editing, setEditing] = useState(false);

    const [updateProfileAct, { loading, data: updateRes }] = useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(rest_updateProfile);
    const [resetPwdAct, { loading: resetPwdLoading, data: resetRes }] = useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(rest_resetPassword);

    const [reseting, setReseting] = useState(false);

    const myself = meData?.me?.id === id;

    useEffect(() => {
        form.setFieldsValue({
            email: profileData?.user?.email,
            realname: profileData?.user?.realname,
            realid: profileData?.user?.realid,
            class: profileData?.user?.class?.id && String(profileData?.user?.class?.id)
        });
    }, [editing, profileData]);

    useEffect(() => {
        if (updateRes) {
            setEditing(false);
            message.success("更新成功");
            refetch();
        }
    }, [updateRes]);

    const onFinish = useCallback((v) => {
        if (!id) {
            return;
        }
        updateProfileAct({
            variables: {
                ...v,
                id,
            }
        })
    }, [id]);

    const onResetPassword = useCallback(() => {
        if (!profileData?.user?.username || !id) {
            return;
        }
        resetPwdAct({
            variables: {
                password: profileData.user.username,
                id
            }
        });

    }, [id, profileData]);

    useEffect(() => {
        if (resetRes) {
            message.success("更新密码成功");
        }
    }, [resetRes]);
    const onResetClose = useCallback(() => {
        setReseting(false);
    }, []);
    const formDom = <>
        <Descriptions.Item label="用户名">
            {profileData?.user?.username}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
            <FormItem name="email" >
                <Input type="email" disabled />
            </FormItem>
        </Descriptions.Item>
        <Descriptions.Item label="权限"><Tag color="blue">{profileData?.user?.role?.name}</Tag></Descriptions.Item>
        <Descriptions.Item label="姓名">
            <FormItem name="realname" >
                <Input type="text" disabled />
            </FormItem>
        </Descriptions.Item>
        <Descriptions.Item label="学号">
            <FormItem name="realid" >
                <Input type="text" disabled />
            </FormItem>
        </Descriptions.Item>
        <Descriptions.Item label="班级">
            <FormItem name="class" >
                <Select showSearch
                    filterOption={(input, option) =>
                        (option?.label as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    style={{ minWidth: 100 }} disabled={!editing} options={classData?.classes?.map(el => ({
                        label: `${el!.grade!}-${el!.department!}-${el!.name!}`, value: el!.id,
                    }))} />
            </FormItem>
        </Descriptions.Item>
        <Descriptions.Item label="用户ID" >
            {profileData?.user?.id}
        </Descriptions.Item>

        <Descriptions.Item label="密码">
            {!myself && <Popconfirm title='是否重置密码，重置后新密码与用户名相同' disabled onConfirm={onResetPassword}>
                <Button type="link" loading={resetPwdLoading} disabled>重置密码</Button>
            </Popconfirm>}
            {myself && <Button onClick={() => setReseting(true)} type="link" disabled>重置密码</Button>}

        </Descriptions.Item>

    </>;

    const btngp = <Button.Group>
        {editing && <Popconfirm title="你确定吗？" onConfirm={() => form.submit()}><Button htmlType="submit" type="primary" loading={loading}>保存</Button></Popconfirm>}
        {editing && <Button onClick={() => setEditing(false)}>取消</Button>}
        {!editing && <Button type="primary" onClick={() => setEditing(true)} disabled={!myself} >编辑信息</Button>}
    </Button.Group>;


    return <ContentLayout>
        <PageHeader onBack={history.goBack} className="site-page-header" title="返回" />
        <Toolbar>
            {btngp}
        </Toolbar>
        <Form form={form} onFinish={onFinish} >
            <Descriptions bordered style={{ background: '#fff' }}>
                {formDom}
            </Descriptions>
        </Form>
        <PasswordForm show={reseting} onClose={onResetClose} />
    </ContentLayout>;

}

export default function DetailPage(p: any) {
    const id = p.match?.params?.id;

    return <ApolloProvider client={client}>
        <Detail id={id} />
    </ApolloProvider>
}