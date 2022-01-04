import '../styles/globals.css'
import Head from 'next/head'
import NextNprogress from 'nextjs-progressbar';
import {useEffect} from 'react'


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/icon.png"/>
      </Head>
      <NextNprogress  options={{showSpinner: false}} color="#0098FF"/>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
