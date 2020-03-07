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
import { getTokenByScope } from "../../helpers/TokenHelper";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.type = ["Volitelný", "Maturitní", "Cizí jazyk", "Nadstavbový seminář"];
    this.day = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek"];
    this.timePeriod = [
      "1-2. (8:30 - 10:05)",
      "3-4. (10:15 - 11:50)",
      "5-6. (12:15 - 13:50)",
      "7-8. (14:30 - 16:05)",
      "9-10. (16:15 - 17:50)"
    ];

    this.state = {
      subjects: new CustomStore({
        load: () => this.apiGetAllSubjects(),
        insert: value => this.apiInsertSubject(value),
        remove: value => this.apiDeleteSubject(value.id),
        update: (key, value) => this.apiUpdateSubject(key, value)
      })
    };

    this.validationRules = {
      requiredField: [{ type: "required", message: "Povinné pole" }]
    };

    this.validateForm = e => {
      e.component.validate();
    };
  }

  async apiGetAllSubjects() {
    let scope = ["api://6842fe3c-f09c-4ec1-b6b0-1d15cf6a37bf/Subjects.Read"];
    try {
      let token = await getTokenByScope(scope);
      let result = await getAllSubjects(token.accessToken);
      return result.data;
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }

  async apiInsertSubject(subject) {
    let scope = ["api://6842fe3c-f09c-4ec1-b6b0-1d15cf6a37bf/Subjects.Read"];
    try {
      let token = await getTokenByScope(scope);
      await insertSubject(token.accessToken, subject);
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }

  async apiDeleteSubject(id) {
    let scope = ["api://6842fe3c-f09c-4ec1-b6b0-1d15cf6a37bf/Subjects.Read"];
    try {
      let token = await getTokenByScope(scope);
      await deleteSubject(token.accessToken, id);
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }

  async apiUpdateSubject(key, subject) {
    let scope = ["api://6842fe3c-f09c-4ec1-b6b0-1d15cf6a37bf/Subjects.Read"];
    try {
      let token = await getTokenByScope(scope);
      await updateSubject(token.accessToken, key.id, subject);
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }

  render() {
    const { subjects } = this.state;
    console.log(subjects);
    return (
      <div id="data-grid-demo">
        <DataGrid dataSource={subjects} keyExpr="ID" showBorders={true}>
          <Paging enabled={false} />
          <Editing
            mode="popup"
            allowUpdating={true}
            allowAdding={true}
            allowDeleting={true}
          >
            <Popup
              title="Detail předmětu"
              showTitle={true}
              width={700}
              height={525}
            >
              <Position my="top" at="top" of={window} />
            </Popup>
            <Form colCount={2} onOptionChanged={this.validateForm}>
              <Item
                dataField="name"
                validationRules={this.validationRules.requiredField}
              />
              <Item
                dataField="type"
                editorType="dxSelectBox"
                editorOptions={{
                  items: this.type,
                  searchEnabled: true,
                  value: ""
                }}
                validationRules={this.validationRules.requiredField}
              />
              <Item
                dataField="teacher"
                validationRules={this.validationRules.requiredField}
              />

              <Item
                dataField="day"
                editorType="dxSelectBox"
                editorOptions={{
                  items: this.day,
                  searchEnabled: true,
                  value: ""
                }}
                validationRules={this.validationRules.requiredField}
              />
              <Item
                dataField="capacity"
                validationRules={this.validationRules.requiredField}
              />
              <Item
                dataField="period"
                editorType="dxSelectBox"
                editorOptions={{
                  items: this.timePeriod,
                  searchEnabled: true,
                  value: ""
                }}
                validationRules={this.validationRules.requiredField}
              />
              <Item
                dataField="description"
                colSpan={2}
                editorType="dxTextArea"
                editorOptions={{ height: 90 }}
                validationRules={this.validationRules.requiredField}
              />
            </Form>
          </Editing>
          <Column dataField="name" caption="Název" />
          <Column dataField="type" caption="Typ předmětu" />
          <Column dataField="teacher" caption="Vyučující" />
          <Column dataField="description" caption="Popis" />
          <Column dataField="day" caption="Den" width={80} />
          <Column dataField="period" caption="Čas" />
          <Column dataField="capacity" caption="Kapacita" width={80} />
        </DataGrid>
      </div>
    );
  }
}

export default App;
