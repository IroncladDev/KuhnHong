/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import styles from '../styles/pages/Home.module.css'
import cont from '../styles/cont.module.css';
import pos from '../styles/pos.module.css';
import text from '../styles/text.module.css';
import cs from '../scripts/multiclass'
import Path from '../components/curvePath'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home | Kuhn Hong</title>
      </Head>

      <div>

        <section className={cs(cont.relcont, pos.stackGrid)} style={{background: 'rgba(255, 225, 75, 0.25)'}}>
          <Path path="M 0 0 L 75 0 Q 125 225 250 275 Q 400 375 425 425 Q 475 550 525 600 L 425 600 Q 425 550 400 450 Q 375 375 225 300 Q 100 250 0 0 " fill="rgba(225, 200, 50, 0.25)" classes={cs(pos.stackLayer, styles.stretchSVG)} />
          <Path path="M 800 0 L 700 0 Q 550 100 475 250 Q 400 350 150 375 Q 50 400 0 600 L 75 600 Q 100 425 175 425 Q 375 400 525 250 Q 600 150 800 50 L 800 0 " fill="var(--y-med)" classes={cs(pos.stackLayer, styles.stretchSVG)} style={{ opacity: 0.75 }} />
          <Path path="M 250 0 Q 300 125 400 175 Q 600 275 675 400 Q 725 450 700 600 L 800 600 Q 775 450 700 350 Q 600 225 450 150 Q 350 100 350 0 L 250 0 " fill="rgba(175, 50, 0, 0.75)" classes={cs(pos.stackLayer, styles.stretchSVG)} />
          <Path path="M 0 175 Q 100 325 100 400 Q 100 525 250 600 L 150 600 Q 75 550 75 450 Q 75 325 0 275 L 0 175" classes={cs(pos.stackLayer, styles.stretchSVG)} fill="rgba(50, 175, 100, 0.75)" />
          <Path path="M 0 475 L 0 600 L 800 600 Q 225 575 0 475" fill="var(--w-5)" classes={cs(pos.stackLayer, styles.stretchSVG, styles.slantSec)} />
          <div className={cs(pos.stackLayer, styles.contFlex)}>
            <div className={styles.blockDesc}>
              <h1 className={cs(text.header, text.h1, text.textLeft, styles.titleHeader)} style={{ paddingTop: 0 }}>One Man, One Brush, Boundless Possibilities</h1>
            </div>
            <div className={styles.blockPortrait}>
              <img src="/portrait.webp" alt="Portrait of Mr. Kuhn Hong" className={cs(pos.centerx, styles.portrait)} />
            </div>
          </div>
        </section>
        <section className={cont.relcont}></section>

      </div>
    </div>
  )
}
