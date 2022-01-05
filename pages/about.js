/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import cont from '../styles/cont.module.css';
import text from '../styles/text.module.css';
import Nav from '../components/nav';
import Fade from '../components/fade';
import Footer from '../components/footer'

export default function About() {
  return (<div>
    <Head>
      <title>About | Kuhn Hong</title>
    </Head>

    <section className={cont.relcont} style={{ paddingTop: 70, paddingBottom: 100 }}>
      <h1 className={text.header + " " + text.h1}>About</h1>
      <Fade><p>Born in South Korea, Dr. Kuhn Hong worked heartily at his academic studies since youth.  However, he found solace in his leisure time doodling on the back of papers.  In primary school, his doodles won many prizes from art contests.  In high school, he pursued art more seriously, but was stifled by his parents fearing an artist could not make a living after the war.  As a result, Kuhn went to medical school, but that did not stop his love to paint.  He joined a group of fellow medical students and nursing students and spent weekends painting together.  They even had a chance to have art exhibitions.</p></Fade>
      <Fade><p>After graduating from medical school, Dr. Hong came to Chicago, completed residency training, and started his practice. His brushes lay aside while he was busy working at the hospital and raising his family with his wife. It wasn&apos;t until his work on a short-term medical mission trip down the Amazon River in Peru, when he picked up his ink pen and reignited his creative fervor.  While treating hundreds of patients in tiny river villages, he started to draw the people he encountered and the surrounding scenery in a small sketchbook during breaks.  Copies of those ink drawings were shared with people who donated medicine, money, and prayed for his mission expeditions. His first solo exhibition was in Seoul, Korea after the gallery owner saw his ink drawings.  After many years of medical practice and mission trips, Dr. Hong retired and moved to Addis Ababa, Ethiopia to serve in a mission hospital as a volunteer radiologist for 5 years, from 2013 to 2018. During his time in Addis Ababa, he spent weekends and evening hours painting freely. He held exhibitions at Asni Gallery and at the mission hospital where he served.  He was invited to showcase his artwork at Viviene Gallerie in Paris, France as well. </p></Fade>
      <Fade><p>Currently, Dr. Hong resides in Chicago, IL.  He is an active member of Palette and Chisel, as well as, Plein Air Painters Chicago and Duneland Plein Air Painters. He enjoys attending many workshops and learning more about technique. Often you will find him in Michigan City, Indiana, in his studio space inside the former St. Mary&apos;s School. He continues to showcase his art with a recent exhibition at the Lubeznik Center of Arts.</p></Fade>
      <Fade><p>Dr. Hong is loved and supported by his wife, their 4 children, and 7 grandchildren. </p></Fade>
    </section>

    <Footer />

    <Nav />
  </div>)
}