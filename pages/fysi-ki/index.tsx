import Head from 'next/head';
import { Card, Typography, Input } from 'antd';
import { Space } from 'antd';
const { Title, Paragraph } = Typography;
import React, { useEffect, useState } from 'react';
import OpenAI from 'openai';
import KiForm from './KiForm'

function FysiKI() {
  return (
    <>
    <Space className="content" direction="vertical" size="middle" style={{ display: 'flex', textAlign: "center", maxWidth: 800 }}>
    <Title style={{ paddingLeft: 20, paddingTop: 20 , fontSize: '1.7em' }}>Spør FysiAI</Title>
    <Typography> Viktig informasjon: Diagnoser og treningsprogram er kun veiledende, men skal kun brukes i samråd med profesjonellt helsepersonell. KI-en er i Betafase og skal brukes i kombinasjon med sunn fornuft. </Typography>
      <KiForm></KiForm>
    </Space>
    </>
  );
}

export default FysiKI;