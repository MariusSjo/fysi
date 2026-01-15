import { useState } from 'react';
import { Card, Space, Typography, Button, Form, Input, message } from "antd";
import { MailOutlined, LinkedinOutlined, InstagramOutlined, SendOutlined } from '@ant-design/icons';
import Head from "next/head";

const { Paragraph, Title } = Typography;
const { TextArea } = Input;

export default function Kontakt() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '49bceae2-c7c3-4c72-9e69-2db79dbafe47', // Web3Forms access key
          name: values.name,
          email: values.email,
          phone: values.phone || '',
          subject: values.subject,
          message: values.message,
          from_name: 'Fysi Kontaktskjema',
          to: 'post@fysi.no',
          botcheck: values.botcheck || '' // Honeypot field for spam protection
        })
      });

      const data = await response.json();

      if (data.success) {
        message.success('Takk! Din melding er sendt. Vi svarer så snart som mulig.');
        form.resetFields();
      } else {
        throw new Error(data.message || 'Noe gikk galt');
      }
    } catch (error) {
      message.error('Beklager, noe gikk galt. Prøv igjen eller send e-post direkte til post@fysi.no');
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

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
                Send oss en melding
              </Title>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
                Har du tanker om hvordan vi kan forbedre oss? Vil du bli en del av fagformidlingen vi utøver? 
                Ønsker du å sponse Fysi podkast? Fyll ut skjemaet under, så svarer vi så snart som mulig.
              </Paragraph>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark="optional"
                style={{ marginTop: 24 }}
              >
                <Form.Item
                  label="Navn"
                  name="name"
                  rules={[{ required: true, message: 'Vennligst skriv inn ditt navn' }]}
                >
                  <Input size="large" placeholder="Ola Nordmann" />
                </Form.Item>

                <Form.Item
                  label="E-post"
                  name="email"
                  rules={[
                    { required: true, message: 'Vennligst skriv inn din e-post' },
                    { type: 'email', message: 'Vennligst skriv inn en gyldig e-postadresse' }
                  ]}
                >
                  <Input size="large" placeholder="ola@example.com" />
                </Form.Item>

                <Form.Item
                  label="Telefon (valgfritt)"
                  name="phone"
                >
                  <Input size="large" placeholder="+47 123 45 678" />
                </Form.Item>

                <Form.Item
                  label="Emne"
                  name="subject"
                  rules={[{ required: true, message: 'Vennligst skriv inn et emne' }]}
                >
                  <Input size="large" placeholder="Hva gjelder det?" />
                </Form.Item>

                <Form.Item
                  label="Melding"
                  name="message"
                  rules={[{ required: true, message: 'Vennligst skriv en melding' }]}
                >
                  <TextArea 
                    rows={6} 
                    placeholder="Skriv din melding her..."
                    showCount
                    maxLength={2000}
                  />
                </Form.Item>

                {/* Honeypot field for spam protection - hidden from users */}
                <Form.Item name="botcheck" style={{ display: 'none' }}>
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button 
                    type="primary" 
                    size="large" 
                    htmlType="submit"
                    loading={loading}
                    icon={<SendOutlined />}
                    block
                  >
                    Send melding
                  </Button>
                </Form.Item>
              </Form>

              <Paragraph style={{ fontSize: 14, color: '#718096', marginTop: 16 }}>
                Alternativt kan du sende e-post direkte til:{' '}
                <a href="mailto:post@fysi.no" style={{ color: '#0066CC' }}>
                  post@fysi.no
                </a>
              </Paragraph>
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