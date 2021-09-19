import {Layout, Row, Col } from 'antd';
export default function Footer(){
    return <Layout.Footer style={{marginTop: 50}}>
        <Row>
        <Col span={6}>VR LAB</Col>
        <Col span={6}>CopyRight {new Date().getFullYear()}</Col>
        <Col span={6}>Tel: xxx-xx</Col>
        <Col span={6}>Email: xx@xx.xom</Col>
        </Row>
    </Layout.Footer>;
}