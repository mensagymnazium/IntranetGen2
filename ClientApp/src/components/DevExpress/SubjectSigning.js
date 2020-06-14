import React from "react";

import DataGrid, {
  Column,
  Paging,
  MasterDetail,
  SearchPanel
} from "devextreme-react/data-grid";
import "devextreme-react/text-area";
import {
  signUpSubject,
  getSignedSubjects,
  unSignUpSubject,
  getAvailableSubjects,
  getSignedPrimarySubjects,
  getSignedSecondarySubjects
} from "./../../services/UserApi";
import { Row, Col, Container } from "reactstrap";

import "./../../styles/SubjectSign.css";
import { Priority } from "../../helpers/Enums";

class SubjectSigning extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: [],
      signedSubjects: [],

      primarySubjects: [],
      secondarySubjects: [],
      loading: true
    };
    this.signUpClick = this.signUpClick.bind(this);
    this.unSignUpClick = this.unSignUpClick.bind(this);
    this.isSignUpVisible = this.isSignUpVisible.bind(this);
    this.isUnSignVisible = this.isUnSignVisible.bind(this);
  }

  async componentDidMount() {
    await this.apiGetAllSubjects();
    await this.apiGetSignedSubjects();
    await this.apiGetAllSignedSubjects();
    this.setState({
      loading: false
    });
  }

  async apiGetSignedSubjects() {
    try {
      let result = await getSignedSubjects();
      this.setState({
        signedSubjects: result.data
      });
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }

  async apiGetAllSubjects() {
    try {
      let result = await getAvailableSubjects();
      this.setState({
        subjects: result.data
      });
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }

  async apiGetAllSignedSubjects() {
    try {
      let primary = await getSignedPrimarySubjects();
      let secondary = await getSignedSecondarySubjects();
      this.setState({
        primarySubjects: primary.data,
        secondarySubjects: secondary.data
      });
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }

  async apiSignUpSubjects(id, priority) {
    try {
      let result = await signUpSubject(id, priority);
      return result.data;
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }

  async apiUnSignUpSubjects(id) {
    try {
      let result = await unSignUpSubject(id);
      return result.data;
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }

  async signUpClick(e, priority) {
    e.event.preventDefault();
    await this.apiSignUpSubjects(e.row.data.id, priority);
    await this.apiGetSignedSubjects();
    await this.apiGetAllSignedSubjects();
    await this.apiGetAllSubjects();
  }

  async unSignUpClick(e) {
    e.event.preventDefault();
    await this.apiUnSignUpSubjects(e.row.data.id);
    await this.apiGetSignedSubjects();
    await this.apiGetAllSignedSubjects();
    await this.apiGetAllSubjects();
  }

  isSignUpVisible(e) {
    return !this.state.signedSubjects.some(s => s.id === e.row.data.id);
  }

  isUnSignVisible(e) {
    return this.state.signedSubjects.some(s => s.id === e.row.data.id);
  }

  render() {
    const { subjects } = this.state;
    return this.state.loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <div style={{ marginBottom: "20px" }}>
          <Container>
            <Row>
              <Col>
                <strong>Zapsáno: </strong>
              </Col>
              <Col>
                <strong>Priorita: </strong>
              </Col>
              <Col xs="2"></Col>
            </Row>
            {this.state.primarySubjects.map(x => {
              return (
                <Row>
                  <Col> {x} </Col>
                  <Col>Primární</Col>
                  <Col xs="2"></Col>
                </Row>
              );
            })}
            {this.state.secondarySubjects.map(x => {
              return (
                <Row>
                  <Col> {x} </Col>
                  <Col>Náhradní</Col>
                  <Col xs="2"></Col>
                </Row>
              );
            })}
          </Container>
        </div>

        <div className="demo-container">
          <DataGrid
            id="grid-container"
            dataSource={subjects}
            keyExpr="id"
            showBorders={true}
            allowColumnResizing={true}
            onContentReady={this.contentReady}
          >
            <Paging enabled={false} />
            <SearchPanel visible={true} width={240} placeholder="Najít..." />
            <Column dataField="name" caption="Název" />
            <Column dataField="category" caption="Skupina" />
            <Column dataField="type" caption="Vzdělávací oblast" />
            <Column dataField="teacher" caption="Vyučující" />
            <Column dataField="description" caption="Popis" />
            <Column dataField="day" caption="Den" width={80} />
            <Column dataField="period" caption="Čas" />
            <Column dataField="capacity" caption="Kapacita" width={80} />
            <Column
              caption="Zapsat"
              type="buttons"
              buttons={[
                {
                  text: "Primárně",
                  visible: this.isSignUpVisible,
                  onClick: e => this.signUpClick(e, Priority.Primary)
                },
                {
                  text: "Náhradní",
                  visible: this.isSignUpVisible,
                  onClick: e => this.signUpClick(e, Priority.Secondary)
                },
                {
                  text: "Odhlásit",
                  visible: this.isUnSignVisible,
                  onClick: this.unSignUpClick
                }
              ]}
            />
            <MasterDetail enabled={true} render={renderDetail} />
          </DataGrid>
        </div>
      </div>
    );
  }
}

function renderDetail(props) {
  let { enrolledStudents, capacity, description } = props.data;
  return (
    <div className="subject-info">
      <div className="subject-headline">
        <p>Zapsáno:</p>
        <p>Popis:</p>
      </div>
      <div className="subject-notes">
        <p>
          {enrolledStudents} / {capacity}
        </p>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default SubjectSigning;
