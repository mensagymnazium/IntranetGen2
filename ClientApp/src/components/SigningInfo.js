import React from "react";
import { Container, Row, Col } from "reactstrap";
import { getAllSigningRulesForMe } from "./../services/SigningRulesApi";

class SigningInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rules: [],
      loading: true
    };
  }

  async componentDidMount() {
    await this.apiGetAllSignedRulesForMe();
    this.setState({
      loading: false
    });
  }

  async apiGetAllSignedRulesForMe() {
    try {
      let result = await getAllSigningRulesForMe();
      this.setState({
        rules: result.data
      });
    } catch (error) {

      //TODO Logger
    }
  }

  render() {
    return this.state.loading ? (
      <p>Loading...</p>
    ) : this.state.rules.length ? (
      <div>
        <h3>
          <strong> Co si zapsat:</strong>
        </h3>
        <Container>
          <Row>
            <Col>
              <strong>Skupina: </strong>
            </Col>
            <Col>
              <strong>Vzdělávací oblast: </strong>
            </Col>
            <Col xs="2" style={{ textAlign: "center" }}>
              <strong>Počet zapsání: </strong>
            </Col>
          </Row>
          {this.state.rules.map(x => {
            return (
              <Row style={{ padding: 10 }}>
                <Col> {x.category.join(", ")}</Col>
                <Col> {x.type.join(", ")}</Col>
                <Col xs="2" style={{ textAlign: "center" }}>
                  {x.quantity}
                </Col>
              </Row>
            );
          })}
        </Container>
      </div>
    ) : null;
  }
}

export default SigningInfo;
