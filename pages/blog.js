/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Nav from '../components/nav.js'
import Footer from '../components/footer'
import cont from '../styles/cont.module.css'
import text from '../styles/text.module.css'
import styles from '../styles/pages/blog.module.css'
import Swal from 'sweetalert2'
import { Component } from 'react'

function Post(props) {
  function popup() {
    Swal.fire({
      html: `<div class='${styles.htmlCont}'>
      <div style="background-image:url(${props.cover})" class="${styles.largeImage}"></div>
      <h1>${props.title}</h1>
      <p style="width: 90%;">${props.desc}</p>
      <hr/>
      <span style="text-align:left !important;color: var(--w-1);font-weight: 300;">&copy; Kuhn Hong 2022</span>
      </div>`,
      width: `100%`,
      showConfirmButton: false,
      showCloseButton: true,
      focusConfirm: true
    })
  }

  return (<div className={styles.post} onClick={popup}>
    <img src={props.cover} className={styles.cover} alt={props.title} />
    <div className={styles.dateMarker}>{props.date}, {props.year}</div>
    <h2 className={styles.title}>{props.title}</h2>
    <p className={styles.desc}>{props.desc.replace(/\<br\>/g, " ")}</p>
  </div>)
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    fetch("/api/blog").then(r => r.json()).then(dt => {
      this.setState({
        data: dt
      })
    })
  }
  render() {
    return (<div>
      <Head>
        <title>Blog</title>
      </Head>
      <section className={cont.relcont} style={{ paddingTop: 70 }}>
        <h1 className={text.header + " " + text.h1}>Blog</h1>

        <div className={styles.grid}>
          {this.state.data.map((x, i) => <Post key={i} title={x.title} cover={x.cover} desc={x.body} date={months[Number(x.createdAt.split`-`[1])] + " " + Number(x.createdAt.split(/\-|T/)[2])} year={x.createdAt.split`-`[0]} />)}
        </div>


      </section>
      <Footer />

      <Nav />
    </div>)
  }
}