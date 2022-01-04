import Head from 'next/head'
import cont from '../styles/cont.module.css';
import Nav from '../components/nav';
import styles from '../styles/pages/Gallery.module.css'
import { Component, createRef } from 'react';
import Script from 'next/script'
const Types = ["Previous Exhibitions", "Landscapes", "Portraits", "Figures", "Still Life"]

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      category: 0,
      data: this.props.data
    }
    this.moveBy = this.moveBy.bind(this);
    this.sortCategories = this.sortCategories.bind(this);
  }
  moveBy(n) {
    let ind = this.state.index + n;
    if (ind >= this.state.data.length) {
      ind = 0;
    } else if (ind < 0) {
      ind = this.state.data.length - 1;
    }
    this.setState({
      index: ind
    })
  }
  sortCategories(e) {
    let cat = Number(e.target.value);
    let data = this.props.data.filter(x => x.topic === cat);
    this.setState({
      category: cat,
      data: data.length > 0 ? data : [{
        title: "Oh No!",
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=',
        description: "There are no " + Types[cat] + " paintings yet.",
        price: 0,
        topic: cat
      }]
    }, () => {
      console.log(this.state.data)
    })
  }
  componentDidMount() {
    this.sortCategories({ target: { value: 0 } });
  }
  render() {
    return (
      <div>
        <Head>
          <title>Gallery</title>
        </Head>

        <Script src="https://kit.fontawesome.com/5434134134.js"></Script>
        <section className={cont.relcont + " " + styles.gcont}>
          <div className={styles.core}>
            <div className={styles.sld}>
              <button onClick={() => this.moveBy(-1)} className={styles.slideBtn}>&lt;</button>
            </div>
            <div className={styles.centerCore} style={{ backgroundImage: `url(${this.state.data[this.state.index].image})` }}>

              <div className={styles.imageCover}>
                <div className={styles.centerCover}>
                  <h1 className={styles.imageTitle}>{this.state.data[this.state.index].title}</h1>
                  <p className={styles.imageDesc}>{this.state.data[this.state.index].description}</p>
                  <div className={styles.imageStats}>
                    <i className="fas fa-tag"></i>{' '}{Types[this.state.data[this.state.index].topic]}{' | $'}{this.state.data[this.state.index].price}
                  </div>
                </div>
              </div>

              <div className={styles.dots}>
                <select className={styles.sorter} onChange={this.sortCategories}>
                  {Types.map((t, ind) => <option key={ind} value={ind}>{t}</option>)}
                </select>
                <div style={{display: 'flex'}}>
                  {this.state.data.map((d, ind) => <div onClick={() => {
                    this.setState({
                      index: ind
                    })
                  }} className={`${styles.dot} ${ind === this.state.index && styles.dotSelected}`} key={ind}></div>)}
                </div>
              </div>
            </div>
            <div className={styles.sld}>
              <button onClick={() => this.moveBy(1)} className={styles.slideBtn}>&gt;</button>
            </div>
          </div>
        </section>

        <Nav />
      </div>
    );
  }
}

export async function getServerSideProps() {
  const DATA = [
    {
      title: "Test Painting",
      description: "Painting",
      topic: 0,
      price: 1000,
      image: 'https://images.unsplash.com/photo-1635976288844-713ba2879b9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
      title: "Test Painting Two",
      description: "Painting Number Two",
      topic: 1,
      price: 1000,
      image: 'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bGFuZHNjYXBlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
      title: "Test Painting Three",
      description: "Painting Number Three",
      topic: 0,
      price: 1500,
      image: 'https://images.unsplash.com/photo-1563791877359-4a03fb576945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGxhbmRzY2FwZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
    },
    {
      title: "Test Painting Four",
      description: "Painting Number Four",
      topic: 2,
      price: 2500,
      image: 'https://images.unsplash.com/photo-1609154767012-331529e7d73b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGxhbmRzY2FwZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
    },

  ];
  return {
    props: {
      data: DATA
    }
  }
}