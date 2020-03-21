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
import { Grade } from "./../../helpers/ClassesEnum";

class GradesRulesCrud extends React.Component {
  constructor(props) {
    super(props);
    this.type = ["Volitelný", "Maturitní", "Cizí jazyk", "Nadstavbový seminář"];
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
      rules: new CustomStore({
        load: () => this.apiGetAllRules(),
        insert: value => this.apiInserRule(value),
        remove: value => this.apiDeleteRule(value.id),
        update: (oldValue, value) => {
          this.apiUpdateRule(oldValue, value);
        }
      })
    };

    this.validationRules = {
      requiredField: [{ type: "required", message: "Povinné pole" }]
    };

    this.validateForm = e => {
      e.component.validate();
    };
  }

  async apiGetAllRules() {
    try {
      let result = await getAllSigningRules();
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }

  async apiInserRule(signingRule) {
    try {
      await insertSigningRule(signingRule);
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }

  async apiDeleteRule(id) {
    try {
      await deleteSigningRule(id);
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }

  async apiUpdateRule(oldSigningRule, signingRule) {
    try {
      await updateSigningRule(oldSigningRule.id, signingRule);
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
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
              width={400}
              height={300}
            >
              <Position my="top" at="top" of={window} />
            </Popup>
            <Form colCount={1} onOptionChanged={this.validateForm}>
              <Item
                dataField="grade"
                editorType="dxSelectBox"
                editorOptions={{
                  items: this.gradesList,
                  searchEnabled: true,
                  value: ""
                }}
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
                dataField="quantity"
                validationRules={this.validationRules.requiredField}
              />
            </Form>
          </Editing>

          <SearchPanel visible={true} width={240} placeholder="Najít..." />
          <Column dataField="grade" caption="Pro třídu" />
          <Column dataField="type" caption="Typ předmětu" />
          <Column dataField="quantity" caption="Počet možných zápisů" />
        </DataGrid>
      </div>
    );
  }
}

export default GradesRulesCrud;
