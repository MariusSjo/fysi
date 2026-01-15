import Layout from '@/components/Layout'
import '@/styles/globals.css'
import '@/styles/navbar.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { clarity } from 'react-microsoft-clarity';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  
  useEffect(() => {
    // Only initialize Clarity if user has accepted cookies
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'accepted' && !window.location.host.includes('localhost')) {
      clarity.init(`${process.env.NEXT_PUBLIC_CLARITY}`);
    }
  }, [])

  return <Layout>
    <Component {...pageProps} />
  </Layout>

}
