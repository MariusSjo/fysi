import Layout from '@/components/Layout'
import '@/styles/globals.css'
import '@/styles/navbar.css'
import type { AppProps } from 'next/app'
import { GoogleAnalytics } from "nextjs-google-analytics";
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { clarity } from 'react-microsoft-clarity';
import * as ga from '../lib/ga'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    if (!window.location.host.includes('localhost')) {
      clarity.init(`${process.env.NEXT_PUBLIC_CLARITY}`);
    }
    const handleRouteChange = (url: any) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Layout>
    <GoogleAnalytics trackPageViews />
    <Component {...pageProps} />
  </Layout>

}
