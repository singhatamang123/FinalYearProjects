import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import d from "../image/d.png";
import user from "../image/user.svg"

function FormContainer({ children }) {
  return (
    <Container className="mt-5.5">
      <Row>
        <Col lg={4} md={6} sm={12} className="text-center">
          <img style={{ width: '70px', height: '70px', marginBottom: '2rem' }} src={user} alt="icon" />
          {children}
        </Col>
        <Col lg={8} md={6} sm={12}>
          <img className="w-100" src={d} alt="" />
        </Col>
      </Row>
    </Container >
  );
}

export default FormContainer;
