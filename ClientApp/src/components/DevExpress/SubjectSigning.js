import React from "react";

import DataGrid, {
  Column,
  Paging,
  Selection,
  MasterDetail
} from "devextreme-react/data-grid";
import "devextreme-react/text-area";
import { Button } from "devextreme-react";
import CustomStore from "devextreme/data/custom_store";
import {
  getAllSubjects,
  insertSubject,
  deleteSubject,
  updateSubject
} from "./../../services/SubjectApi";
import "./../../styles/SubjectSign.css";

class SubjectSigning extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: new CustomStore({
        load: () => this.apiGetAllSubjects(),
        insert: value => this.apiInsertSubject(value),
        remove: value => this.apiDeleteSubject(value.id),
        update: (oldValue, value) => this.apiUpdateSubject(oldValue, value)
      }),
      defaultVisible: false
    };
    this.contentReady = this.contentReady.bind(this);
    this.selectionChanged = this.selectionChanged.bind(this);
  }

  toggleDefault(e) {
    console.log(e.text);
    this.setState({
      defaultVisible: !this.state.defaultVisible
    });
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

  async apiInsertSubject(subject) {
    try {
      await insertSubject(subject);
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }

  async apiDeleteSubject(id) {
    try {
      await deleteSubject(id);
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }

  async apiUpdateSubject(oldSubject, subject) {
    try {
      await updateSubject(oldSubject.id, subject);
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
          <Paging enabled={false} />
          <Selection mode="single" />
          <Column dataField="name" caption="Název"></Column>
          <Column dataField="type" caption="Typ předmětu" />
          <Column dataField="teacher" caption="Vyučující" />
          <Column dataField="description" caption="Popis" />
          <Column dataField="day" caption="Den" width={80} />
          <Column dataField="period" caption="Čas" />
          <Column dataField="capacity" caption="Kapacita" width={80} />

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
      <Button icon="check" type="success" text="Done" />
    </div>
  );
}

export default SubjectSigning;
