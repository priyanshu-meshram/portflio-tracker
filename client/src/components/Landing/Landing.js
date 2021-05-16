import { React } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Landing.css";
import LandingHeader from "./LandingHeader/LandingHeader";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import background from "../../assets/backgroundImage.png";

import { LinkContainer } from "react-router-bootstrap";

const Landing = () => {
  return (
    <div
      className="Landing"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <LandingHeader />

      <Container fluid>
        <div className="space"></div>
        <Row className="justify-content-center">
          <Col>
            <Jumbotron fluid className="bg-light text-black">
              <p
                style={{
                  fontSize: "25px",
                }}
              >
                Manage your stock portfolio and track your daily changes
              </p>
              <Container fluid>
                <Row className="justify-content-center">
                  <Col xs={2}>
                    <LinkContainer to="/signUp">
                      <Button variant="outline-primary" type="submit" size="lg">
                        Sign up
                      </Button>
                    </LinkContainer>
                  </Col>
                  <Col xs={2}>
                    <LinkContainer to="/login">
                      <Button variant="outline-primary" type="submit" size="lg">
                        Login
                      </Button>
                    </LinkContainer>
                  </Col>
                </Row>
              </Container>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Landing;
