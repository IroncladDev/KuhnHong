/* eslint-disable @next/next/no-img-element */
import { Component } from 'react';
import ui from '../styles/ui.module.css'
import cont from '../styles/cont.module.css'
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const Types = ["Previous Exhibitions", "Landscapes", "Portraits", "Figures", "Still Life"]

class CreatePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: ''
    }
    this.getBase64 = this.getBase64.bind(this);
    this.submit = this.submit.bind(this);
  }
  submit(e){
    e.preventDefault();
    const cookie = name => `; ${document.cookie}`.split(`; ${name}=`).pop().split(';').shift();
    fetch("/api/addpic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*"
      },
      body: JSON.stringify({
        title: e.target.title.value,
        image: this.state.image,
        description: e.target.description.value,
        topic: e.target.topic.value,
        price: e.target.price.value,
        sold: e.target.sold.value,
        auth: cookie("admin_session")
      })
    }).then(r => r.json()).then(data => {
      if(data.success){
        document.getElementById("upload-form").reset();
        Swal.fire({
          title: "Painting Added!",
          text: "Your painting was succesfully uploaded.",
          icon: "success"
        })
      }else{
        Swal.fire({
          title: "Failed",
          text: data.message,
          icon: "error"
        })
      }
    })
  }
  getBase64(e) {
    Toast.fire("Uploading...", "", "info")
    const cookie = name => `; ${document.cookie}`.split(`; ${name}=`).pop().split(';').shift();
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
          url: bs4,
          auth: cookie("admin_session")
        })
      }).then(r => r.json())

      if (data.success) {
        self.setState({
          image: data.image
        })
        Toast.fire("Image Uploaded!", "", "success")
      } else {
        console.log("Error")
      }
    }
    reader.readAsDataURL(file);
  }
  render() {
    return (<form className={ui.form} onSubmit={this.submit} id="upload-form">
      <h1 className={ui.formHeader}>Add a Painting</h1>
      <div className={ui.formLabel}>Painting Title</div>
      <input className={ui.inputSmall} placeholder="Make it Catchy" name="title" required/>
      <div className={ui.formLabel}>Painting Decription</div>
      <textarea className={ui.inputSmall} name="description" rows="2" placeholder="Describe it well" required></textarea>
      <div className={ui.formLabel}>Upload the Painting</div>
      <input className={ui.submit} type="file" onChange={this.getBase64} name="image" required/>
      <div className={ui.formLabel}>Price (USD)</div>
      <input className={ui.inputSmall} placeholder="$$$" name="price" type="number" required/>
      <div className={ui.formLabel}>Is it available for purchase? (sold/unsold)</div>
      <select name="sold" className={ui.submit}>
        <option value="false">Unsold</option>
        <option value="true">Already Sold</option>
      </select>

      <div className={ui.formLabel}>Painting Topic / Category</div>
      <select name="topic" className={ui.submit}>
        {Types.map((d, i) => <option key={i} value={i}>{d}</option>)}
      </select>

      <button type="submit" className={ui.button} style={{marginBottom: 0}}>Submit</button>
    </form>)
  }
}

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  render() {
    return (<div>
      <div className={cont.relcont}>
        <CreatePic />
      </div>
    </div>)
  }
}