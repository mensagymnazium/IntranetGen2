import React from "react";
import DataGrid, { SearchPanel, Column } from "devextreme-react/data-grid";
import { getAllStudents } from "./../../services/UserApi";
import { getSignStudentsForAllSubjects } from "./../../services/SignupApi";
import { CSVLink } from "react-csv";

class Students extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      studentsBySubjects: [],
      loading: true
    };
  }

  async componentDidMount() {
    await this.apiGetAllStudents();
    await this.apiGetAllSignedStudentsBySubjects();
    this.setState({
      loading: false
    });
  }

  async apiGetAllSignedStudentsBySubjects() {
    try {
      let result = await getSignStudentsForAllSubjects();
      this.setState({
        studentsBySubjects: result.data
      });
    } catch (error) {
      
    }
  }

  async apiGetAllStudents() {
    try {
      let result = await getAllStudents();
      this.setState({
        data: result.data
      });
    } catch (error) {
      
      //TODO Logger
    }
  }
  separatePrimary(data) {
    return data.primarySubjects.join(", ");
  }

  separateSecondary(data) {
    return data.secondarySubjects.join(", ");
  }
  render() {
    const headersCsv = [
      { label: "Email", key: "email" },
      { label: "Třída", key: "studentClass" },
      { label: "Primární předměty", key: "primarySubjects" },
      { label: "Sekundární předměty", key: "secondarySubjects" },
      { label: "Zápis dokončen", key: "signDone" }
    ];

    const studentsBySubjectsHeader = [
      { label: "Předmět", key: "subjectName" },
      { label: "Žáci primárně", key: "primaryStudents" },
      { label: "Žáci náhradní", key: "secondaryStudents" }
    ];
    return this.state.loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <div>
          <CSVLink
            headers={headersCsv}
            data={this.state.data}
            filename={"zaci_zapis.csv"}
            className="btn btn-primary"
            target="_blank"
          >
            Export všech žáků
          </CSVLink>
          <CSVLink
            style={{ marginLeft: "10px" }}
            headers={headersCsv}
            data={this.state.data.filter(x => x.signDone === "Nedokončen")}
            filename={"zaci_nedokon.csv"}
            className="btn btn-primary"
            target="_blank"
          >
            Export žáků, co nedokončili zápis
          </CSVLink>

          <CSVLink
            style={{ marginLeft: "10px" }}
            headers={studentsBySubjectsHeader}
            data={this.state.studentsBySubjects}
            filename={"student_pres_predmety.csv"}
            className="btn btn-primary"
            target="_blank"
          >
            Export žáků dle předmětu
          </CSVLink>
        </div>
        <br />
        <h1>Žáci, co nedokončili zápis</h1>
        <DataGrid
          dataSource={this.state.data.filter(x => x.signDone === "Nedokončen")}
          showBorders={true}
          cellHintEnabled={true}
          allowColumnResizing={true}
        >
          <SearchPanel visible={true} width={240} placeholder="Najít..." />
          <Column caption="Email" dataField="email" />
          <Column caption="Třída" dataField="studentClass" />
          <Column caption="Primární zápis" dataField="primarySubjects" />
          <Column caption="Náhradní zápis" dataField="secondarySubjects" />
          <Column caption="Zápis dokončen" dataField="signDone" />
        </DataGrid>
        <br />

        <h1>Všichni žáci</h1>
        <DataGrid
          dataSource={this.state.data}
          showBorders={true}
          cellHintEnabled={true}
          allowColumnResizing={true}
        >
          <SearchPanel visible={true} width={240} placeholder="Najít..." />
          <Column caption="Email" dataField="email" />
          <Column caption="Třída" dataField="studentClass" />
          <Column
            caption="Primární zápis"
            calculateCellValue={this.separatePrimary}
          />
          <Column
            caption="Náhradní zápis"
            calculateCellValue={this.separateSecondary}
          />
          <Column caption="Zápis dokončen" dataField="signDone" />
        </DataGrid>
      </div>
    );
  }
}

export default Students;
