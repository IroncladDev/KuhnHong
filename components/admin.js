/* eslint-disable @next/next/no-img-element */
import { Component } from "react";
import ui from "../styles/ui.module.css";
import cont from "../styles/cont.module.css";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

class CreatePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      categories: [],
    };
    this.getBase64 = this.getBase64.bind(this);
    this.submit = this.submit.bind(this);
  }
  submit(e) {
    e.preventDefault();
    const cookie = (name) =>
      `; ${document.cookie}`.split(`; ${name}=`).pop().split(";").shift();
    fetch("/api/addpic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify({
        title: e.target.title.value,
        image: this.state.image,
        description: e.target.description.value,
        topic: e.target.topic.value,
        price: e.target.price.value,
        sold: e.target.sold.value,
        auth: cookie("admin_session"),
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          document.getElementById("upload-form").reset();
          Swal.fire({
            title: "Painting Added!",
            text: "Your painting was succesfully uploaded.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Failed",
            text: data.message,
            icon: "error",
          });
        }
      });
  }
  getBase64(e) {
    Toast.fire("Uploading...", "", "info");
    const cookie = (name) =>
      `; ${document.cookie}`.split(`; ${name}=`).pop().split(";").shift();
    var self = this;
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = async function (upload) {
      let bs4 = upload.target.result;
      let data = await fetch("/api/upload", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          base64: bs4,
          auth: cookie("admin_session"),
        }),
      }).then((r) => r.json());

      if (data.success) {
        self.setState({
          image: data.url,
        });
        Toast.fire("Image Uploaded!", "", "success");
      } else {
        console.log("Error");
      }
    };
    reader.readAsDataURL(file);
  }

  componentDidMount() {
    fetch("/api/paintings")
      .then((r) => r.json())
      .then((data) => {
        this.setState({
          categories: [...new Set(data.map((x) => x.topic))],
        });
      });
  }

  render() {
    return (
      <form className={ui.form} onSubmit={this.submit} id="upload-form">
        <h1 className={ui.formHeader}>Add a Painting</h1>
        <div className={ui.formLabel}>Painting Title</div>
        <input
          className={ui.inputSmall}
          placeholder="Make it Catchy"
          name="title"
          required
        />
        <div className={ui.formLabel}>Painting Decription</div>
        <textarea
          className={ui.inputSmall}
          name="description"
          rows="2"
          placeholder="Describe it well"
          required
        ></textarea>
        <div className={ui.formLabel}>Upload the Painting</div>
        <input
          className={ui.submit}
          type="file"
          onChange={this.getBase64}
          name="image"
          required
        />
        <input type="hidden" name="price" value="0" />
        <div className={ui.formLabel}>
          Is it available for purchase? (sold/unsold)
        </div>
        <select name="sold" className={ui.submit}>
          <option value="false">Unsold</option>
          <option value="true">Already Sold</option>
        </select>

        <div className={ui.formLabel}>Painting Topic / Category</div>
        <input name="topic" className={ui.inputSmall} list="topic-list" />
        <datalist id="topic-list">
          {this.state.categories.map((d, i) => (
            <option key={i} value={d}>
              {d}
            </option>
          ))}
        </datalist>

        <button type="submit" className={ui.button} style={{ marginBottom: 0 }}>
          Submit
        </button>
      </form>
    );
  }
}

class MarkPics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    this.update = this.update.bind(this);
    this.markSold = this.markSold.bind(this);
    this.del = this.del.bind(this);
  }
  update(e) {
    this.setState({
      value: e.target.value,
    });
  }
  async markSold() {
    const { value: password } = await Swal.fire({
      title: "Mark painting as sold?",
      text:
        "Are you sure you would like to mark the painting “" +
        this.props.data[this.state.value].title +
        "” as sold?  You cannot undo this action.",
      input: "password",
      inputLabel: "Password",
      inputPlaceholder: "Enter password",
      icon: "warning",
      showCancelButton: true,
    });

    if (password) {
      fetch("/api/mark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({
          psw: password,
          dataId: this.props.data[this.state.value]._id,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.success) {
            this.props.updateData();
            Swal.fire({
              title: "Marked as Sold",
              text: "Painting was successfully marked as Sold",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Failed",
              text: data.message,
              icon: "error",
            });
          }
        });
    }
  }
  async del() {
    const { value: password } = await Swal.fire({
      title: "Delete Painting?",
      text:
        "Are you sure you would like to delete the painting “" +
        this.props.data[this.state.value].title +
        "”? You cannot undo this action.",
      input: "password",
      inputLabel: "Password",
      inputPlaceholder: "Enter password",
      icon: "warning",
      showCancelButton: true,
    });

    if (password) {
      fetch("/api/del", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({
          psw: password,
          dataId: this.props.data[this.state.value]._id,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.success) {
            this.props.updateData();
            Swal.fire({
              title: "Deleted",
              text: "Painting was successfully deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Failed",
              text: data.message,
              icon: "error",
            });
          }
        });
    }
  }
  render() {
    return (
      <div className={ui.form}>
        <h2 className={ui.formHeader}>Painting Actions</h2>
        <div className={ui.formLabel}>Select Painting</div>
        <select
          name="selectPainting"
          onChange={this.update}
          value={this.state.value}
          className={ui.submit}
        >
          {this.props.data.map((x, i) => (
            <option key={i} value={i}>
              {x.title}
            </option>
          ))}
        </select>

        <div style={{ display: "flex" }}>
          <button
            className={ui.submit}
            style={{ marginTop: 20, marginRight: 5 }}
            onClick={this.markSold}
          >
            Mark as Sold
          </button>
          <button
            className={ui.submit}
            style={{
              background: "rgb(255, 75, 75)",
              marginTop: 20,
              marginLeft: 5,
            }}
            onClick={this.del}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className={cont.relcont}>
          <CreatePic />
          <MarkPics updateData={this.props.updateData} data={this.props.data} />
        </div>
      </div>
    );
  }
}
