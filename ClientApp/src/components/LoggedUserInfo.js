import React from "react";
import { Layout } from "./Layout";
import { Row, Col } from "react-bootstrap";

export const LoggedUserInfo = props => {
  const { name, grade, role } = props;
  return (
    <Layout>
      <Row>
        <Col>
          <h3>Jméno: {name}</h3>
        </Col>
        <Col>
          {role === "0" ? (
            <div>
              <h3>Ročník: {grade}</h3>
            </div>
          ) : null}
        </Col>
      </Row>
    </Layout>
  );
};
