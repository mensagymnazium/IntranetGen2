import React from "react";

import DataGrid, {
  Column,
  Paging,
  Selection,
  MasterDetail,
  FilterRow,
  SearchPanel
} from "devextreme-react/data-grid";
import "devextreme-react/text-area";
import {
  signUpSubject,
  getSignedSubjects,
  unSignUpSubject,
  getAvailableSubjects
} from "./../../services/UserApi";

import "./../../styles/SubjectSign.css";
import { Priority } from "../../helpers/PriorityEnum";

class SubjectSigning extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: [],
      signedSubjects: [],
      loading: true
    };
    this.contentReady = this.contentReady.bind(this);
    this.selectionChanged = this.selectionChanged.bind(this);
    this.signUpClick = this.signUpClick.bind(this);
    this.unSignUpClick = this.unSignUpClick.bind(this);
    this.isSignUpVisible = this.isSignUpVisible.bind(this);
    this.isUnSignVisible = this.isUnSignVisible.bind(this);
  }

  async componentDidMount() {
    await this.apiGetAllSubjects();
    await this.apiGetSignedSubjects();
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
      console.log(this.state.subjects);
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

  contentReady(e) {
    if (!e.component.getSelectedRowKeys().length) {
      e.component.selectRowsByIndexes(0);
    }
  }
  selectionChanged(e) {
    e.component.collapseAll(-1);
    e.component.expandRow(e.currentSelectedRowKeys[0]);
  }

  async signUpClick(e, priority) {
    e.event.preventDefault();
    await this.apiSignUpSubjects(e.row.data.id, priority);
    await this.apiGetSignedSubjects();
    await this.apiGetAllSubjects();
  }

  async unSignUpClick(e) {
    e.event.preventDefault();
    await this.apiUnSignUpSubjects(e.row.data.id);
    await this.apiGetSignedSubjects();
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
      <div className="demo-container">
        <DataGrid
          id="grid-container"
          dataSource={subjects}
          keyExpr="id"
          showBorders={true}
          onSelectionChanged={this.selectionChanged}
          onContentReady={this.contentReady}
        >
          <Paging enabled={false} />
          <SearchPanel visible={true} width={240} placeholder="Najít..." />
          <Selection mode="single" />
          <Column dataField="name" caption="Název" />
          <Column dataField="type" caption="Typ předmětu" />
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
                text: "Sekundárně",
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
          <MasterDetail enabled={false} render={renderDetail} />
        </DataGrid>
      </div>
    );
  }
}

function renderDetail(props) {
  let { enrolledStudents, capacity, description } = props.data;
  return (
    <div className="subject-info">
      <div className="subject-headline">
        <p>Popis:</p>
        <p>Zapsáno:</p>
      </div>
      <div className="subject-notes">
        <p>{description}</p>
        <p>
          {enrolledStudents} / {capacity}
        </p>
      </div>
    </div>
  );
}

export default SubjectSigning;
