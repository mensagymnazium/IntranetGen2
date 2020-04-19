import React from "react";
import DataGrid, { SearchPanel } from "devextreme-react/data-grid";
import { getAllStudents } from "./../../services/UserApi";
import { getSignStudentsForAllSubjects } from "./../../services/SignupApi";
import { CSVLink } from "react-csv";

const defaultColumn = [
  { dataField: "email", caption: "Email" },
  { dataField: "studentClass", caption: "Třída" },
  { dataField: "primarySubjects", caption: "Primární zápis" },
  { dataField: "secondarySubjects", caption: "Sekundární" },
  { dataField: "signDone", caption: "Zápis dokončen" }
];

const headersCsv = [
  { label: "Email", key: "email" },
  { label: "Třída", key: "studentClass" },
  { label: "Primární předměty", key: "primarySubjects" },
  { label: "Sekundární předměty", key: "secondarySubjects" }
];

class Students extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      studentBySubjects: [],
      loading: true
    };
  }

  async componentDidMount() {
    await this.apiGetAllStudents();
    await this.apiGetAllStudentsForSubjects();
    this.setState({
      loading: false
    });
  }

  async apiGetAllStudents() {
    try {
      let result = await getAllStudents();
      this.setState({
        data: result.data
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }

  async apiGetAllStudentsForSubjects() {
    try {
      let result = await getSignStudentsForAllSubjects();
      this.setState({
        studentBySubjects: result.data
      });
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }

  render() {
    return this.state.loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <CSVLink
          headers={headersCsv}
          data={this.state.data}
          filename={"zaci_zapis.csv"}
          className="btn btn-primary"
          target="_blank"
        >
          Export zápis žáků
        </CSVLink>
        <DataGrid
          dataSource={this.state.data}
          defaultColumns={defaultColumn}
          showBorders={true}
        >
          <SearchPanel visible={true} width={240} placeholder="Najít..." />
        </DataGrid>
      </div>
    );
  }
}

export default Students;
