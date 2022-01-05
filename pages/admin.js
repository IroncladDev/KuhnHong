/* eslint-disable @next/next/no-img-element */
import Admin from '../components/admin'
import { Component } from 'react';
import ui from '../styles/ui.module.css'
import Swal from 'sweetalert2';
import Head from 'next/head'
export default class ADM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      data: [],
      loggedIn: false
    }
    this.getBase64 = this.getBase64.bind(this);
    this.submit = this.submit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  getBase64(e) {
    var self = this;
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = async function (upload) {
      let bs4 = upload.target.result;
      let data = await fetch("https://kuhnhong.devservers.repl.co/api/upload", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: bs4
        })
      }).then(r => r.json())

      if (data.success) {
        self.setState({
          image: data.image
        })
      } else {
        console.log("Error")
      }
    }
    reader.readAsDataURL(file);
  }
  componentDidMount() {
    const cookie = name => `; ${document.cookie}`.split(`; ${name}=`).pop().split(';').shift();
    if (cookie("admin_session")) {
      this.setState({ loggedIn: true })
    }
    let self = this;
    fetch("/api/paintings").then(r => r.json()).then(data => {
      self.setState({
        data
      })
    })
  }
  async submit(e) {
    e.preventDefault();
    let data = await fetch("/api/authenticate", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        psw: e.target.password.value
      })
    }).then(r => r.json())
    if (data.success) {
      Swal.fire({
        title: "Success!",
        text: "Success!  You are officially logged in.  You will be redirected shortly.",
        timer: 3000,
        icon: "success",
        showConfirmButton: false,
        timerProgressBar: true,
        willClose: () => {
          location.reload();
        }
      })
    } else {
      Swal.fire({
        title: "Failed to Authenticate",
        text: data.message,
        icon: "error"
      })
    }
  }
  render() {
    return (<div>
      <Head>
        <title>Administration</title>
      </Head>
      {this.state.loggedIn && <Admin data={this.state.data} updateData={this.componentDidMount}/>}
      {!this.state.loggedIn && <div>
        <form method="POST" action="/api/authenticate" className={ui.form} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', minWidth: 300 }} onSubmit={this.submit}>
          <h2 className={ui.formHeader} style={{ marginBottom: 20 }}>Please Log In</h2>
          <input className={ui.inputSmall} type="password" name="password" placeholder="Administration Password" />
          <button className={ui.submit} style={{ marginTop: 20 }}>Submit</button>
        </form>
      </div>}

    </div>)
  }
}

