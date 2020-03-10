import React from "react";

import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Lookup,
  Position,
  Form
} from "devextreme-react/data-grid";
import "devextreme-react/text-area";
import { Item } from "devextreme-react/form";
import CustomStore from "devextreme/data/custom_store";
import {
  getAllSubjects,
  insertSubject,
  deleteSubject,
  updateSubject
} from "./../../services/SubjectApi";
import { Tooltip } from "devextreme-react/tooltip";

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

    this.toggleDefault = this.toggleDefault.bind(this);
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

  render() {
    const { subjects } = this.state;
    return (
      <div id="data-grid-demo">
        <DataGrid
          dataSource={subjects}
          keyExpr="ID"
          showBorders={true}
          onCellHoverChanged={sender => this.toggleDefault(sender)}
        >
          <Paging enabled={false} />
          <Editing useIcons={true} />

          <Column dataField="name" caption="Název"></Column>
          <Column dataField="type" caption="Typ předmětu" />
          <Column dataField="teacher" caption="Vyučující" />
          <Column id="product1" dataField="description" caption="Popis" />
          <Column dataField="day" caption="Den" width={80} />
          <Column dataField="period" caption="Čas" />
          <Column dataField="capacity" caption="Kapacita" width={80} />
          <Column type="adaptive" width={50} />
        </DataGrid>
        <Tooltip
          target="#product1"
          visible={this.state.defaultVisible}
          closeOnOutsideClick={false}
        >
          <div>ExcelRemote IR</div>
        </Tooltip>
      </div>
    );
  }
}

export default SubjectSigning;
