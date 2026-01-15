import React from 'react';
import { Card, Carousel, Space, Typography } from 'antd';
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
        <Title level={2} style={{ textAlign: 'left', marginBottom: '32px' }}> De nyeste episodene </Title>
        <Space
          size="large"
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
          {episodes &&
            episodes.map((episode: any) => {
              return (
                <div key={episode.slug}>
                  <Link href={episode.slug} key={episode.slug}>
                    <Card
                      hoverable
                      style={{ width: 300, minHeight: 420 }}
                      cover={
                        <img 
                          alt={episode.title} 
                          src={urlFor(episode.image).width(300).height(200).fit('fill').url()} 
                          className="episode-card-image"
                        />
                      }>
                      <Meta
                        description={checkTitle(episode.title)}
                      />
                    </Card>
                  </Link>
                </div>
              );
            })}
        </Space>
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
