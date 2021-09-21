import React, { useCallback } from 'react';
import {ContentLayout, Toolbar} from '@/components/contentlayout';
import { PageHeader, Form, Input, Button, message, Popconfirm } from 'antd';
import { history, Link } from 'umi';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/utils/graphql';

function convert(value:string){
    const lines = value.split(';').map(el=>el.trim()).filter(el=>!!el);
    return lines.map(el=>{
        const [code, name, email] = el.split(',');
        return {code, name, email};
    })
}

function validator(_:any, value:string) {
    if (!value ) {
        return Promise.reject(new Error('Please input data'));
    }
    try {
        const lines = value.split(';').map(el=>el.trim()).filter(el=>!!el);
        if (value.split('\n').length > lines.length ){
            console.log('sjfjasdf');
            return Promise.reject(new Error('wrong format'));
        };
        const res = lines.every(el=>{
            const [code, name, email] = el.split(',');
            return code && name && email;
        })
        if (lines.length > 0 && res) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('wrong format'));
    } catch (error) {
        return Promise.reject(error);      
    }
};


const Add = ()=>{
    const [form] = Form.useForm();
    const onFinish = useCallback((v)=>{
        console.log(convert(v.users));
    }, []);
    return <ContentLayout >
        <PageHeader onBack={history.goBack} className="site-page-header" title="Back" />
        <Toolbar >
            <Button.Group>
                <Popconfirm title="请确认数据无误" onConfirm={()=>form.submit()}>
                    <Button type="primary">Save</Button>
                </Popconfirm>
                <Link to="/manage/student"><Button>Cancel</Button></Link>
            </Button.Group>
        </Toolbar>
        <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item label="批量录入用户" name="users" rules={[{required: true,}, {validator}]}>
                <Input.TextArea cols={10} rows={10} placeholder={`
一个学生数据占一行，数据段使用逗号分隔，每行以分号结尾。
注意区分中英文符号，注意去除末尾空行。
按照　学号,姓名,邮箱;　格式录入：
201010,艾安安,aa.ai@edu.cn;
201011,毕波波,bb.bi@edu.cn;

新增用户使用学号或者邮箱登入，初始密码为学号。新增用户首次登入后请自行修改密码并选择班级。

`}/>
            </Form.Item>
        </Form>
    </ContentLayout>
};

export default function AddPage(){
    return <ApolloProvider client={client}>
        <Add />
    </ApolloProvider>
}