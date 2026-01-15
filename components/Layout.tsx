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
                        <div className="content">
                            <Row gutter={[32, 32]} align="middle" style={{ paddingTop: 20, paddingBottom: 20 }}>
                                <Col xs={24} md={8} style={{ textAlign: 'center' }}>
                                    <Title level={4} style={{ color: '#E2E8F0', marginBottom: 8 }}>Fysi Podcast</Title>
                                    <Paragraph style={{ color: '#CBD5E0' }}>Kunnskap for helsepersonell</Paragraph>
                                </Col>
                                <Col xs={24} md={8} style={{ textAlign: 'center' }}>
                                    <Paragraph style={{ color: '#CBD5E0', margin: 0 }}>© 2019-{new Date().getFullYear()} Fysi</Paragraph>
                                </Col>
                                <Col xs={24} md={8} style={{ textAlign: 'center' }}>
                                    <Paragraph style={{ color: '#E2E8F0', marginBottom: 12 }}>Følg oss</Paragraph>
                                    <Space size="middle">
                                        <Link href="https://www.facebook.com/fysi0" target="_blank" className="footer-link">
                                            <FacebookOutlined style={{ fontSize: 24 }} />
                                        </Link>
                                        <Link href="https://www.instagram.com/fysi.no/" target="_blank" className="footer-link">
                                            <InstagramOutlined style={{ fontSize: 24 }} />
                                        </Link>
                                    </Space>
                                </Col>
                            </Row>
                        </div>
                    </Footer>
                </Lay>
                <CookieConsent />
            </ConfigProvider>
        </>
    )
}

