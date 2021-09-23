import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Steps, Select, PageHeader, Button, Form, Divider, Input, Result } from 'antd';
import { ContentLayout, Toolbar } from '@/components/contentlayout';
import { history } from 'umi';
import { ApolloProvider, useQuery } from '@apollo/client';
import { client, serverURL } from '@/utils/graphql';
import { getTemplateCourses } from '@/utils/schema';
import { GetTemplateCourseQuery } from '@/generated/graphql';

const { Step } = Steps;

const initialState = { current: 0 };

function reducer(state: typeof initialState, action: 'next' | 'prev') {
    switch (action) {
        case 'next':
            return { current: state.current + 1 };
        case 'prev':
            return { current: state.current - 1 };
        default:
            return state;
    }
}

const Add = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [form] = Form.useForm();
    const { data: templateData, loading: templateLoading } = useQuery<GetTemplateCourseQuery>(getTemplateCourses);

    useEffect(() => {
        if (!templateData?.courses || state.current !== 1) {
            return;
        }
        const id: string = form.getFieldValue('template');
        if (!id) {
            return;
        }
        const temp = templateData.courses.find(el => el?.id === id);
        if (temp) {
            form.setFieldsValue({
                ...temp,
                cover: serverURL + temp.cover?.url
            });
        }
    }, [state.current, templateData?.courses]);

    const stepDom = <Steps current={state.current} >
        <Step title="Select A Template" />
        <Step title="Modify the Detail" />
        <Step title="Preview the Detail" />
        <Step title="Confirm" />
    </Steps>;

    const loading = templateLoading;

    const btngp = <Button.Group>
        <Button disabled={state.current < 1 || /*done*/ false} onClick={() => dispatch('prev')}>Prev</Button>
        <Button type="primary" loading={loading} disabled={state.current >= 3} onClick={() => dispatch('next')}>{state.current > 1?'Submit':'Next'}</Button>
    </Button.Group>;

    const templateSelector = <Form.Item label="Template" name="template">
        <Select disabled={state.current !== 0} options={templateData?.courses?.map(el => ({ label: el!.name, value: el!.id }))} />
    </Form.Item>;

    const detail = <>
        <Form.Item label="Name" name="name">
            <Input disabled={state.current === 2} />
        </Form.Item>
        <Form.Item label="Description" name="description">
            <Input.TextArea disabled={state.current === 2} />
        </Form.Item>
        <Form.Item label="Cover" name="cover" valuePropName="src">
            <img width="200" height="100" />
        </Form.Item>
    </>;

    const resultPage = <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
            <Button type="primary" key="console">
                Go Console
      </Button>,
            <Button key="buy">Buy Again</Button>,
        ]}
    />;

    return <ContentLayout >
        <PageHeader onBack={history.goBack} className="site-page-header" title="Back" />
        <Toolbar addon="Add New Course">
            {btngp}
        </Toolbar>
        <div style={{ background: '#fff', padding: '16px' }}>
            {stepDom}
            <Divider />
            <Form form={form} style={{ width: 600, margin: '20px auto' }} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                {state.current <= 2 && templateSelector}
                {state.current <= 2 && state.current > 0 && detail}
                {state.current === 3 && resultPage}
            </Form>

        </div>
    </ContentLayout>;
};

export default function AddCoursePage() {
    return <ApolloProvider client={client}>
        <Add />
    </ApolloProvider>;
}