import { Form, Input, message, Modal } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { ME, resetPassword } from '@/utils/schema';
import { MeQuery, ResetPasswordMutation, ResetPasswordMutationVariables } from '@/generated/graphql';
import { PropsWithChildren, useCallback, useEffect } from 'react';
import { LockOutlined } from "@ant-design/icons";
import token from '@/utils/token';

export const PasswordForm = (p: PropsWithChildren<{ show: boolean, onClose: () => void }>) => {
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
        okButtonProps={{ loading }} title="密码重置">
        <Form form={form}
            onFinish={onFinish}
            wrapperCol={{ span: 16 }} labelCol={{ span: 8 }}>
            <Form.Item label="新的密码" name="password" required={false} rules={[{ required: true, type: "string", min: 4, max: 8 }]}>
                <Input type="password" prefix={prefix} />
            </Form.Item>
            <Form.Item label="再次输入" name="comfirm" required={false}
                rules={[{
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('两次密码输入不一致'));
                    },
                }),
                ]}
            ><Input type="password" prefix={prefix} /></Form.Item>
        </Form>
    </Modal>;
}