import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/icon.png"/>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
