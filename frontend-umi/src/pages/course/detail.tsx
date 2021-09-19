import React, { useCallback, useEffect, useState } from 'react';
import { Typography, Divider, PageHeader, Button, Progress, message } from 'antd';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import { client } from '@/utils/graphql';
import { COURSE_DETAIL, GETSCORE, ME, updateScore, createScore } from '@/utils/schema';
import ReactMarkdown from 'react-markdown'
import { resolveUploadsURL } from '@/utils/resolveurl';
import { history } from 'umi';
import ContentLayout from '@/components/contentlayout';
import { CourseDetailQuery, MeQuery, GetScoreQuery, UpdateScoreMutation, CreateScoreMutation, UpdateScoreMutationVariables, CreateScoreMutationVariables } from '@/generated/graphql';
import './detail.less';

const { Title, Paragraph, Text, Link } = Typography;

const Detail: React.FC<{ id: string }> = (p) => {
    const { data } = useQuery<CourseDetailQuery>(COURSE_DETAIL, { variables: { id: p.id } });
    const { data: meData } = useQuery<MeQuery>(ME);
    const { data: scoreData, refetch: refetchScore  } = useQuery<GetScoreQuery>(GETSCORE, { 
        variables: { student: meData?.me?.id, course: p.id },
        skip: !meData,
    });

    const [opUpdateScore, resUpdateScore] = useMutation<UpdateScoreMutation, UpdateScoreMutationVariables>(updateScore);
    const [opCreateScore, resCreateScore] = useMutation<CreateScoreMutation, CreateScoreMutationVariables>(createScore);


    const score = scoreData?.scores && scoreData?.scores[0];

    const giveScore = useCallback(() => {
        if (!meData?.me?.id) {
            return;
        }
        if (score) {
            opUpdateScore({variables:{
                point: Math.ceil(100*Math.random()),
                detail: JSON.stringify({"process1":50, "process2":10}),
                id: score.id
            }});
        } else {
            opCreateScore({variables:{
                point: Math.ceil(100*Math.random()),
                detail: JSON.stringify({"process1":50, "process2":10}),
                course: p.id,
                student: meData.me.id
            }});
        }
    }, [score, p.id, meData?.me?.id]);

    useEffect(()=>{
        if (resUpdateScore.data) {
            message.success('update score!');
            refetchScore();
        }
        if (resCreateScore.data) {
            message.success('create score!');
            refetchScore();
        }

        if (resUpdateScore.error || resCreateScore.error){
            message.error(resUpdateScore.error?.message || resCreateScore.error?.message);
        }
    }, [resUpdateScore.data, resCreateScore.data, resUpdateScore.error, resCreateScore.error]);

    return <ContentLayout>
        <PageHeader onBack={history.goBack} className="site-page-header" title="Course List" />
        <Typography>
            <Title>{data?.course?.name}</Title>
            <Text>course id: {data?.course?.id}</Text>
            {score && <Paragraph>Last Score: <Progress percent={Number(score?.point)} /></Paragraph>}
            <Paragraph>student id: {meData?.me?.id}</Paragraph>
            <Paragraph>
                <ReactMarkdown className="markdown">{data?.course?.content ? resolveUploadsURL(data?.course.content) : ''}</ReactMarkdown>
            </Paragraph>
        </Typography>
        <Divider />
        <Button onClick={giveScore} type="primary" loading={resCreateScore.loading||resUpdateScore.loading}>Finish</Button>
    </ContentLayout>;
}

export default function DetailPage(p: any) {
    const id = p.match?.params?.id;
    return <ApolloProvider client={client}>
        <Detail id={id} />
    </ApolloProvider>
}