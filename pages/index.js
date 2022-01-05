/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import styles from '../styles/pages/Home.module.css'
import cont from '../styles/cont.module.css';
import pos from '../styles/pos.module.css';
import text from '../styles/text.module.css';
import cs from '../scripts/multiclass'
import Path from '../components/curvePath'
import Nav from '../components/nav';
import Fade from '../components/fade';
import Link from 'next/link'
import ui from '../styles/ui.module.css'
import Footer from '../components/footer'
import Swal from 'sweetalert2'
import { Component } from 'react'
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    fetch("/api/paintings").then(r => r.json()).then(data => {
      this.setState({
        data: data
      })
      console.log(data)
    })
  }
  render() {
    return (
      <div>
        <Head>
          <title>Home | Kuhn Hong</title>
        </Head>

        <div>

          <section className={cs(cont.relcont, pos.stackGrid)} style={{ background: 'rgba(255, 225, 75, 0.25)' }}>
            <Path path="M 0 0 L 75 0 Q 125 225 250 275 Q 400 375 425 425 Q 475 550 525 600 L 425 600 Q 425 550 400 450 Q 375 375 225 300 Q 100 250 0 0 " fill="rgba(225, 200, 50, 0.25)" classes={cs(pos.stackLayer, styles.stretchSVG)} />
            <Path path="M 800 0 L 700 0 Q 550 100 475 250 Q 400 350 150 375 Q 50 400 0 600 L 75 600 Q 100 425 175 425 Q 375 400 525 250 Q 600 150 800 50 L 800 0 " fill="var(--y-med)" classes={cs(pos.stackLayer, styles.stretchSVG)} style={{ opacity: 0.75 }} />
            <Path path="M 250 0 Q 300 125 400 175 Q 600 275 675 400 Q 725 450 700 600 L 800 600 Q 775 450 700 350 Q 600 225 450 150 Q 350 100 350 0 L 250 0 " fill="rgba(175, 50, 0, 0.75)" classes={cs(pos.stackLayer, styles.stretchSVG)} />
            <Path path="M 0 175 Q 100 325 100 400 Q 100 525 250 600 L 150 600 Q 75 550 75 450 Q 75 325 0 275 L 0 175" classes={cs(pos.stackLayer, styles.stretchSVG)} fill="rgba(50, 175, 100, 0.75)" />
            <Path path="M 0 475 L 0 600 L 800 600 Q 225 575 0 475" fill="var(--w-5)" classes={cs(pos.stackLayer, styles.stretchSVG, styles.slantSec)} />
            <div className={cs(pos.stackLayer, styles.contFlex)}>
              <div className={styles.blockDesc}>
                <h1 className={cs(text.header, text.h1, text.textLeft, styles.titleHeader)} style={{ paddingTop: 0 }}>One Man,<br />One Brush,<br />Boundless Possibilities</h1>
              </div>
              <div className={styles.blockPortrait}>
                <img src="/portrait.webp" alt="Portrait of Mr. Kuhn Hong" className={cs(pos.centerx, styles.portrait)} />
              </div>
            </div>
          </section>
          <section className={cont.relcont} style={{ padding: '50px 0' }}>
            <Fade>
              <p>&ldquo;I like to be alone. I love painting after a long work day on a fresh new canvas to calm me down.</p>
            </Fade>
            <Fade>
              <p>I work on oil paintings primarily, but tried a few watercolors and pastel. In these works, I limited the canvas size knowing transportation from Africa to the States could be an issue.</p>
            </Fade>
            <Fade>
              <p>Painting people in exotic places and people in different clothes had me reminiscent over my childhood.  Without live models, I use quick sketches or photos taken by my small pocket camera. I want to tell a deeper story through my paintings than what the original image might have captured.  Ethiopia is a beautiful country with deep culture, traditions, and wonderful friendly people. I hope you feel the joy I had while I was there too. &rdquo;</p>
            </Fade>

            <hr />

            <Fade>
              <p>&ldquo;작가의 변</p>
            </Fade>
            <Fade>
              <p>바쁜 하루의 일을 마치고 캔버스앞에서 그림을 그린다는 것은 멋진 취미입니다. 오지에서 만나는 사람들을 통해 어린 시절의 기억을 회상할 수 있고, 친절하고 소박한 인물들과 아름다운 풍경, 또 깊은 역사와 전통을 가진 에티오피아에서의 작품들 속에 담긴 이야기들을 보여드리고 싶습니다&rdquo;</p>
            </Fade>
          </section>
          <section className={cont.relcont} style={{ background: 'black' }}>
            {this.state.data.slice(0, 3).map((x, i) => <div key={i} style={{ backgroundImage: 'url(' + x.image + ')' }} className={styles.parallax}>
              <div className={styles.parCont}>
                <h1>{x.title}</h1>
              </div>
            </div>)}


            <div>
              <Link href="/gallery" passHref>
                <h1 className={styles.galleryLink} style={{ fontSize: '3em', textDecoration: 'underline' }}>See my Gallery</h1>
              </Link>

              <div className={styles.slantEnd}></div>
            </div>
          </section>

          <section style={{ paddingBottom: 50 }}>
            <h1 className={cs(text.header, text.h1)} style={{ marginBottom: 50 }}>Art from a new Perspective</h1>
            <p>Want to stay updated with the latest news and new paintings?  Be sure to subscribe!</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              fetch("/api/subscribe", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  accept: "*/*"
                },
                body: JSON.stringify({
                  email: e.target.email.value
                })
              }).then(r => r.json()).then(data => {
                if (data.success) {
                  Swal.fire({
                    title: "Success!",
                    text: "Thank you for subscribing!",
                    icon: "success",
                  })
                } else {
                  Swal.fire({
                    title: "Failed",
                    text: data.message,
                    icon: "error",
                  })
                }
              })
            }}>
              <input className={ui.input} placeholder="you@email.com" name="email" type="email" />
              <button className={ui.button} type="submit">Submit</button>
            </form>
          </section>

          <Footer />

          <Nav />
        </div>
      </div>
    )
  }
}
