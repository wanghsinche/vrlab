import React, { useCallback } from 'react';
import { Typography, Divider, PageHeader, Button } from 'antd';
import { ApolloProvider, useQuery } from '@apollo/client';
import { client } from '@/utils/graphql';
import { COURSE_DETAIL, ICOURSE_DETAIL } from '@/utils/schema';
import ReactMarkdown from 'react-markdown'
import { resolveUploadsURL } from '@/utils/resolveurl';
import { history } from 'umi';

import './detail.less';

const { Title, Paragraph, Text, Link } = Typography;

const Detail: React.FC<{ id: string }> = (p) => {

    const { data } = useQuery<ICOURSE_DETAIL>(COURSE_DETAIL, { variables: { id: p.id } });

    const giveScore = useCallback(()=>{

    }, []);

    return <div>
        <PageHeader onBack={history.goBack} className="site-page-header" title="Course List"/>
        <Typography>
            <Title>{data?.course.name}</Title>
            <Text>course id: {data?.course.id}</Text>
            <Paragraph>
                <ReactMarkdown className="markdown">{data?.course.content ? resolveUploadsURL(data?.course.content) : ''}</ReactMarkdown>
            </Paragraph>
            
        </Typography>
        <Divider />
        <Button onClick={giveScore} type="primary">Finish</Button>
    </div>;
}

export default function DetailPage(p: any) {
    const id = p.match?.params?.id;
    return <ApolloProvider client={client}>
        <Detail id={id} />
    </ApolloProvider>
}