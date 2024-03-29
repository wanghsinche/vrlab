import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { Steps, Select, PageHeader, Button, Form, Divider, Input, Result, Spin } from 'antd';
import { ContentLayout, Toolbar } from '@/components/contentlayout';
import { history, Link } from 'umi';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import { client, serverURL } from '@/utils/graphql';
import { getTemplateCourses, addCourse } from '@/utils/schema';
import { GetTemplateCourseQuery, AddCourseMutation, AddCourseMutationVariables } from '@/generated/graphql';

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
    const [ addCourseAction, { data: addCourseRes, loading: addCourseLoading, error: addCourseError}] = useMutation<AddCourseMutation, AddCourseMutationVariables>(addCourse)
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
                cover: serverURL + temp.cover?.url,
                meta: JSON.stringify(temp.meta, null, 2)
            });
        }
    }, [state.current, templateData?.courses]);

    const submit = useCallback((v)=>{
        if (!templateData?.courses){
            return;
        }
        const temp = templateData.courses.find(el => el?.id === v.template);
        if (!temp){
            return;
        }
        addCourseAction({variables:{
            ...temp,
            ...v,
            meta: temp.meta,
            isTemplate: false,
            cover: temp.cover?.id
        }});
        dispatch('next');
    }, [templateData]);

    const stepDom = <Steps current={state.current} >
        <Step title="选择模板" />
        <Step title="修改课程" />
        <Step title="预览" />
        <Step title="完成" />
    </Steps>;

    const loading = templateLoading;

    const disableStep = !!(addCourseError || addCourseLoading || addCourseRes);

    const btngp = <Button.Group>
        <Button disabled={state.current < 1 || disableStep} onClick={() => dispatch('prev')}>Prev</Button>
        <Button type="primary" loading={loading} disabled={disableStep} 
            onClick={() => {
                if (state.current === 2) {
                    form.submit();
                }else{
                    dispatch("next");
                }
            }}
        >{state.current > 1?'Submit':'Next'}</Button>
    </Button.Group>;

    const templateSelector = <Form.Item label="Template" name="template">
        <Select disabled={state.current !== 0} options={templateData?.courses?.map(el => ({ label: el!.name, value: el!.id }))} />
    </Form.Item>;

    const detail = <>
        <Form.Item label="课程名称" name="name">
            <Input disabled={state.current === 2} />
        </Form.Item>
        <Form.Item label="课程信息" extra="用于填写老师，学院，班级等信息" name="description">
            <Input.TextArea disabled={state.current === 2} placeholder="格式: [老师] 学院 班级" />
        </Form.Item>
        <Form.Item label="课程封面" name="cover" valuePropName="src">
            <img width="200" height="100" />
        </Form.Item>
        <Form.Item label="VR" name="vrlink" valuePropName="src">
            <iframe width="600" height="400" style={{pointerEvents:'none',}}/>
        </Form.Item>
        <Form.Item label="课程文字内容" name="content" >
            <Input.TextArea rows={30} disabled={state.current === 2}/>
        </Form.Item>
        <Form.Item label="WEBGL META" name="meta" >
            <Input.TextArea rows={10} disabled/>
        </Form.Item>
    </>;

    const resultPage = useMemo(()=>{
        if (addCourseRes?.createCourse?.course){
            return <Result
                status="success"
                title="成功新建一个课程!"
                subTitle={`课程 ID: ${addCourseRes?.createCourse?.course.id}`}
                extra={[
                    <Link to="/course" key="list">
                        <Button type="primary" >
                            前往课程列表
                        </Button>
                    </Link>,
                ]}
            />
        } 
        if (addCourseLoading){
            return <Result 
                status="info" 
                title="创建中，请等待"
                subTitle={<Spin spinning/>}
            />;
        }
        if (addCourseError) {
            return <Result
            status="error" 
            title="创建失败"
            subTitle={addCourseError.message}
            extra={<Button type="primary" onClick={()=>dispatch("prev")}>
                请仔细检查输入的信息
            </Button>}
        />;
        }
    }, [addCourseRes, addCourseLoading, addCourseError]);

    return <ContentLayout >
        <PageHeader onBack={history.goBack} className="site-page-header" title="返回" />
        <Toolbar addon="添加新课程">
            {btngp}
        </Toolbar>
        <div style={{ background: '#fff', padding: '16px' }}>
            {stepDom}
            <Divider />
            <Form form={form} 
            onFinish={submit}
            style={{ width: 800, margin: '20px auto' }} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
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