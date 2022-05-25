import React, { useCallback, useEffect } from "react";
import { client } from '@/utils/graphql';
import { Form, message, Row, Col, Button, Input, Layout, Card, Checkbox } from 'antd';
import { ApolloProvider, useMutation, useQuery } from "@apollo/client";
import token from "@/utils/token";
import Footer from '@/components/footer';
import { getHomePage, LOGIN } from "@/utils/schema";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { GetHomePageQuery } from "@/generated/graphql";
const Sign: React.FC = () => {
    const [form] = Form.useForm();
    const [login, { data, loading, error }] = useMutation(LOGIN);

    useEffect(() => {
        if (error) {
            message.error('login failed');
        }
        if (data?.login?.jwt) {
            token.val = data?.login?.jwt;
            message.success("欢迎 " + data.login.user.email);
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


    return <Card title="欢迎你！请先登入" style={{ maxWidth: 400, margin: 'auto' }} bordered={false}>
        <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{ remember: token.permanent }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入用户名或email' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名或者email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" >
                <Checkbox onChange={(e) => token.persist(e.target.checked)}>保留登入信息</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                    登入
                </Button>
            </Form.Item>
        </Form>

    </Card>;
};

const Page = () => {
    const { loading: homepageLoading, data: homepageData} = useQuery<GetHomePageQuery>(getHomePage);

    return <Layout>
        <Layout.Header style={{ color: "#ffffff" }}> {homepageData?.homepage?.hero?.title} </Layout.Header>
        <Layout.Content style={{background: '#fff'}}>
            <Card loading={homepageLoading}>
                <Sign />
            </Card>
        </Layout.Content>
        <Footer />
    </Layout>;
}

export default function SignPage(){
    return <ApolloProvider client={client}>
        <Page />
    </ApolloProvider>;
};
