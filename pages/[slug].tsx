import client from 'client'
import imageUrlBuilder from '@sanity/image-url'
import { Avatar, Typography } from 'antd';
import Head from 'next/head'
import { Card, Space } from 'antd';
const { Title, Link, Paragraph } = Typography;


const Episode = ({ episode }: any) => {
  function urlFor(source: string) {
    return imageUrlBuilder(client).image(source)
  }
  return (
    <article className='content'>
      <Head>
        <title>{episode?.title}</title>
      </Head>
      <div className='responsive'>
        <div>
          <Title>{episode?.title}</Title>
          <Paragraph>{episode?.description}</Paragraph>
          {episode?.sources && <Title level={5}> Kilder: </Title>}
          {episode?.sources && episode?.sources.map((s: any, i: number) => {
            if (s != null) {
              return (
                <Link key={s?.Title} href={s?.Citation} target="_blank">
                  {i + 1}. {s?.Title} <br /><br />
                </Link>)
            }
            else {
              return (<div />)
            }
          }
          )}
        </div>
        <Space direction="vertical" size={16}>
          <Card title="Deltagere" style={{ width: 300 }}>
            <Title level={5}>Gjest:</Title>{episode?.guest.map((guest: any) => {
              return <div key={guest?.Name} >
                <Avatar.Group
                  maxCount={3}
                  maxPopoverTrigger="click"
                  size="large"
                  maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
                >
                  {guest && <Avatar size={80} src={urlFor(guest?.image).width(120).height(120).fit('crop').url()} />}
                </Avatar.Group>
                <br /><Paragraph>{guest?.Name}</Paragraph>
              </div>
            })}
            <Title level={5}>Vert:</Title>{episode?.host.map((host: any) => {
              return (
                <div key={host?.Name} >
                  <Avatar.Group
                    maxCount={3}
                    maxPopoverTrigger="click"
                    size="large"
                    maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
                  >
                    {<Avatar size={80} src={urlFor(host?.HostImage).width(120).height(120).fit('crop').url()}
                      .url()} />}
                  </Avatar.Group>
                  <br /><Paragraph>{host?.Name}</Paragraph>
                </div>)
            })}
          </Card>
        </Space>
      </div>

      <Title level={4}> Hør episoden her:</Title>
      {episode?.EmbedCode && <div className="text-container" dangerouslySetInnerHTML={{ __html: episode.EmbedCode }} />}
    </article>
  )
}

/* export async function getServerSideProps(context: { params: { slug?: "" | undefined; }; }) {
  const { slug = "" } = context.params
  const episode = await client.fetch(`
  *[_type == "episode" && slug.current == $slug][0]
  {
    "title":Title, 
    "description": Description, 
    "host": Host[]->,
    "guest": guest[] ->,
    EmbedCode,
  }`
    , { slug })
  return {
    props: {
      episode
    }
  }
} */


// For Static rendering! Needs to be rebuilt for each podcast!
export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "episode" && defined(slug.current)][].slug.current`
  )
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  }
}

export async function getStaticProps(context: { params: { slug?: "" | undefined; }; }) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params
  const episode = await client.fetch(`
  *[_type == "episode" && slug.current == $slug][0]
  {
    "title":Title, 
    "description": Description, 
    "host": Host[]->,
    "guest": guest[] ->,
    "sources": Sources[] -> {Citation, Title},
    EmbedCode,
  }`
    , { slug })
  return {
    props: {
      episode
    }
  }
}

export default Episode