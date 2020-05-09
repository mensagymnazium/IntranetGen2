import React from "react";
import { Container, Row, Col } from "reactstrap";
import { getAllSigningRulesForMe } from "./../services/SigningRulesApi";
import {
  getSignedPrimarySubjects,
  getSignedSecondarySubjects
} from "./../services/UserApi";

class SigningInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rules: [],
      loading: true,
      primarySubjects: [],
      secondarySubjects: []
    };
  }

  async componentDidMount() {
    await this.apiGetAllSignedRulesForMe();
    await this.apiGetSignedSubjects();
    this.setState({
      loading: false
    });
  }

  async apiGetSignedSubjects() {
    try {
      let primary = await getSignedPrimarySubjects();
      let secondary = await getSignedSecondarySubjects();
      console.log(primary.data);
      console.log(secondary.data);
      this.setState({
        primarySubjects: primary.data,
        secondarySubjects: secondary.data
      });
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
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
    ) : this.state.rules.length ? (
      <div>
        <h3>
          <strong> Co si zapsat:</strong>
        </h3>
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
    ) : null;
  }
}

export default SigningInfo;
