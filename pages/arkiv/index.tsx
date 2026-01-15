import client from '../../client';
import imageUrlBuilder from '@sanity/image-url';
import Head from 'next/head';
import { Card, Typography, Input, Row, Col, Badge, Tag } from 'antd';
import { SearchOutlined, FireOutlined } from '@ant-design/icons';
import { Space } from 'antd';
const { Title, Paragraph } = Typography;
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
const { Meta } = Card;
const { Search } = Input;

function EpisodeList({ episodes }: any) {
  const [filtered, setFiltered] = useState(episodes);
  function urlFor(source: string): any {
    return imageUrlBuilder(client).image(source);
  }

  function checkTitle(title: string): string {
    if (title.length < 85) {
      return title;
    }
    return title.substring(0, 82) + '...';
  }

  function filterEpisodes(e: React.ChangeEvent<HTMLInputElement>) {
    setFiltered(episodes.filter((episode: any) => episode.title.toLowerCase().includes(e.target.value.toLowerCase())));
  }

  return (
    <Space className="content" direction="vertical" size="large" style={{ display: 'flex' }}>
      <Head>
        <title>Fysi - Arkiv</title>
        <meta name="description" content="Søk gjennom alle Fysi podcast episoder" />
      </Head>
      <div style={{ paddingTop: 32 }}>
        <Title level={1} style={{ marginBottom: 8 }}>Podcast Arkiv</Title>
        <Paragraph style={{ fontSize: 16, color: '#4A5568' }}>
          Bla gjennom alle våre episoder eller søk etter spesifikke tema
        </Paragraph>
      </div>
      
      <Input
        id='search-button'
        placeholder="Søk etter episoder, gjester eller tema..."
        prefix={<SearchOutlined style={{ color: '#0066CC', fontSize: 18 }} />}
        onChange={(e) => filterEpisodes(e)}
        size="large"
        style={{
          maxWidth: 600,
          borderRadius: 8,
          padding: '12px 20px',
          fontSize: 16
        }}
        allowClear
      />
      
      <Row gutter={[24, 32]} style={{ marginTop: 24 }}>
        {episodes &&
          filtered.map((episode: any, index: number) => {
            const isNew = index < 3; // Mark first 3 episodes as new
            return (
              <Col xs={24} sm={12} md={8} lg={6} key={episode.slug}>
                <Link href={episode.slug}>
                  <Badge.Ribbon 
                    text={isNew ? "NY" : null} 
                    color="#00A86B"
                    style={{ display: isNew ? 'block' : 'none' }}
                  >
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
                      }
                    >
                      <Meta
                        title={
                          <span style={{ 
                            fontSize: 18, 
                            fontWeight: 600,
                            lineHeight: 1.4,
                            color: '#2C3E50'
                          }}>
                            {episode.title}
                          </span>
                        }
                        description={
                          <Paragraph 
                            ellipsis={{ rows: 4 }} 
                            style={{ 
                              marginTop: 12, 
                              color: '#4A5568',
                              fontSize: 15,
                              lineHeight: 1.6
                            }}
                          >
                            {episode.description || 'Klikk for å lytte til episoden'}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </Badge.Ribbon>
                </Link>
              </Col>
            );
          })}
      </Row>
    </Space>
  );
}

export async function getStaticProps(context: { params: { page?: 0 | undefined } }) {
  const episodes = await client.fetch(`
    *[_type == "episode"]
    | order(releaseDate desc) | order(_createdAt desc)
    {
      "title":Title, 
      "description": Description, 
      "slug": slug.current,
      "guest": guest[] -> {image},
      "image": PosterImage,
      releaseDate,
      _createdAt
    }[0...100]
  `);
  return {
    props: {
      episodes,
    },
  };
}

export default EpisodeList