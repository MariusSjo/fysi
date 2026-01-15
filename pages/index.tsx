import React from 'react';
import { Card, Carousel, Space, Typography, Row, Col } from 'antd';
import client from '@/client';
import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';
import Head from 'next/head';
const { Title, Paragraph } = Typography;
const { Meta } = Card;

const contentStyle: React.CSSProperties = {
  height: '85vh',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

export async function getStaticProps() {
  const episodes = await client.fetch(`
  *[_type == "episode"]
  | order(releaseDate desc) | order(_createdAt desc)
  {
    "title": Title,
    "description": Description,
    "slug": slug.current,
    "guest": guest[] -> {image},
    "image": PosterImage
  }[0...3]
  `);
  return {
    props: {
      episodes,
    },
  };
}

function urlFor(source: string): any {
  return imageUrlBuilder(client).image(source);
}

function checkTitle(title: string): string {
  if (title.length < 70) {
    return title;
  }
  return title.substring(0, 67) + '...';
}

function Index({ episodes }: any) {
  return (
    <>
      <div className="hero-section">
        <Head>
          <title>Fysi - Hjem</title>
          <meta name="description" content="Fysi podcast - Kunnskapsformidling for fysioterapeuter og helsepersonell" />
        </Head>
        <div className="hero-overlay">
          <Title level={1}>Fysi podcast</Title>
          <Paragraph>
            Kunnskapsformidling for fysioterapeuter og helsepersonell. 
            Få innsikt i de nyeste forskningsresultatene og beste praksis innen fysioterapi.
          </Paragraph>
        </div>

        <Carousel autoplay effect="fade" style={{ maxHeight: '500px', overflow: 'hidden' }}>
          <div><img src="/hero1.png" alt="Fysi podcast" style={{ width: '100%', height: '500px', objectFit: 'cover' }} /></div>
          <div><img src="/hero2.png" alt="Fysi podcast" style={{ width: '100%', height: '500px', objectFit: 'cover' }} /></div>
          <div><img src="/hero3.png" alt="Fysi podcast" style={{ width: '100%', height: '500px', objectFit: 'cover' }} /></div>
        </Carousel>
      </div>
      <div className="content">
        <Title level={2} style={{ textAlign: 'left', marginBottom: '32px', marginTop: '48px' }}> De nyeste episodene </Title>
        <Row gutter={[24, 24]}>
          {episodes &&
            episodes.map((episode: any) => {
              return (
                <Col xs={24} sm={12} md={8} key={episode.slug}>
                  <Link href={episode.slug}>
                    <Card
                      hoverable
                      style={{ height: '100%' }}
                      cover={
                        <img 
                          alt={episode.title} 
                          src={urlFor(episode.image).url()} 
                          style={{ 
                            width: '100%', 
                            height: 'auto',
                            display: 'block'
                          }}
                        />
                      }>
                      <Meta
                        title={
                          <div style={{ 
                            fontSize: 18, 
                            fontWeight: 600,
                            lineHeight: 1.5,
                            color: '#2C3E50',
                            marginBottom: 8
                          }}>
                            {episode.title}
                          </div>
                        }
                        description={
                          <Paragraph 
                            ellipsis={{ rows: 2 }} 
                            style={{ 
                              marginTop: 0, 
                              color: '#4A5568',
                              fontSize: 14,
                              lineHeight: 1.6
                            }}
                          >
                            {episode.description || 'Klikk for å lytte til episoden'}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </Link>
                </Col>
              );
            })}
        </Row>
        <Title level={2} style={{ textAlign: 'left', marginTop: '64px', marginBottom: '32px' }}>
          Følg oss på sosiale medier
        </Title>
        <Space
          size="large"
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
          <Link href="https://open.spotify.com/show/2XZ654XhzGKbtkwgSlPk2K?si=F7HFSt3QQ-KlT_Sr3YkH2w">
            <Card
              size="small"
              hoverable
              cover={<img alt="social" style={{ width: '200px' }} src={'/spotify.png'} />}></Card>
          </Link>
          <Link href="https://www.facebook.com/fysi0">
            <Card
              size="small"
              hoverable
              cover={<img alt="social" style={{ width: '200px' }} src={'/facebook.png'} />}></Card>
          </Link>
          <Link href="https://www.instagram.com/fysi.no/">
            <Card
              size="small"
              hoverable
              cover={<img alt="social" style={{ width: '200px' }} src={'/instagram.png'} />}></Card>
          </Link>
          <Link href="https://www.linkedin.com/company/fysi-no/">
            <Card
              size="small"
              hoverable
              cover={<img alt="social" style={{ width: '200px' }} src={'/linkedin.png'} />}></Card>
          </Link>
        </Space>
      </div>
    </>
  );
}

export default Index;
