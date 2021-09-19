import styles from './index.less';
import { ApolloProvider, useQuery } from "@apollo/client";
import { client } from '@/utils/graphql';
import { ME } from '@/utils/schema';
import { Spin } from 'antd';
import { history } from 'umi';
import { useEffect } from 'react';
const Index:React.FC = () =>{
  const {loading, data} = useQuery(ME);
    
  return  <div>
    <h1 className={styles.title}>Page index</h1>
    {loading&& <Spin spinning={loading}/>}
    {data&& `${data.me.email}`}
  </div>;
}

export default function IndexPage() {
  return (<ApolloProvider client={client}>
    <Index/>
  </ApolloProvider>);
}
