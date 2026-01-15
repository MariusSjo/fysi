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
    <article className='content' style={{ paddingTop: 40 }}>
      <Head>
        <title>{episode?.title || 'Fysi Episode'}</title>
        <meta name="description" content={episode?.description} />
      </Head>
      <div className='responsive'>
        <div style={{ flex: 1 }}>
          <Title level={1} style={{ marginBottom: 16 }}>{episode?.title}</Title>
          <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color: '#4A5568', marginBottom: 32 }}>
            {episode?.description}
          </Paragraph>
          
          {episode?.sources && episode.sources.length > 0 && (
            <div style={{ marginTop: 40, padding: 24, background: '#F8FAFB', borderRadius: 8 }}>
              <Title level={4} style={{ marginBottom: 16 }}>Kilder</Title>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                {episode.sources.map((s: any, i: number) => {
                  if (s != null) {
                    return (
                      <Link key={s?.Title} href={s?.Citation} target="_blank" style={{ fontSize: 14 }}>
                        {i + 1}. {s?.Title}
                      </Link>
                    );
                  }
                  return null;
                })}
              </Space>
            </div>
          )}
        </div>
        <div>
          <Card title="Deltagere" style={{ width: 320 }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {episode?.guest && episode.guest.length > 0 && (
                <div>
                  <Title level={5}>Gjest:</Title>
                  {episode.guest.map((guest: any) => (
                    <div key={guest?.Name} style={{ marginBottom: 16 }}>
                      <Avatar.Group
                        maxCount={3}
                        maxPopoverTrigger="click"
                        size="large"
                      >
                        {guest && <Avatar size={80} src={urlFor(guest?.image).width(120).height(120).fit('fill').url()} />}
                      </Avatar.Group>
                      <Paragraph style={{ marginTop: 8, fontWeight: 500 }}>{guest?.Name}</Paragraph>
                    </div>
                  ))}
                </div>
              )}
              {episode?.host && episode.host.length > 0 && (
                <div>
                  <Title level={5}>Vert:</Title>
                  {episode.host.map((host: any) => (
                    <div key={host?.Name} style={{ marginBottom: 16 }}>
                      <Avatar.Group
                        maxCount={3}
                        maxPopoverTrigger="click"
                        size="large"
                      >
                        {<Avatar size={80} src={urlFor(host?.HostImage).width(120).height(120).fit('fill').url()} />}
                      </Avatar.Group>
                      <Paragraph style={{ marginTop: 8, fontWeight: 500 }}>{host?.Name}</Paragraph>
                    </div>
                  ))}
                </div>
              )}
            </Space>
          </Card>
        </div>
      </div>

      <div style={{ marginTop: 48 }}>
        <Title level={3} style={{ marginBottom: 24 }}>Hør episoden her</Title>
        {episode?.EmbedCode && (
          <div 
            className="text-container" 
            dangerouslySetInnerHTML={{ __html: episode.EmbedCode }} 
            style={{ 
              background: '#F8FAFB', 
              padding: 24, 
              borderRadius: 8,
              overflow: 'hidden'
            }} 
          />
        )}
      </div>
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