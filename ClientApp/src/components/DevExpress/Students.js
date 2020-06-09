import React from "react";
import DataGrid, { SearchPanel, Column } from "devextreme-react/data-grid";
import { getAllStudents } from "./../../services/UserApi";
import { CSVLink } from "react-csv";

class Students extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
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
        data: result.data
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }
  calculateCellValue(data) {
    var s = data.primarySubjects.join("\n");
    console.log(s);
    return data.primarySubjects.join("\n");
  }
  render() {
    // const defaultColumn = [
    //   { dataField: "email", caption: "Email" },
    //   { dataField: "studentClass", caption: "Třída" },
    //   { dataField: "primarySubjects", caption: "Primární zápis" },
    //   { dataField: "secondarySubjects", caption: "Sekundární" },
    //   { dataField: "signDone", caption: "Zápis dokončen" }
    // ];

    const headersCsv = [
      { label: "Email", key: "email" },
      { label: "Třída", key: "studentClass" },
      { label: "Primární předměty", key: "primarySubjects" },
      { label: "Sekundární předměty", key: "secondarySubjects" },
      { label: "Zápis dokončen", key: "signDone" }
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
            data={this.state.data.filter(x => !x.signDone)}
            filename={"zaci_nedokon.csv"}
            className="btn btn-primary"
            target="_blank"
          >
            Export žáků, co nedokončili zápis
          </CSVLink>
        </div>
        <br />
        <h1>Žáci, co nedokončili zápis</h1>
        <DataGrid
          dataSource={this.state.data.filter(x => !x.signDone)}
          showBorders={true}
        >
          <Column caption="Email" dataField="email" />
          <Column caption="Třída" dataField="studentClass" />
          <Column caption="Primární zápis" dataField="primarySubjects" />
          <Column caption="Sekundární zápis" dataField="secondarySubjects" />
          <Column caption="Zápis dokončen" dataField="signDone" />

          <SearchPanel visible={true} width={240} placeholder="Najít..." />
        </DataGrid>
        <br />

        <h1>Všichni žáci</h1>
        <DataGrid dataSource={this.state.data} showBorders={true}>
          <Column caption="Email" dataField="email" />
          <Column caption="Třída" dataField="studentClass" />
          <Column
            caption="Primární zápis"
            calculateCellValue={this.calculateCellValue}
            dataType="dxTextArea"
          />
          <Column caption="Sekundární zápis" dataField="secondarySubjects" />
          <Column caption="Zápis dokončen" dataField="signDone" />

          <SearchPanel visible={true} width={240} placeholder="Najít..." />
        </DataGrid>
      </div>
    );
  }
}

export default Students;
