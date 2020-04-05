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
    console.log(this.state.rules);
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
      console.log(error);
      //TODO Logger
    }
  }

  render() {
    return this.state.loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <Container>
          <Row>
            <Col>
              <strong>Typ předmětu: </strong>
            </Col>
            <Col xs="2" style={{ textAlign: "center" }}>
              <strong>Počet zapsání: </strong>
            </Col>
          </Row>
          {this.state.rules.map(x => {
            return (
              <Row style={{ padding: 10 }}>
                <Col> {x.type.join(", ")}</Col>
                <Col xs="2" style={{ textAlign: "center" }}>
                  {x.quantity}
                </Col>
              </Row>
            );
          })}
        </Container>
      </div>
    );
  }
}

export default SigningInfo;
