import ui from '../styles/ui.module.css'
import styles from '../styles/pages/Gallery.module.css'
import text from '../styles/text.module.css';
import Nav from '../components/nav';
import Footer from '../components/footer'
import { useState } from 'react';

export default function Gallery(props) {
  const [cat, setCat] = useState(props.categories[0]);
  const [image, setImage] = useState(false);

  return (<div>
    <h1 className={text.header} style={{ fontSize: '4em', paddingTop: '100px' }}>Gallery</h1>

    <div className={styles.flexOptions}>
      {cat !== "all" && <button onClick={() => setCat("all")} className={ui.submit}>Back</button>}
      <select className={ui.submit} value={cat} onChange={e => setCat(e.target.value)} style={{minWidth: 200}}>
        {props.categories.map(x => <option key={Math.random()} value={x}>{x}</option>)}
      </select>
    </div>
    <div className={styles.imageGrid}>
      {cat === "all" && [...new Set(props.paintings.map(x => x.topic))].map(x =>
        <div dataHov={props.paintings.filter(u => u.topic === x)[0].topic} key={Math.random()}
          onClick={() => setCat(props.paintings.filter(u => u.topic === x)[0].topic)}>
          <img
            src={props.paintings.filter(u => u.topic === x)[0].image} alt={props.paintings.filter(u => u.topic === x)[0].description}
          />
        </div>
      )}
      {cat !== "all" && props.paintings.filter(x => x.topic === cat).map(x =>
        <div dataHov={x.title} onClick={() => setImage(x._id)} key={Math.random()}>
          <img
            src={x.image}
            alt={x.description}
          />
        </div>
      )}
    </div>

    <Footer/>

    <Nav/>

    {image && <div className={styles.imagePopup}>
      <div className={styles.imagePopupBody}>
        <img src={props.paintings.filter(x => x._id === image)[0].image} alt={props.paintings.filter(x => x._id === image)[0].description} />
        <h2 className={text.title}>{props.paintings.filter(x => x._id === image)[0].title}</h2>
        <p>{props.paintings.filter(x => x._id === image)[0].description}</p>
        <button className={ui.submit} style={{ display: 'inline-block', maxWidth: 100, marginTop: 20 }} onClick={() => setImage(false)}>Close</button>
      </div>
    </div>}
  </div>)
}

import { Pic } from '../scripts/mongo';
export async function getServerSideProps({ req, res }) {
  let pics = await Pic.find();
  return {
    props: {
      paintings: JSON.parse(JSON.stringify(pics)),
      categories: ["all", ...new Set(pics.map(x => x.topic))]
    }
  }
}