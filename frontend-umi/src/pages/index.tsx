import styles from './index.less';
import { ApolloProvider, useQuery } from "@apollo/client";
import { client } from '@/utils/graphql';
import { getHomePage, ME } from '@/utils/schema';
import { Spin, Divider } from 'antd';
import { ContentLayout }  from '@/components/contentlayout';
import ReactMarkdown from 'react-markdown'
import { GetHomePageQuery, Homepage } from '@/generated/graphql';
import { resolveUploadsURL } from '@/utils/resolveurl';


const Index: React.FC = () => {
  const { loading, data } = useQuery(ME);
  const { loading: homepageLoading, data: homepageData} = useQuery<GetHomePageQuery>(getHomePage);
  console.log(homepageData)
  const isLoading = homepageLoading || loading;
  return <ContentLayout>
    <h1>{homepageData?.homepage?.hero?.title}</h1>
    <div>欢迎你! {data && `${data.me.email}`}</div>
    <Divider />
    {isLoading  && <Spin spinning={isLoading} />}
    <ReactMarkdown>{homepageData?.homepage?.hero?.content?resolveUploadsURL(homepageData?.homepage?.hero?.content):''}</ReactMarkdown>
  </ContentLayout>;
}

export default function IndexPage() {
  return (<ApolloProvider client={client}>
    <Index />
  </ApolloProvider>);
}
