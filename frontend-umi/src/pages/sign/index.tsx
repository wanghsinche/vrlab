import React, { useCallback, useEffect } from "react";
import { client } from '@/utils/graphql';
import { Form, message, Row, Col, Button, Input, Layout, Card, Checkbox } from 'antd';
import { ApolloProvider, useMutation } from "@apollo/client";
import token from "@/utils/token";
import Footer from '@/components/footer';
import { LOGIN } from "@/utils/schema";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const Sign: React.FC = () => {
    const [form] = Form.useForm();
    const [login, { data, loading, error }] = useMutation(LOGIN);

    useEffect(() => {
        if (error) {
            message.error('login failed');
        }
        if (data?.login?.jwt) {
            token.val = data?.login?.jwt;
            message.success("wellcome " + data.login.user.email);
            location.href = "/";
        }
    }, [data, error]);

    const onFinish = useCallback((v) => {
        token.clear();
        login({
            variables: {
                identifier: v.username,
                password: v.password
            }
        });
    }, [login]);


    return <Card title="Wellcome to VR Lab" style={{ width: 400, margin: 'auto' }} bordered={false}>
        <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{ remember: token.permanent }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名或者email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" >
                <Checkbox onChange={(e) => token.persist(e.target.checked)}>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                    Sign In
                </Button>
            </Form.Item>
        </Form>

    </Card>;
};

function SignPage() { return <ApolloProvider client={client}><Sign /></ApolloProvider>; }

const Page = () => {
    return <Layout>
        <Layout.Header style={{ color: "#ffffff" }}> VR Lab </Layout.Header>
        <Layout.Content style={{background: '#fff'}}>
            <Card >
                <SignPage />
            </Card>
        </Layout.Content>
        <Footer />
    </Layout>;
}

export default Page;
