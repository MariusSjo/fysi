import client from '../../client';
import imageUrlBuilder from '@sanity/image-url';
import Head from 'next/head';
import { Card, Typography, Input } from 'antd';
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
    if (title.length < 70) {
      return title;
    }
    return title.substring(0, 67) + '...';
  }

  function filterEpisodes(e: React.ChangeEvent<HTMLInputElement>) {
    setFiltered(episodes.filter((episode: any) => episode.title.toLowerCase().includes(e.target.value.toLowerCase())));
  }

  return (
    <Space className="content" direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Head>
        <title>Arkiv</title>
      </Head>
      <Title style={{ paddingTop: 20 }}>Episoder</Title>
      <Search placeholder="Søk på en podcastepisode 🔈" id='search-button' style={{ paddingLeft: 20, paddingRight: 20 }} onChange={(e)=> filterEpisodes(e)} enterButton="Search" size="large" />
      <Space
        size="middle"
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        {episodes &&
          filtered.map((episode: any) => {
            return (
              <div key={episode.slug}>
                <Link href={episode.slug}>
                  <Card
                    hoverable
                    style={{ width: 300, minHeight: '400px' }}
                    cover={<img alt={episode.title} src={urlFor(episode.image).url()} />}>
                    <Meta
                      style={{ color: '#fffff2', fontSize: '16' }}
                      description={checkTitle(episode.title)}
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