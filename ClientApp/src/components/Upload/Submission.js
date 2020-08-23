import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/Submission.css";

export default class Submission extends Component {
  render() {
    return (
      <Container>
        <h1>Odevzdání</h1>
        <Row>
          <Col xs="3" className="bold">
            Soubor
          </Col>
          <Col>
            {this.props.filePath
              .split("\\")
              .pop()
              .split("/")
              .pop()}
          </Col>
        </Row>
        <Row>
          <Col xs="3" className="bold">
            Datum odevzdání
          </Col>
          <Col xs>{this.props.uploadTime}</Col>
        </Row>
        <Row>
          <Col xs="3" className="bold">
            Číslo pokusu
          </Col>
          <Col>{this.props.numberOfUploads}</Col>
        </Row>
        <Row>
          <Col xs="3" className="bold">
            Počet bodů
          </Col>
          <Col>{this.props.score}</Col>
        </Row>
        {/* <Row>
          <Col xs="3" className="bold">
            Rychlost řešení
          </Col>
          <Col>{this.props.runTime}</Col>
        </Row> */}
        <Row>
          <Col xs="3" className="bold">
            Výpis programu
          </Col>
          <Col>
            <div className="display-linebreak">{this.props.resultMessage}</div>
          </Col>
        </Row>
        <Row>
          {this.props.notes ? (
            <Col xs="3" className="bold">
              Poznámka učitele
            </Col>
          ) : null}

          <Col>{this.props.note}</Col>
        </Row>
      </Container>
    );
  }
}
