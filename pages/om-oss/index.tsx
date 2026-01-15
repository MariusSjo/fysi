import client from "@/client";
import { Card, Space, Typography, Row, Col } from "antd";
import imageUrlBuilder from '@sanity/image-url';
import Head from "next/head";

const { Meta } = Card;
const { Paragraph, Title } = Typography;

export async function getStaticProps() {
  const physiotherapists = await client.fetch(`
  *[_type == "physiotherapist" && defined(HostImage) && Name != "Kristine Green Sandvik"]
  | order(_createdAt asc)
  {
      Name,
      HostImage,
      Description
  }`);
  return {
    props: {
      physiotherapists,
    },
  };
}

function urlFor(source: string): any {
  return imageUrlBuilder(client).image(source);
}

export default function OmOss({ physiotherapists }: any) {
  return (
    <div className="content" style={{ paddingTop: 40 }}>
      <Head>
        <title>Fysi - Om oss</title>
        <meta name="description" content="Møt Fysi kollektivet - engasjerte fysioterapeuter som deler evidensbasert kunnskap" />
      </Head>

      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={1}>Fysi Kollektivet</Title>
        </div>

        <Row gutter={[48, 48]} align="middle" style={{ marginBottom: 64 }}>
          <Col xs={24} md={12}>
            <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
              Fysi er et idealistisk initiativ som er startet av Fredrik Sjøberg. 
              Fysi driftes av engasjerte fysioterapeuter, turnusfysioer og fysiostudenter.
            </Paragraph>
            <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
              Vi er Fysi kollektivet.
            </Paragraph>
            <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
              Målet er å dele evidensbasert og klinisk anvendelig kunnskap for å forbedre 
              håndteringen av pasienter. Vår målgruppe er fysioterapeuter og andre helsearbeidere.
            </Paragraph>
            <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
              De jobber på sykehusene, i kommunene og som privatpraktiserende med og uten 
              driftstilskudd. De jobber med barn, traumer, pasienter med muskel- og skjelettplager, 
              nevro, lungesyke og friske som vil forebygge. De som hjelper oss fra vi er små 
              til vi blir bestemødre og bestefedre.
            </Paragraph>
          </Col>
          <Col xs={24} md={12}>
            <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <img src='/rygg.png' alt="Fysi" style={{ width: '100%', height: 'auto' }} />
            </div>
          </Col>
        </Row>

        <div style={{ marginTop: 48 }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>Møt teamet</Title>
          <Row gutter={[32, 32]} justify="center">
            {physiotherapists &&
              physiotherapists.map((physiotherapist: any) => {
                return (
                  <Col key={physiotherapist.Name} xs={24} sm={12} md={8} lg={6}>
                    <Card
                      hoverable
                      style={{ height: '100%' }}
                      cover={
                        <div style={{ 
                          height: '300px', 
                          overflow: 'hidden',
                          background: '#f0f0f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <img
                            alt={physiotherapist.Name}
                            src={urlFor(physiotherapist.HostImage).width(300).height(300).fit('fill').url()}
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'contain'
                            }}
                          />
                        </div>
                      }
                    >
                      <Meta
                        title={<Title level={4} style={{ marginBottom: 8 }}>{physiotherapist.Name}</Title>}
                        description={
                          <Paragraph style={{ color: '#4A5568', lineHeight: 1.6 }}>
                            {physiotherapist.Description}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </div>
      </Space>
    </div>
  );
}