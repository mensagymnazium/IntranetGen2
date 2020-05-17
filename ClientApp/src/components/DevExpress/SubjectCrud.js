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
// eslint-disable-next-line no-unused-vars
import TagBox from "devextreme-react/tag-box";
import CustomStore from "devextreme/data/custom_store";
import {
  getAllSubjects,
  insertSubject,
  deleteSubject,
  updateSubject
} from "./../../services/SubjectApi";
import {
  Types,
  Categories,
  Days,
  TimePeriods,
  Grades
} from "../../helpers/Data";

class SubjectCrud extends React.Component {
  constructor(props) {
    super(props);

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
  async refreshDataGrid() {
    await this.apiGetAllSubjects();
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
              height={700}
            >
              <Position my="top" at="top" of={window} />
            </Popup>
            <Form onOptionChanged={this.validateForm}>
              <Item itemType="group">
                <Item
                  dataField="name"
                  col="2"
                  validationRules={this.validationRules.requiredField}
                />

                <Item
                  dataField="teacher"
                  validationRules={this.validationRules.requiredField}
                />

                <Item
                  dataField="capacity"
                  validationRules={this.validationRules.numberField}
                />

                <Item
                  dataField="grades"
                  editorType="dxTagBox"
                  editorOptions={{
                    items: Grades,
                    showSelectionControls: true,
                    applyValueMode: "useButtons"
                  }}
                  validationRules={this.validationRules.requiredField}
                />

                <Item
                  dataField="category"
                  editorType="dxSelectBox"
                  editorOptions={{
                    items: Categories,
                    searchEnabled: true,
                    value: ""
                  }}
                  validationRules={this.validationRules.requiredField}
                />

                <Item
                  dataField="type"
                  editorType="dxTagBox"
                  editorOptions={{
                    items: Types,
                    showSelectionControls: true,
                    applyValueMode: "useButtons"
                  }}
                  validationRules={this.validationRules.requiredField}
                />
                <Item
                  dataField="day"
                  editorType="dxSelectBox"
                  editorOptions={{
                    items: Days,
                    searchEnabled: true,
                    value: ""
                  }}
                  validationRules={this.validationRules.requiredField}
                />
                <Item
                  dataField="period"
                  editorType="dxSelectBox"
                  editorOptions={{
                    items: TimePeriods,
                    searchEnabled: true,
                    value: ""
                  }}
                  validationRules={this.validationRules.requiredField}
                />
              </Item>
              <Item
                dataField="description"
                editorType="dxTextArea"
                editorOptions={{ height: "350px" }}
                validationRules={this.validationRules.requiredField}
              />
            </Form>
          </Editing>

          <SearchPanel visible={true} width={240} placeholder="Najít..." />
          <Column dataField="name" caption="Název" />
          <Column dataField="category" caption="Skupina" />
          <Column dataField="type" caption="Vzdělávací oblast" />
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
