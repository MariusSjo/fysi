// components/layout.js
import Navbar from "./navbar"
import CookieConsent from "./CookieConsent"
import React from 'react';
import { Layout as Lay, ConfigProvider, Row, Col, Space, Divider } from 'antd';
import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import Head from 'next/head';
import { Typography } from 'antd';
const { Paragraph, Link } = Typography;

const { Header, Content, Footer } = Lay;


export default function Layout({ children }: any) {
    return (
        <>
            <ConfigProvider
                theme={{
                    "token": {
                        "colorPrimary": "#0066CC",
                        "colorInfo": "#0066CC",
                        "colorSuccess": "#00A86B",
                        "colorTextBase": "#2C3E50",
                        "colorBgBase": "#FFFFFF",
                        "colorBgLayout": "#F8FAFB",
                        "fontSize": 16,
                        "fontSizeHeading1": 32,
                        "fontSizeHeading2": 28,
                        "fontSizeHeading3": 24,
                        "borderRadius": 8,
                        "wireframe": false,
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                    }
                }}
            >
                <Head>
                    <link rel="shortcut icon" href="/favicon.png" />
                </Head>
                <Lay>
                    <Header style={{paddingInline:0}}>
                        <Navbar />
                    </Header>
                    <Content style={{ minHeight: '81vh' }}>
                                <main>{children}</main>
                    </Content>
                    <Footer className="footer">
                    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                        <hr/>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col  className="gutter-row" span={8}>
                    </Col>
                            <Col  className="gutter-row" span={8}>
                            <Paragraph>Fysi©2019</Paragraph>
                            </Col>
                            <Col  className="gutter-row" span={8}>
                                <Paragraph className="desktop">Sjekk oss ut på sosiale medier:</Paragraph>
                                <Space split={<Divider type="vertical" />}>
                            <Link><FacebookOutlined /> <div className="desktop">Facebook</div> </Link>
                            <Link href="https://www.instagram.com/fysi.no/" ><InstagramOutlined /> <div className="desktop">Instagram</div></Link>
                            </Space>
                            </Col>
                            </Row>
                    </Space>
                    </Footer>
                </Lay>
                <CookieConsent />
            </ConfigProvider>
        </>
    )
}

