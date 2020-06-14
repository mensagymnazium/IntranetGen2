import React, { Component } from "react";
import { Container } from "reactstrap";
import "./../styles/Base.css";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    const style = {
      paddingLeft: "50px",
      paddingRight: "50px"
    };
    return (
      <div>
        <Container style={style} fluid>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
