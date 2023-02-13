import client from '../client'
import imageUrlBuilder from '@sanity/image-url'
import Head from 'next/head'
import { Card, Typography } from 'antd';
import { Space} from 'antd';
const { Title, Paragraph } = Typography;
import React from 'react';
import Link from 'next/link';
const { Meta } = Card


export default function EpisodeList({ episodes }: any) {

    function urlFor(source: string): any {
        return imageUrlBuilder(client).image(source)
    }

    function checkTitle(title: string):string{
        if (title.length < 70){
            return title
        }
        return title.substring(0,67)+'...'
    }

    return (
        <Space className='content' direction="vertical" size="middle" style={{ display: 'flex'}}>
            <Head>
                <title>Arkiv</title>
            </Head>
            
            <Title style={{paddingTop: 20}}>Episoder</Title>
            <Space size="middle" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                
                {episodes && episodes.map((episode: any) => {
                    return (<div>
                        <Link href={episode.slug} key={episode.slug}>
                        <Card
                            hoverable
                            style={{ width: 300, minHeight: '400px' }}
                            cover={<img alt={episode.title} src={urlFor(episode.image).url()} />}
                        >
                            <Meta style={{color: "#fffff2", fontSize:"16"}} description={checkTitle(episode.title)} />
                        </Card>
                        </Link>
                    </div>
                    )
                })}
            </Space>
        </Space>
    )
}






export async function getStaticProps(context: { params: { page?: 0 | undefined; }; }) {
    const episodes = await client.fetch(`
  *[_type == "episode"]{
    "title":Title, 
    "description": Description, 
    "slug": slug.current,
    "guest": guest[] -> {image},
    "image": PosterImage
  }[0...60]
  `
        ,)
    return {
        props: {
            episodes
        }
    }
}
