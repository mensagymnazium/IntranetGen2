import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import notify from "devextreme/ui/notify";
import { uploadFile } from "../../services/SubmissionService";

export default class Assignment extends Component {
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
    console.log(this.props);
    return (
      <Container>
        <h1>Zadání</h1>
        <form onSubmit={e => this.apiUpload(e)}>
          <Row>
            <Col className="bold">Název</Col>
            <Col>{this.props.name}</Col>
          </Row>
          <Row>
            <Col className="bold">Termín odevzdání</Col>
            <Col>{this.props.deadline}</Col>
          </Row>
          <Row>
            <Col className="bold">Maximální počet nahrání</Col>
            <Col></Col>
          </Row>
          <Row>
            <Col className="bold">Povinný</Col>
            <Col>{this.props.required}</Col>
          </Row>
          <Row className="inner">
            <Col>
              <input
                type="file"
                accept=".zip"
                onChange={e => this.setFile(e)}
              />
            </Col>
            <Col>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={!this.state.readyToUpload}
              >
                Upload
              </button>
            </Col>
          </Row>
        </form>
        <div>Progress: {this.state.progress}</div>
      </Container>
    );
  }
}
