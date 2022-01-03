import styles from '../styles/components/fade.module.css'
import { Component, createRef } from 'react';
export default class Fade extends Component {
  constructor(props) {
    super(props);
    this.self = createRef();
    this.state = {
      visible: false
    }
    this.listenToScroll = this.listenToScroll.bind(this);
  }
  listenToScroll() {
    try {
      if (window.pageYOffset + window.innerHeight >= this.self.current.offsetTop) {
        this.setState({
          visible: false
        })
      } else {
        this.setState({
          visible: true
        })
      }
    } catch (e) { }
  }
  componentDidMount() {
    window.addEventListener("scroll", this.listenToScroll)
  }
  render() {
    return (
      <div ref={this.self} className={this.props.classes + " " + (this.state.visible ? styles.transparent : styles.visible)}>
        {this.props.children}
      </div>
    );
  }
}