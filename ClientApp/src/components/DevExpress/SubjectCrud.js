import React from "react";

import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Position,
  Form,
  SearchPanel
} from "devextreme-react/data-grid";
import "devextreme-react/text-area";
import { Item } from "devextreme-react/form";
import TagBox from "devextreme-react/tag-box";
import CustomStore from "devextreme/data/custom_store";
import {
  getAllSubjects,
  insertSubject,
  deleteSubject,
  updateSubject
} from "./../../services/SubjectApi";
import { Grade, SubjectType } from "../../helpers/Enums";

class SubjectCrud extends React.Component {
  constructor(props) {
    super(props);
    this.type = [
      SubjectType.Optional,
      SubjectType.Graduational,
      SubjectType.ForeignLanguage,
      SubjectType.Seminars,
      SubjectType.SpecialSeminars,
      SubjectType.LanguageCommunication,
      SubjectType.MathApplication,
      SubjectType.Informatics,
      SubjectType.HumanSociety,
      SubjectType.HumanNature,
      SubjectType.ArtCulture,
      SubjectType.HumanHealth,
      SubjectType.HumanWork
    ];
    this.day = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek"];
    this.timePeriod = [
      "1-2. (8:30 - 10:05)",
      "3-4. (10:15 - 11:50)",
      "5-6. (12:15 - 13:50)",
      "7-8. (14:30 - 16:05)",
      "9-10. (16:15 - 17:50)"
    ];
    this.gradesList = [
      Grade.Prima,
      Grade.Sekunda,
      Grade.Tercie,
      Grade.Kvarta,
      Grade.Kvinta,
      Grade.Sexta,
      Grade.Septima,
      Grade.Oktava
    ];

    this.state = {
      subjects: new CustomStore({
        load: () => this.apiGetAllSubjects(),
        insert: value => this.apiInsertSubject(value),
        remove: value => this.apiDeleteSubject(value.id),
        update: (oldValue, value) => {
          this.apiUpdateSubject(oldValue, value);
          this.refreshDataGrid();
        }
      })
    };

    this.validationRules = {
      requiredField: [{ type: "required", message: "Povinné pole" }],
      numberField: [
        { type: "required", message: "Povinné pole" },
        { type: "numeric", message: "Pouze čísla" }
      ]
    };

    this.validateForm = e => {
      e.component.validate();
    };
  }

  async apiGetAllSubjects() {
    try {
      let result = await getAllSubjects();
      console.log(result.data);
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
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }

  render() {
    const { subjects } = this.state;
    return (
      <div id="data-grid-demo">
        <DataGrid
          dataSource={subjects}
          keyExpr="ID"
          showBorders={true}
          cellHintEnabled={true}
          ref={ref => (this.dataGrid = ref)}
        >
          <Paging enabled={false} />
          <Editing
            refreshMode="full"
            mode="popup"
            allowUpdating={true}
            allowAdding={true}
            allowDeleting={true}
            useIcons={true}
          >
            <Popup
              title="Detail předmětu"
              showTitle={true}
              width={900}
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
                editorType="dxTagBox"
                editorOptions={{
                  items: this.type,
                  showSelectionControls: true,
                  applyValueMode: "useButtons"
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
                validationRules={this.validationRules.numberField}
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
                dataField="grades"
                editorType="dxTagBox"
                editorOptions={{
                  items: this.gradesList,
                  showSelectionControls: true,
                  applyValueMode: "useButtons"
                }}
                validationRules={this.validationRules.requiredField}
              />

              <Item
                dataField="description"
                editorType="dxTextArea"
                editorOptions={{ height: 90 }}
                validationRules={this.validationRules.requiredField}
              />
            </Form>
          </Editing>

          <SearchPanel visible={true} width={240} placeholder="Najít..." />
          <Column dataField="name" caption="Název" />
          <Column dataField="type" caption="Typ předmětu" />
          <Column dataField="teacher" caption="Vyučující" />
          <Column dataField="description" caption="Popis" />
          <Column dataField="day" caption="Den" width={80} />
          <Column dataField="period" caption="Čas" />
          <Column dataField="capacity" caption="Kapacita" width={80} />
          <Column dataField="grades" caption="Pro třídu" />
        </DataGrid>
      </div>
    );
  }
}

export default SubjectCrud;
