import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import notify from "devextreme/ui/notify";
import { uploadFile } from "../../services/SubmissionService";
import {
  insertOrUpdateAssignment,
  deleteAssignment
} from "../../services/AssignmentService";
import { Role } from "../../helpers/Enums";

export default class Assignment extends Component {
  constructor(props) {
    super(props);
      
    this.state = {
      id: 0,
      name: "",
      deadline: "",
      activeFrom: "",
      solutionPath: "",
      url: "",
      maxNumberOfUploads: 0,
      group: 0,
      required: true,
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
           
          let result = await uploadFile(
            this.state.file,
            this.props.id,
            this.onUploadProgress
          );
          notify(result.data, "success", 1000);
          window.location.reload(false);
        } catch (error) {
          notify(error.response.data, "error", 3000);
        }
      } else {
        notify("Only upload .zip file", "error", 3000);
      }
    }
  }

  async apiDeleteAssignment(id) {
    try {
      await deleteAssignment(id);
    } catch (error) {
      //TODO Logger
    }
  }

  async apiNewAssignment(e) {
    e.preventDefault();
    var assignment = {
      name: this.state.name,
      deadline: this.state.deadline,
      activeFrom: this.state.activeFrom,
      solutionPath: this.state.solutionPath,
      url: this.state.url,
      group: this.state.group,
      maxNumberOfUploads: this.state.maxNumberOfUploads,
      required: this.state.required
    };

    try {
        var result = await insertOrUpdateAssignment(assignment);
        notify(result.data, "success", 1000);
    } catch (error) {
        notify(error.result.data, "error", 3000);
    }
  }

  handleChange(e) {
    if (e.target.name === "required") {
      this.setState({ [e.target.name]: e.target.checked });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  setFile(e) {
    this.setState({ file: e.target.files[0], readyToUpload: true });
  }
    render() {
      
    return this.props.new != "edit" ? (
      <Container>
        <h1>Zadání</h1>
        {this.props.roles &&
        this.props.roles.indexOf(Role.Admin) === -1 ? null : (
          <Button onClick={e => this.apiDeleteAssignment(this.props.id)} />
        )}
        <form onSubmit={e => this.apiUpload(e)}>
          <Row>
            <Col className="bold">Název</Col>
            <Col>{this.props.name}</Col>
          </Row>
          <Row>
            <Col className="bold">Zadání</Col>
            <Col>
              <a href={this.props.url}>Github</a>
            </Col>
          </Row>
          <Row>
            <Col className="bold">Termín odevzdání</Col>
            <Col>{this.props.deadline}</Col>
          </Row>
          <Row>
            <Col className="bold">Maximální počet nahrání</Col>
            <Col>{this.props.maxNumberOfUploads}</Col>
          </Row>
          <Row>
            <Col className="bold">Povinný</Col>
            <Col>{this.props.required ? "Ano" : "Ne"}</Col>
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
            <Col className="bold">Group:</Col>
            <Col>
              <input
                type="text"
                name="group"
                value={this.state.group}
                onChange={this.handleChange}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col className="bold">Url:</Col>
            <Col>
              <input
                type="text"
                name="url"
                value={this.state.url}
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
                checked={this.state.required}
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
