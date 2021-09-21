import { Descriptions, Tag, Form, Button, Input, Select, message, Modal } from 'antd';
import { FormItemProps } from 'antd/es/form/FormItem';
import ContentLayout from '@/components/contentlayout';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import { client } from '@/utils/graphql';
import { ME, PROFILE, CLASSES, updateProfile, resetPassword } from '@/utils/schema';
import { MeQuery, ProfileQuery, ClassroomQuery, UpdateProfileMutation, UpdateProfileMutationVariables, ResetPasswordMutation, ResetPasswordMutationVariables } from '@/generated/graphql';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { LockOutlined } from "@ant-design/icons";
import token from '@/utils/token';

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
            <Button onClick={() => setReseting(true)} type="link" disabled={reseting}>Reset Password</Button>
        </Descriptions.Item>

        <Descriptions.Item label="Action" span={2}>
            <Button.Group>
                {editing && <Button htmlType="submit" type="primary" loading={loading}>Save</Button>}
                {editing && <Button onClick={() => setEditing(false)}>Cancel</Button>}
                {!editing && <Button type="primary" onClick={() => setEditing(true)}>Update Profile</Button>}
            </Button.Group>
        </Descriptions.Item>
    </>;

    const onResetClose = useCallback(()=>{
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


const PasswordForm = (p: PropsWithChildren<{ show: boolean, onClose: () => void }>) => {
    const [form] = Form.useForm();
    const { data: meData } = useQuery<MeQuery>(ME);
    const [resetPwdAct, { data, loading }] = useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(resetPassword);
    const onFinish = useCallback((v) => {
        if (!meData?.me?.id) {
            return;
        }
        resetPwdAct({
            variables: {
                password: v.password,
                id: meData.me.id,
            }
        });
    }, [meData?.me?.id]);
    useEffect(() => {
        form.resetFields();
    }, [p.show]);
    useEffect(() => {
        if (data) {
            message.success("reset password");
            message.loading("relogin ...", 2000)
            token.clear();
            p.onClose();
            setTimeout(() => {
                location.reload();    
            }, 2000);
        }
    }, [data, p.onClose]);
    const prefix = <LockOutlined className="site-form-item-icon" />;
    return <Modal width={400}
        visible={p.show} onOk={() => form.submit()}
        onCancel={() => p.onClose()}
        okButtonProps={{ loading }} title="Reset Password">
        <Form form={form}
            onFinish={onFinish}
            wrapperCol={{ span: 16 }} labelCol={{ span: 8 }}>
            <Form.Item label="New Password" name="password" required={false} rules={[{ required: true, type: "string", min: 4, max: 8 }]}>
                <Input type="password" prefix={prefix} />
            </Form.Item>
            <Form.Item label="Comfirm" name="comfirm" required={false}
                rules={[{
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                }),
                ]}
            ><Input type="password" prefix={prefix} /></Form.Item>
        </Form>
    </Modal>;
}

export default function ProfilePage() {
    return <ApolloProvider client={client}>
        <ContentLayout title="Profile">
            <Profile />
        </ContentLayout>
    </ApolloProvider>;
}
