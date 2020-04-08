import React from "react";
import DataGrid, { SearchPanel } from "devextreme-react/data-grid";
import { getAllStudents } from "./../../services/UserApi";

const columns = [
  { dataField: "email", caption: "Email" },
  { dataField: "studentClass", caption: "Třída" },
  { dataField: "primarySubjects", caption: "Primární zápis" },
  { dataField: "secondarySubjects", caption: "Sekundární" },
  { dataField: "signDone", caption: "Zápis dokončen" }
];

class Students extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      loading: true
    };
  }

  async componentDidMount() {
    await this.apiGetAllStudents();
    this.setState({
      loading: false
    });
  }

  async apiGetAllStudents() {
    try {
      let result = await getAllStudents();
      this.setState({
        students: result.data
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }

  render() {
    return (
      <DataGrid
        dataSource={this.state.students}
        defaultColumns={columns}
        showBorders={true}
      >
        <SearchPanel visible={true} width={240} placeholder="Najít..." />
      </DataGrid>
    );
  }
}

export default Students;
