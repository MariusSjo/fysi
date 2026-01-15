import client from '../../client';
import imageUrlBuilder from '@sanity/image-url';
import Head from 'next/head';
import { Card, Typography, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
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
      
      <Space
        size="large"
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '24px' }}>
        {episodes &&
          filtered.map((episode: any) => {
            return (
              <div key={episode.slug}>
                <Link href={episode.slug}>
                  <Card
                    hoverable
                    style={{ width: 360, minHeight: '480px' }}
                    cover={
                      <img 
                        alt={episode.title} 
                        src={urlFor(episode.image).width(360).height(240).fit('fill').url()}
                        style={{ height: '240px', objectFit: 'cover' }}
                      />
                    }>
                    <Meta
                      title={<span style={{ fontSize: 18, fontWeight: 500 }}>{checkTitle(episode.title)}</span>}
                      description={
                        <Paragraph ellipsis={{ rows: 2 }} style={{ marginTop: 8, color: '#4A5568' }}>
                          {episode.description || 'Klikk for å lytte til episoden'}
                        </Paragraph>
                      }
                    />
                  </Card>
                </Link>
              </div>
            );
          })}
      </Space>
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
      "image": PosterImage
    }[0...100]
  `);
  return {
    props: {
      episodes,
    },
  };
}

export default EpisodeList