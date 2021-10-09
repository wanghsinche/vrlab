import React, { useCallback, useEffect } from 'react';
import {Empty, PageHeader, Form, Button, Popconfirm, Input, Switch, message, Tag} from 'antd';
import { ContentLayout, Toolbar } from '@/components/contentlayout';
import { history } from 'umi';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import { COURSE_DETAIL, updateCourse } from '@/utils/schema';
import { CourseDetailQuery, UpdateCourseMutation, UpdateCourseMutationVariables } from '@/generated/graphql';
import { client, serverURL } from '@/utils/graphql';

const IsTemplate = ({value}:{value?:boolean})=>value?<Tag color="blue">课程模板</Tag>:<Tag color="green">普通课程</Tag>;

const Detail = ({ id }: { id?: string }) => {
    if (!id) {
        return <Empty />;
    }
    const [form] = Form.useForm();

    const {data:courseRes} = useQuery<CourseDetailQuery>(COURSE_DETAIL, {variables: {id}});
    const [updateAct, {data:updateRes, loading:updateLoading}] = useMutation<UpdateCourseMutation, UpdateCourseMutationVariables>(updateCourse);

    const btngp = <Button.Group>
        <Popconfirm title="Are you sure?" onConfirm={() => form.submit()}><Button htmlType="submit" type="primary" loading={updateLoading}>Save</Button></Popconfirm>
        <Button onClick={() => history.goBack()}>Cancel</Button>
    </Button.Group>;

    const onFinish= useCallback((v)=>{
        updateAct({variables:{
            ...v,
            id
        }})
    }, [id]);

    useEffect(()=>{
        if (courseRes?.course){
            form.setFieldsValue({
                ...courseRes.course,
                cover: serverURL + courseRes.course.cover?.url
            })
        }
    }, [courseRes?.course]);

    useEffect(()=>{
        if (updateRes?.updateCourse){
            message.success("Update Course!");
        }
    }, [updateRes]);

    return <ContentLayout>
    <PageHeader onBack={history.goBack} className="site-page-header" title="Back" />
    <Toolbar>
        {btngp}
    </Toolbar>
    <div style={{background:'#fff', padding:"50px 0"}}>

    <Form form={form} onFinish={onFinish} style={{margin:"auto", width: 800}} labelCol={{span: 4}} wrapperCol={{span: 20}}>
        <Form.Item label="Name" name="name" rules={[{required:true}]}>
            <Input />
        </Form.Item>
        <Form.Item label="IsTemplate" name="isTemplate" >
            <IsTemplate />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{required:true}]}>
            <Input.TextArea />
        </Form.Item>
        <Form.Item label="Available" name="available" rules={[{required:true}]} valuePropName="checked">
            <Switch disabled={!!(courseRes?.course?.isTemplate)}/>
        </Form.Item>
        <Form.Item label="Cover" name="cover" valuePropName="src">
            <img width="300" height="150" />
        </Form.Item>
        <Form.Item label="VR" name="vrlink" valuePropName="src">
            <iframe width="400" height="300"/>
        </Form.Item>
        <Form.Item label="Content" name="content" >
            <Input.TextArea rows={30}/>
        </Form.Item>

    </Form>
    </div>

</ContentLayout>
}


export default function CourseMgrDetailPage(p:any){
    const id = p.match?.params?.id;

    return <ApolloProvider client={client}>
        <Detail id={id}/>
    </ApolloProvider>
}