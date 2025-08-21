/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import cont from '../styles/cont.module.css';
import text from '../styles/text.module.css';
import cs from '../scripts/multiclass'
import Path from '../components/curvePath'
import Nav from '../components/nav';
import Fade from '../components/fade';
import Footer from '../components/footer'
import ui from '../styles/ui.module.css'

export default function About() {
  return (<div>
    <Head>
      <title>Contact | Kuhn Hong</title>
    </Head>

    <section className={cont.relcont} style={{ paddingTop: 70 }}>
      <h1 className={text.header + " " + text.h1}>Contact Me</h1>
      <p>If you are interested in purchasing one of the paintings, please contact me.</p>
      <p>
        <h3>Phone: 630-854-9246</h3>
        <h3>Email: Kuhn_hong@yahoo.com</h3>
        <h3>Address: 505 N. Lake Shore Dr. #1004
          Chicago, IL, 60611</h3>
      </p>
    </section>

    <Footer />

    <Nav />
  </div>)
}
