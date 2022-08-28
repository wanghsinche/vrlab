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
        <Popconfirm title="你确定吗？" onConfirm={() => form.submit()}><Button htmlType="submit" type="primary" loading={updateLoading}>保存</Button></Popconfirm>
        <Button onClick={() => history.goBack()}>取消</Button>
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
            message.success("更新成功！");
        }
    }, [updateRes]);

    return <ContentLayout>
    <PageHeader onBack={history.goBack} className="site-page-header" title="返回" />
    <Toolbar>
        {btngp}
    </Toolbar>
    <div style={{background:'#fff', padding:"50px 0"}}>

    <Form form={form} onFinish={onFinish} style={{margin:"auto", width: 800}} labelCol={{span: 4}} wrapperCol={{span: 20}}>
        <Form.Item label="课程名称" name="name" rules={[{required:true}]}>
            <Input />
        </Form.Item>
        <Form.Item label="是否为模板" name="isTemplate" >
            <IsTemplate />
        </Form.Item>

        <Form.Item label="课程信息" extra="用于填写老师，学院，班级等信息" name="description" rules={[{required:true}]}>
            <Input.TextArea />
        </Form.Item>
        <Form.Item label="是否可用" name="available" rules={[{required:true}]} valuePropName="checked">
            <Switch disabled={!!(courseRes?.course?.isTemplate)}/>
        </Form.Item>
        <Form.Item label="课程封面" name="cover" valuePropName="src">
            <img width="300" height="150" />
        </Form.Item>
        <Form.Item label="VR" name="vrlink" valuePropName="src">
            <iframe width="400" height="300"/>
        </Form.Item>
        <Form.Item label="课程文字内容" name="content" >
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