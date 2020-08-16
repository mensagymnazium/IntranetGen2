import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import notify from "devextreme/ui/notify";
import { uploadFile } from "../../services/SubmissionService";
import {
  insertOrUpdateAssignment,
  getAllAssignments
} from "../../services/AssignmentService";

export default class Assignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      deadline: "",
      activeFrom: "",
      solutionPath: "",
      maxNumberOfUploads: 0,
      required: false,
      file: "",
      readyToUpload: false,
      progress: 0
    };

    this.handleChange = this.handleChange.bind(this);
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

  async apiNewAssignment(e) {
    e.preventDefault();
    var assignment = {
      name: this.state.name,
      deadline: this.state.deadline,
      activeFrom: this.state.activeFrom,
      solutionPath: this.state.file,
      maxNumberOfUploads: this.state.maxNumberOfUploads,
      required: this.state.required
    };

    try {
      await insertOrUpdateAssignment(assignment);
      await getAllAssignments();
    } catch (error) {
      //TODO Logger
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  setFile(e) {
    this.setState({ file: e.target.files[0], readyToUpload: true });
  }
  render() {
    console.log(this.props);
    return this.props.new != "edit" ? (
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
              <Col className="bold"></Col>
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
    ) : (
      <Container>
        <h1>Zadání</h1>
        <form onSubmit={e => this.apiNewAssignment(e)}>
          <Row style={{ marginBottom: "10px" }}>
            <Col className="bold">Name:</Col>
            <Col>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col className="bold">Deadline:</Col>
            <Col>
              <input
                type="text"
                name="deadline"
                value={this.state.deadline}
                onChange={this.handleChange}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col className="bold"> Active from:</Col>
            <Col>
              <input
                type="text"
                name="activeFrom"
                value={this.state.activeFrom}
                onChange={this.handleChange}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col className="bold"> Solution path:</Col>
            <Col>
              <input
                type="text"
                name="solutionPath"
                value={this.state.solutionPath}
                onChange={this.handleChange}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col className="bold">Max uploads:</Col>
            <Col>
              <input
                type="text"
                name="maxNumberOfUploads"
                value={this.state.maxNumberOfUploads}
                onChange={this.handleChange}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col className="bold">Required:</Col>
            <Col>
              <input
                type="checkbox"
                name="required"
                value={this.state.required}
                onChange={this.handleChange}
              />
            </Col>
          </Row>
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </form>
      </Container>
    );
  }
}
