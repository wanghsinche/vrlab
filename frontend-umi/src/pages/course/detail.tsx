import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { Typography, Divider, PageHeader, Button, Progress, Popconfirm ,message, Empty, Descriptions, Tag } from 'antd';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import { client } from '@/utils/graphql';
import { COURSE_DETAIL, GETSCORE, ME, updateScore, createScore } from '@/utils/schema';
import ReactMarkdown from 'react-markdown'
import { resolveUploadsURL } from '@/utils/resolveurl';
import { history, Prompt } from 'umi';
import { ContentLayout, Toolbar } from '@/components/contentlayout';
import { CourseDetailQuery, MeQuery, GetScoreQuery, UpdateScoreMutation, CreateScoreMutation, UpdateScoreMutationVariables, CreateScoreMutationVariables } from '@/generated/graphql';
import moment from 'moment';
import './detail.less';
import { EnhancedIframe } from '@/components/enhancediframe';

const { Title, Paragraph, Text, Link } = Typography;

const initialState = { current: 0 };

function reducer(state: typeof initialState, action: 'add') {
    switch (action) {
        case 'add':
            return { current: state.current + 1 > 100 ? 0 : state.current + 1 };
        default:
            return state;
    }
}

const Timer = () => {
    const [time, dispatch] = useReducer(reducer, initialState);
    const start = useRef(moment());
    const timer = useRef<NodeJS.Timeout>();
    const color = ['red', 'blue', 'yellow', 'green', 'orange'][time.current % 5];
    useEffect(() => {
        timer.current = setTimeout(function ii() {
            dispatch('add');
            timer.current = setTimeout(ii, 3000);
        }, 3000);
        return () => timer.current && clearTimeout(timer.current);
    }, []);
    return <Tag color={color} >{moment.duration(moment().diff(start.current)).minutes()}分钟</Tag>
}

const Detail: React.FC<{ id: string }> = (p) => {
    const { data } = useQuery<CourseDetailQuery>(COURSE_DETAIL, { variables: { id: p.id } });
    const { data: meData } = useQuery<MeQuery>(ME);
    const { data: scoreData, refetch: refetchScore } = useQuery<GetScoreQuery>(GETSCORE, {
        variables: { student: meData?.me?.id, course: p.id },
        skip: !meData,
    });
    const [opUpdateScore, resUpdateScore] = useMutation<UpdateScoreMutation, UpdateScoreMutationVariables>(updateScore);
    const [opCreateScore, resCreateScore] = useMutation<CreateScoreMutation, CreateScoreMutationVariables>(createScore);
    const [learning, setLearning] = useState<'idle' | 'learning'>('idle');

    const timerTag = useMemo(() => learning !== 'learning' ? '--' : <Timer />, [p.id, learning]);
    
    const score = scoreData?.scores && scoreData?.scores[0];

    const startLearning = useCallback(() => {
        setLearning('learning');
        message.info("开始学习，请操作VR课程")
    }, []);

    useEffect(()=>{
        if(data && data.course?.available){
            setLearning('learning');
        }
    }, [data])

    const submitScore = useCallback((newScore: {point:number, detail:string}) => {
        if (!meData?.me?.id) {
            return;
        }
        if (score) {
            const scoreid = score.id;
            opUpdateScore({
                variables: {
                    point: newScore.point, 
                    detail: newScore.detail,
                    id: scoreid
                }
            });
        } else {
            const meid = meData.me.id;
            opCreateScore({
                variables: {
                    point: newScore.point, 
                    detail: newScore.detail, 
                    course: p.id,
                    student: meid
                }
            });
        }
    }, [score, p.id, meData?.me?.id]);

    const finishLearning = useCallback(() => {
        refetchScore();
        setLearning('idle');
    }, []);

    useEffect(() => {
        if (resUpdateScore.data || resCreateScore.data) {
            message.success('完成课程!成绩已经更新', 10);
            finishLearning();
        }

        if (resUpdateScore.error || resCreateScore.error) {
            message.error(resUpdateScore.error?.message || resCreateScore.error?.message);
        }
    }, [resUpdateScore.data, resCreateScore.data, resUpdateScore.error, resCreateScore.error]);

    useEffect(() => {
        if (learning !== 'learning') {
            return;
        }
        function h(event: any) {
            try{
                const rawData = JSON.parse(event.data);
                const payload = JSON.parse(rawData.payload);
                console.log("the payload", payload);
                const score = payload.score;
                const detail = payload.detail;
                submitScore({
                    point:Number(score),
                    detail: JSON.stringify(detail),
                });
            }
            catch(e){
                console.log(e);
                message.error('WEBGL出错');
            }
        }
        window.addEventListener("message", h, false);
        return () => window.removeEventListener("message", h);
    }, [submitScore, learning]);

    const contentDom = <Typography>
        <Toolbar addon={<h3>{data?.course?.name}</h3>}>
            <Button.Group>
                <Button onClick={startLearning} type="primary" disabled={learning !== 'idle' || !data?.course?.available} loading={learning === 'learning'}>进行学习</Button>
                <Popconfirm onConfirm={finishLearning} title="确定停止？" disabled={learning === 'idle'}>
                    <Button disabled={learning === 'idle'}>停止学习</Button>
                </Popconfirm>
            </Button.Group>
        </Toolbar>
        <Descriptions style={{ background: '#fff' }} bordered>
            <Descriptions.Item label="课程 ID">{data?.course?.id}</Descriptions.Item>
            <Descriptions.Item label="用户名">{meData?.me?.username}</Descriptions.Item>
            <Descriptions.Item label="课程描述">{data?.course?.description}</Descriptions.Item>
            <Descriptions.Item label="课程状态">{data?.course?.available ? <Tag color="green">进行中</Tag> : <Tag color="red">已停课</Tag>}</Descriptions.Item>
            <Descriptions.Item label="本次学习时间">{timerTag}</Descriptions.Item>
            {score && <Descriptions.Item label="最新成绩"><Progress percent={Number(score?.point)}/></Descriptions.Item>}
        </Descriptions>
        <Divider />
        <ReactMarkdown className="markdown">{data?.course?.content ? resolveUploadsURL(data?.course.content) : ''}</ReactMarkdown>
        <Divider />
        {/* <iframe src={data?.course?.vrlink || ''} width="800" height="600" style={{ margin: 'auto', display: 'block', pointerEvents: learning !== 'learning' ? 'none' : 'initial', opacity: learning !== 'learning' ? 0.8: 1, width: '80%' } as any}  /> */}
        <EnhancedIframe src={data?.course?.vrlink || ''}   ratio={20/40} disabled={learning!=='learning'}/>

    </Typography>;


    return <ContentLayout>
        <PageHeader onBack={history.goBack} className="site-page-header" title="返回" />
        {data?.course ? contentDom : <Empty />}
        <Prompt
            when={learning === 'learning' }
            message="正在学习，离开页面将丢失数据，确定？"
        />
    </ContentLayout>;
}

export default function DetailPage(p: any) {
    const id = p.match?.params?.id;
    return <ApolloProvider client={client}>
        <Detail id={id} />
    </ApolloProvider>
}