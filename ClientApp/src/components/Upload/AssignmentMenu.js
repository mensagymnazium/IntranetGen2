import React, { Component } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Assignment from "./Assignment";
import "../../styles/AssignmentMenu.css";
import "../../styles/SideBarOverride.scss";
import { AssignmentIcon } from "./AssignmentIcon";
import { getAllAssignments } from "../../services/AssignmentService";
import Submission from "./Submission";

export default class AssignmentMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignments: [],
      loading: true,
      activeDocument: null
    };
  }

  async componentDidMount() {
    await this.apiGetAllAssignments();
    this.setState({
      loading: false
    });
  }

  async apiGetAllAssignments() {
    try {
      let result = await getAllAssignments();
      console.log(result.data);
      this.setState({
        assignments: result.data
      });
    } catch (error) {
      //TODO Logger
    }
  }

  setFile(e) {
    this.setState({ activeDocument: e });
  }

  render() {
    return this.state.loading ? (
      <p>Loading...</p>
    ) : (
      <div className="parent">
        <div>
          <ProSidebar className="menu">
            <h2 align="center">Úkoly</h2>
            <Menu iconShape="square">
              {this.state.assignments.map(x => (
                <MenuItem
                  icon={<AssignmentIcon />}
                  onClick={e => this.setFile(x)}
                >
                  {x.name}
                </MenuItem>
              ))}
            </Menu>
          </ProSidebar>
        </div>

        <div>
          {this.state.activeDocument != null ? (
            <Assignment {...this.state.activeDocument} />
          ) : null}
          {this.state.activeDocument != null &&
          this.state.activeDocument.submissions.length ? (
            <Submission {...this.state.activeDocument.submissions[0]} />
          ) : null}
        </div>
      </div>
    );
  }
}
