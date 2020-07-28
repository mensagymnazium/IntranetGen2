import React, { Component } from "react";
import notify from "devextreme/ui/notify";
import { uploadFile } from "../../services/UploadService";

export default class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: "",
      readyToUpload: false,
      progress: 0
    };
  }

  onUploadProgress = result => {
    result === 100
      ? this.setState({ readyToUpload: true })
      : this.setState({ readyToUpload: false });
    this.setState({ progress: result });
  };

  async apiUpload(e) {
    e.preventDefault();
    if (this.state.file) {
      var lastFour = this.state.file.name.substr(
        this.state.file.name.length - 4
      );
      if (lastFour === ".zip") {
        try {
          uploadFile(this.state.file, this.onUploadProgress);
        } catch (error) {
          //TODO Logger
        }
      } else {
        notify("Only upload .zip file", "error", 3000);
      }
    }
  }

  setFile(e) {
    this.setState({ file: e.target.files[0], readyToUpload: true });
  }

  render() {
    return (
      <div className="container-fluid">
        <form onSubmit={e => this.apiUpload(e)}>
          <h1>File upload</h1>
          <input type="file" accept=".zip" onChange={e => this.setFile(e)} />
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!this.state.readyToUpload}
          >
            Upload
          </button>
        </form>
        <div>Progress: {this.state.progress}</div>
      </div>
    );
  }
}
