import React from "react";

import DataGrid, {
  Column,
  Paging,
  Selection,
  MasterDetail,
  Editing
} from "devextreme-react/data-grid";
import "devextreme-react/text-area";
import { Button } from "devextreme-react";
import CustomStore from "devextreme/data/custom_store";
import { getAllSubjects } from "./../../services/SubjectApi";
import {
  signUpSubject,
  getSignedSubjects,
  unSignUpSubject
} from "./../../services/UserApi";

import "./../../styles/SubjectSign.css";
import { Priority } from "../../helpers/Priority";

class SubjectSigning extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: new CustomStore({
        load: () => this.apiGetAllSubjects()
      }),
      signedSubjects: []
    };
    this.contentReady = this.contentReady.bind(this);
    this.selectionChanged = this.selectionChanged.bind(this);
    this.signUpClick = this.signUpClick.bind(this);
    this.unSignUpClick = this.unSignUpClick.bind(this);
    this.isSignUpVisible = this.isSignUpVisible.bind(this);
    this.isUnSignVisible = this.isUnSignVisible.bind(this);
  }

  async componentDidMount() {
    await this.apiGetSignedSubjects();
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
      let result = await getAllSubjects();
      return result.data;
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
  }

  async unSignUpClick(e) {
    e.event.preventDefault();
    await this.apiUnSignUpSubjects(e.row.data.id);
    await this.apiGetSignedSubjects();
  }

  isSignUpVisible(e) {
    return !this.state.signedSubjects.some(s => s.id === e.row.data.id);
  }

  isUnSignVisible(e) {
    return this.state.signedSubjects.some(s => s.id === e.row.data.id);
  }

  render() {
    const { subjects } = this.state;
    return (
      <div className="demo-container">
        <DataGrid
          id="grid-container"
          dataSource={subjects}
          keyExpr="ID"
          showBorders={true}
          onSelectionChanged={this.selectionChanged}
          onContentReady={this.contentReady}
        >
          <Editing mode="row" />
          <Paging enabled={false} />
          <Selection mode="single" />
          <Column dataField="name" caption="Název"></Column>
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
  let { teacher, description } = props.data;
  return (
    <div className="subject-info">
      <h5 className="subject-photo">Popis:</h5>
      <p className="subject-notes">{description}</p>
    </div>
  );
}
function signUpClick(e) {
  console.log(e);
}

export default SubjectSigning;
