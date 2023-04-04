import client from "@/client";
import { Card, Form, Space, Typography } from "antd";
import { Button, Input} from 'antd';
import Head from "next/head";

const { Meta } = Card;
const { Paragraph, Title } = Typography;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} er ikke en gyldig e-postadresse!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const onFinish = (values: any) => {
  console.log(values);
  let subject= '['+values.user.email+']'+' '+values.user.subject
  sendEmail(subject, values.user.message)
};

const sendEmail = (subject: string, message:string) => { 
let data = {
    subject,
    message
  }
fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}).then((res) => {
  console.log('Response received')
  if (res.status === 200) {
    console.log('Response succeeded!')
  }
})
}




export default function kontakt() {
  return (
    <Space className="content" direction="vertical" size="middle" style={{ display: 'flex', textAlign: "center", maxWidth: 800 }}>
      <Head>
        <title>Om oss</title>
      </Head>
      <Title style={{ paddingTop: 20 }}>Episoder</Title>
      <Paragraph>
        Har du tanker om hvordan vi kan forbedre oss?<br /><br />
        Vil du bli en del av fagformidlingen vi utøver?<br /><br />
        Ønsker du å sponse Fysi podkast mot at vi annonserer på våre nettsider og podcasts?<br /><br />

        Send oss en <a href="mailto:post@fysi.no">e-post</a> da vel! Om lenken ikke funker kan du sende en mail til <br/> post@fysi.no
      </Paragraph>
      
      {/* <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}
      >
        <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'email']} label="Epost" rules={[{ type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'subject']} label="Emne">
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'message']} label="melding" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 20 }}>
          <Button type="primary" htmlType="submit">
            Send e-post
          </Button>
        </Form.Item>
      </Form> */}
    </Space>
  );
}