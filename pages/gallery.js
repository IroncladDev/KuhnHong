import Head from 'next/head'
import ui from '../styles/ui.module.css'
import styles from '../styles/pages/Gallery.module.css'
import text from '../styles/text.module.css';
import { useState } from 'react';

export default function Gallery(props) {
  const [cat, setCat] = useState(props.categories[0]);
  const [image, setImage] = useState(false);

  return (<div>
    <h1 className={text.header} style={{ fontSize: '4em' }}>Gallery</h1>
    <select className={ui.submit + " " + styles.selector} value={cat} onChange={e => setCat(e.target.value)}>
      {props.categories.map(x => <option key={Math.random()} value={x}>{x}</option>)}
    </select>
    <div className={styles.imageGrid}>
      {props.paintings.filter(x => x.topic === cat).map(x =>
        <img
          key={Math.random()}
          src={x.image}
          alt={x.description}
          onClick={() => setImage(x._id)}
        />
      )}
    </div>

    {image && <div onClick={() => setImage(false)} className={styles.imagePopup}>
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
      categories: [...new Set(pics.map(x => x.topic))]
    }
  }
}