import Head from 'next/head'
import Nav from '../components/nav.js'
import Footer from '../components/footer'
import cont from '../styles/cont.module.css'
import text from '../styles/text.module.css'

export default function Blog(){
  return (<div>
    <section className={cont.relcont} style={{paddingTop: 70}}>
      <h1 className={text.header + " " + text.h1}>Blog</h1>
    </section>
    <Footer/>

    <Nav/>
  </div>)
}