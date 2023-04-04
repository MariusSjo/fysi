import client from "@/client";
import { Card, Space, Typography } from "antd";
import imageUrlBuilder from '@sanity/image-url';
import Head from "next/head";
const {Meta} = Card;
const { Paragraph, Title } = Typography;


export async function getStaticProps() {
    const physiotherapists = await client.fetch(`
    *[_type == "physiotherapist"]
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

export default function omOss({physiotherapists}: any) {
    physiotherapists = physiotherapists.filter((physiotherapist: any)=> physiotherapist.Name !== "Kristine Green Sandvik" )
    physiotherapists = physiotherapists.filter((physiotherapist: any)=> physiotherapist.HostImage !== null )

    return (
        <Space className="content" direction="vertical" size="middle" style={{ display: 'flex', textAlign: "center", maxWidth: 800 }}>
            <Head>
                <title>Om oss</title>
            </Head>
            <Title style={{ paddingTop: 20 }}>Episoder</Title>
            <Paragraph>
                Fysi er et idealistisk iniativ som er startet av Fredrik Sjøberg. Fysi driftes av engasjerte fysioterapeuter, turnusfysioer og fysiostudenter. <br /><br />
                Vi er Fysi kollektivet.<br /><br />
                Målet er å dele evidensbasert og klinisk anvennelig kunnskap for å forbedre håndteringen av pasienter. Vår målgruppe er fysioterapeuter og andre helsearbeidere.<br /><br />
                De jobber på sykehusene, i kommunene og som privatpraktiserende med og uten driftstilskudd. De jobber med barn, traumer, pasienter med muskel- og skjelettplager, nevro, lungesyke og friske som vil forebygge. De som hjelper oss fra vi er små til vi blir bestemødre og bestefedre.<br /><br />
            </Paragraph>
            <Space
          size="large"
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
            {physiotherapists &&
            physiotherapists.map((physiotherapist: any) => {
                return(
                    <div key={physiotherapist.Name}>
                         <Card
                      hoverable
                      style={{ width: 300, minHeight: 420 }}
                      cover={<img alt={physiotherapist.Name} src={urlFor(physiotherapist.HostImage).url()} />}>
                      <Meta
                        style={{ color: '#fffff2', fontSize: '16' }}
                        description={physiotherapist.Name+':   '+ physiotherapist.Description}
                      />
                    </Card>
                    </div>
                )})}
            </Space>
        </Space>
    );
}