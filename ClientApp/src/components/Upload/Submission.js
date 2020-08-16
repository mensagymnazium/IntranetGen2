import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

export default class Submission extends Component {
  render() {
    return (
      <Container>
        <h1>Odevzdání</h1>
        <Row>
          <Col className="bold">Soubor</Col>
          <Col>
            {this.props.filePath
              .split("\\")
              .pop()
              .split("/")
              .pop()}
          </Col>
        </Row>
        <Row>
          <Col className="bold">Datum odevzdání</Col>
          <Col>{this.props.uploadTime}</Col>
        </Row>
        <Row>
          <Col className="bold">Číslo pokusu</Col>
          <Col>{this.props.numberOfUploads}</Col>
        </Row>
        <Row>
          <Col className="bold">Počet bodů</Col>
          <Col>{this.props.score}</Col>
        </Row>
        <Row>
          <Col className="bold">Rychlost řešení</Col>
          <Col>{this.props.runTime}</Col>
        </Row>
        <Row>
          <Col className="bold">Výpis programu</Col>
          <Col>{this.props.resultMessage}</Col>
        </Row>
        <Row>
          <Col className="bold">Poznámka učitele</Col>
          <Col>{this.props.note}</Col>
        </Row>
      </Container>
    );
  }
}
