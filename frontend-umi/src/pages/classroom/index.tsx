import { Table, Modal, Form, Input, Space, message, Button } from 'antd';
import {ContentLayout, Toolbar} from '@/components/contentlayout';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import { client } from '@/utils/graphql';
import { createClass, listClass, updateClass } from '@/utils/schema';
import { CreateClassMutation, CreateClassMutationVariables, ListClassQuery, UpdateClassMutation, UpdateClassMutationVariables } from '@/generated/graphql';
import { useCallback, useEffect, useMemo, useState } from 'react';




const Classroom = ()=>{
    const { data: classRes, loading: classLoading, refetch} = useQuery<ListClassQuery>(listClass);
    const [editing, setEditing] = useState(false);
    const [current, setCurrent] = useState<{id:string, name:string}|null>(null);
    const columns = useMemo(()=>[
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Create at',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'id',
            render: (_:string, record: any) => (
                <Space size="middle">
                    <a onClick={()=>{setCurrent(record);setEditing(true);}}>Edit</a>
                </Space>
            ),
        },
    ], []); 
    return <ContentLayout title="Class Manage">
        <Toolbar>
            <Button 
            type="primary"
            onClick={()=>{
                setCurrent(null);
                setEditing(true);
            }}>Add</Button>
        </Toolbar>
        <Table rowKey="id" columns={columns} dataSource={classRes?.classes as any} loading={classLoading}/> 
        <DetailModal editing={editing} onClose={()=>{
            setEditing(false);
            refetch();
            }} id={current?.id} name={current?.name}/>
    </ContentLayout>; 
}

const DetailModal = (p: {id?:string, name?:string, onClose: ()=>void, editing:boolean})=>{
    const [form] = Form.useForm();
    const [updateAct, {data:updateRes, loading:updateLoading}] = useMutation<UpdateClassMutation, UpdateClassMutationVariables>(updateClass);
    const [createAct, {data:createRes, loading:createLoading}] = useMutation<CreateClassMutation, CreateClassMutationVariables>(createClass);
    const onFinish = useCallback((v)=>{
        if (p.id){
            updateAct({variables:{name:v.name, id:p.id}});
        } else {
            createAct({variables:{name:v.name}});
        }
    }, [p.id]);
    useEffect(()=>{
        if (updateRes){
            message.success("update!");
            p.onClose();
        }
        if (createRes){
            message.success("create!");
            p.onClose();
        }
    }, [updateRes, createRes]);
    useEffect(()=>{
        if(p.name){
            form.setFieldsValue({name:p.name})
        }
    }, [p.name]);
    const title = p.id?'Update Class':'Create Class';
    return <Modal title={title} visible={p.editing} onOk={()=>form.submit()} onCancel={p.onClose} okButtonProps={{loading:updateLoading||createLoading}}>
        <Form form={form} onFinish={onFinish}>
            <Form.Item name="name" label="Name" rules={[{required:true}]}><Input /></Form.Item>
        </Form>
    </Modal>;
}

export default function ClassPage() { 
    return <ApolloProvider client={client}>
        <Classroom />
    </ApolloProvider>
};
