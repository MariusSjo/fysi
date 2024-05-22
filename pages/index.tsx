import React, { useState, useEffect } from 'react';
import { Card, Carousel, Image, Space, Typography, Input } from 'antd';
import client from '@/client';
import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';
import Head from 'next/head';
import OpenAI from 'openai';

const { Search } = Input;
const { Title, Paragraph } = Typography;
const { Meta } = Card;

const contentStyle: React.CSSProperties = {
  height: '85vh',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

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
      <div style={{ position: 'relative' }}>
        <Head>
          <title>Fysi - Hjem</title>
        </Head>
        <div style={{ position: 'absolute', zIndex: 2, bottom: '5%', margin: 0, left: '5%' }}>
          <Title style={{ fontSize: '1.7em' }}>Fysi podcast</Title>
          <Paragraph className="desktop">
            Medical & health <br />
            Podcast og kunnskapsformidling for fysioterapeuter og helsepersonell.
          </Paragraph>
        </div>

        <Carousel autoplay effect="fade">
          <img src="/hero1.png"></img>
          <img src="/hero2.png"></img>
          <img src="/hero3.png"></img>
        </Carousel>
      </div>
      <div className="content">
        <Title style={{ textAlign: 'left', paddingTop: '3%' }}> De nyeste episodene: </Title>
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
        <Title style={{ textAlign: 'left', paddingTop: '3%' }}>
          {' '}
          Sjekk oss ut på sosiale medier:{' '}
        </Title>
        <Space
          size="large"
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
          <Link href="https://open.spotify.com/show/2XZ654XhzGt_F7HFSt3QQ-KlT_Sr3YkH2w">
            <Card
              size="small"
              hoverable
              cover={<img alt="social" style={{ width: '200px' }} src={'/spotify.png'} />}
            ></Card>
          </Link>
          <Link href="https://www.facebook.com/fysi0">
            <Card
              size="small"
              hoverable
              cover={<img alt="social" style={{ width: '200px' }} src={'/facebook.png'} />}
            ></Card>
          </Link>
          <Link href="https://www.instagram.com/fysi.no/">
            <Card
              size="small"
              hoverable
              cover={<img alt="social" style={{ width: '200px' }} src={'/instagram.png'} />}
            ></Card>
          </Link>
          <Link href="https://www.linkedin.com/company/fysi-no/">
            <Card
              size="small"
              hoverable
              cover={<img alt="social" style={{ width: '200px' }} src={'/linkedin.png'} />}
            ></Card>
          </Link>
        </Space>
      </div>
    </>
  );
}

export default Index;
