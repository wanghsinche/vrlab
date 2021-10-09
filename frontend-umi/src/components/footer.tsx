import { GetHomePageQuery } from '@/generated/graphql';
import { client } from '@/utils/graphql';
import { getHomePage } from '@/utils/schema';
import { ApolloProvider, useQuery } from '@apollo/client';
import {Layout, Row, Col } from 'antd';
const defaultCols = <Row>
    <Col md={6} sm={12} xs={24}>VR LAB</Col>
    <Col md={6} sm={12} xs={24}>CopyRight {new Date().getFullYear()}</Col>
</Row>;

const Page = ()=>{
    const { data: homepageData} = useQuery<GetHomePageQuery>(getHomePage);
    const content = homepageData?.homepage?.footer?.items instanceof Array && 
    homepageData?.homepage?.footer?.items.map((el:string, idx:number)=>{
        return <Col md={6} sm={12} xs={24} key={idx}>{''+el}</Col>
    });

    return <Layout.Footer style={{marginTop: 50}}>
        <Row>
            {content || defaultCols}
        </Row>
    </Layout.Footer>;
}
export default function Footer(){
    return <ApolloProvider client={client}>
        <Page />
    </ApolloProvider>;
}