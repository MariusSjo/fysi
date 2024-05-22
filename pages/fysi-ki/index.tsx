import Head from 'next/head';
import { Card, Typography, Input } from 'antd';
import { Space } from 'antd';
const { Title, Paragraph } = Typography;
import React, { useEffect, useState } from 'react';
import OpenAI from 'openai';
import KiForm from './kiForm'

function FysiKI() {
  return (
    <>
    <Space className="content" direction="vertical" size="middle" style={{ display: 'flex', textAlign: "center", maxWidth: 800 }}>
    <Title style={{ paddingLeft: 20, paddingTop: 20 , fontSize: '1.7em' }}>Ask FysiAI</Title>
      <KiForm></KiForm>
    </Space>
    </>
  );
}

export default FysiKI;