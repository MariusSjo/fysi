import { Card, Space, Typography, Button } from "antd";
import { MailOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons';
import Head from "next/head";

const { Paragraph, Title } = Typography;

export default function Kontakt() {
  return (
    <div className="content">
      <Head>
        <title>Fysi - Kontakt oss</title>
        <meta name="description" content="Ta kontakt med Fysi podcast" />
      </Head>
      
      <Space direction="vertical" size="large" style={{ display: 'flex', maxWidth: 800, margin: '0 auto', paddingTop: 40 }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={1}>Kontakt oss</Title>
          <Paragraph style={{ fontSize: 18, color: '#4A5568' }}>
            Vi setter pris på tilbakemeldinger og vil gjerne høre fra deg!
          </Paragraph>
        </div>

        <Card 
          style={{ borderRadius: 12, marginTop: 32 }}
          bodyStyle={{ padding: 40 }}
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={3} style={{ marginBottom: 8 }}>
                <MailOutlined style={{ marginRight: 12, color: '#0066CC' }} />
                Send oss en e-post
              </Title>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
                Har du tanker om hvordan vi kan forbedre oss? Vil du bli en del av fagformidlingen vi utøver? 
                Ønsker du å sponse Fysi podkast? Send oss en e-post, så svarer vi så snart som mulig.
              </Paragraph>

              <Button 
                type="primary" 
                size="large" 
                icon={<MailOutlined />}
                href="mailto:post@fysi.no"
                block
                style={{ marginTop: 16 }}
              >
                Send e-post til post@fysi.no
              </Button>
            </div>

            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 32, marginTop: 16 }}>
              <Title level={4} style={{ marginBottom: 16 }}>Følg oss på sosiale medier</Title>
              <Space size="large">
                <Button 
                  type="default" 
                  size="large" 
                  icon={<InstagramOutlined />}
                  href="https://www.instagram.com/fysi.no/"
                  target="_blank"
                >
                  Instagram
                </Button>
                <Button 
                  type="default" 
                  size="large" 
                  icon={<LinkedinOutlined />}
                  href="https://www.linkedin.com/company/fysi-no/"
                  target="_blank"
                >
                  LinkedIn
                </Button>
              </Space>
            </div>
          </Space>
        </Card>
      </Space>
    </div>
  );
}
