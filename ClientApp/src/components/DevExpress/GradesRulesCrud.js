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
import CustomStore from "devextreme/data/custom_store";
import {
  getAllSigningRules,
  insertSigningRule,
  deleteSigningRule,
  updateSigningRule
} from "./../../services/SigningRulesApi";
import { Types, Grades, Categories } from "./../../helpers/Data";

class GradesRulesCrud extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rules: new CustomStore({
        load: () => this.apiGetAllRules(),
        insert: value => this.apiInserRule(value),
        remove: value => this.apiDeleteRule(value.id),
        update: (oldValue, value) => {
          this.apiUpdateRule(oldValue, value);
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

  async apiGetAllRules() {
    try {
      let result = await getAllSigningRules();
      return result.data;
    } catch (error) {
      
      //TODO Logger
    }
  }

  async apiInserRule(signingRule) {
    try {
      await insertSigningRule(signingRule);
    } catch (error) {
      
      //TODO Logger
    }
  }

  async apiDeleteRule(id) {
    try {
      await deleteSigningRule(id);
    } catch (error) {
      
      //TODO Logger
    }
  }

  async apiUpdateRule(oldSigningRule, signingRule) {
    try {
      await updateSigningRule(oldSigningRule.id, signingRule);
    } catch (error) {
      
      //TODO Logger
    }
  }

  async refreshDataGrid() {
    await this.apiGetAllRules();
    this.dataGrid.instance.refresh();
  }

  render() {
    const { rules } = this.state;
    return (
      <div id="data-grid-demo">
        <DataGrid
          dataSource={rules}
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
              title="Pravidlo pro zápis"
              showTitle={true}
              width={600}
              height={400}
            >
              <Position my="top" at="top" of={window} />
            </Popup>
            <Form colCount={1} onOptionChanged={this.validateForm}>
              <Item
                dataField="grade"
                editorType="dxSelectBox"
                editorOptions={{
                  items: Grades,
                  searchEnabled: true,
                  value: ""
                }}
                validationRules={this.validationRules.requiredField}
              />
              <Item
                dataField="category"
                editorType="dxTagBox"
                editorOptions={{
                  items: Categories,
                  showSelectionControls: true,
                  applyValueMode: "useButtons"
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
                dataField="quantity"
                validationRules={this.validationRules.numberField}
              />
            </Form>
          </Editing>

          <SearchPanel visible={true} width={240} placeholder="Najít..." />
          <Column dataField="grade" caption="Pro třídu" />
          <Column dataField="category" caption="Skupina" />
          <Column dataField="type" caption="Vzdělávací oblast" />
          <Column dataField="quantity" caption="Počet možných zápisů" />
        </DataGrid>
      </div>
    );
  }
}

export default GradesRulesCrud;
