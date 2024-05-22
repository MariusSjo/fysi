import Layout from '@/components/Layout'
import '@/styles/globals.css'
import '@/styles/navbar.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { clarity } from 'react-microsoft-clarity';

export default function App({ Component, pageProps }: AppProps) {
  require('dotenv').config();
  const router = useRouter()
  useEffect(() => {
    if (!window.location.host.includes('localhost')) {
      clarity.init(`${process.env.NEXT_PUBLIC_CLARITY}`);
    }
  },)

  return <Layout>
    <Component {...pageProps} />
  </Layout>

}
