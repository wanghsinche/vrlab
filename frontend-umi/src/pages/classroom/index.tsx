import { Table, Modal, Form, Input, Space, message, Button } from 'antd';
import { ContentLayout, Toolbar } from '@/components/contentlayout';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import { client } from '@/utils/graphql';
import { createClass, listClass, updateClass } from '@/utils/schema';
import { CreateClassMutation, CreateClassMutationVariables, ListClassQuery, UpdateClassMutation, UpdateClassMutationVariables, Class as ClassObj } from '@/generated/graphql';
import { useCallback, useEffect, useMemo, useState } from 'react';




const Classroom = () => {
    const { data: classRes, loading: classLoading, refetch } = useQuery<ListClassQuery>(listClass);
    const [editing, setEditing] = useState(false);
    const [current, setCurrent] = useState<ClassObj | null>(null);
    const columns = useMemo(() => [
        {
            title: '班级ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '年级',
            dataIndex: 'grade',
            key: 'grade',
        },
        {
            title: '学院',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: '班级名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '创建于',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: '操作',
            key: 'action',
            dataIndex: 'id',
            render: (_: string, record: any) => (
                <Space size="middle">
                    <a onClick={() => { setCurrent(record); setEditing(true); }}>编辑</a>
                </Space>
            ),
        },
    ], []);
    return <ContentLayout title="班级管理">
        <Toolbar>
            <Button
                type="primary"
                onClick={() => {
                    setCurrent(null);
                    setEditing(true);
                }}>添加班级</Button>
        </Toolbar>
        <Table rowKey="id" columns={columns} dataSource={classRes?.classes as any} loading={classLoading} />
        <DetailModal editing={editing} onClose={() => {
            setEditing(false);
            refetch();
        }} id={current?.id as string} {...current} />
    </ContentLayout>;
}

const DetailModal = (p: Partial<ClassObj> & { onClose: () => void, editing: boolean }) => {
    const [form] = Form.useForm();
    const [updateAct, { data: updateRes, loading: updateLoading }] = useMutation<UpdateClassMutation, UpdateClassMutationVariables>(updateClass);
    const [createAct, { data: createRes, loading: createLoading }] = useMutation<CreateClassMutation, CreateClassMutationVariables>(createClass);
    const onFinish = useCallback((v) => {
        if (p.id) {
            updateAct({ variables: { name: v.name, id: p.id, grade: v.grade, department: v.department } });
        } else {
            createAct({ variables: { name: v.name, grade: v.grade, department: v.department } });
        }
    }, [p.id]);
    useEffect(() => {
        if (updateRes) {
            message.success("update!");
            p.onClose();
        }
        if (createRes) {
            message.success("create!");
            p.onClose();
        }
    }, [updateRes, createRes]);
    useEffect(() => {
        if (p.name) {
            form.setFieldsValue({ ...p })
        }
    }, [p.name]);
    const title = p.id ? '更新班级' : '创建班级';
    return <Modal title={title} visible={p.editing} onOk={() => form.submit()} onCancel={p.onClose} okButtonProps={{ loading: updateLoading || createLoading }}>
        <Form form={form} onFinish={onFinish}>
            <Form.Item name="grade" label="年级" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="department" label="学院" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="name" label="班级名称" rules={[{ required: true }]}><Input /></Form.Item>
        </Form>
    </Modal>;
}

export default function ClassPage() {
    return <ApolloProvider client={client}>
        <Classroom />
    </ApolloProvider>
};
