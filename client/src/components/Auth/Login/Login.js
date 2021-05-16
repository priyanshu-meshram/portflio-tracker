import React, { Component } from "react";
import "./Login.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    emailAddress: "",
    password: "",
    message: "",
    showMessage: false,
    redirect: false,
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const new_user = {
      emailAddress: this.state.emailAddress,
      password: this.state.password,
    };
    console.log(new_user);
    this.setState({ showMessage: true });
    axios
      .post("/login", new_user)
      .then((response) => {
        if (response.data.message === "Login successfull") {
          this.setState({ redirect: true });
        }
        localStorage.setItem("token", response.data.token);
        this.setState({ message: response.data.message });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  mailChangedHandler = (event) => {
    this.setState({ emailAddress: event.target.value });
  };

  passwordChangedHandler = (event) => {
    this.setState({ password: event.target.value });
  };
  render() {
    const redirect = this.state.redirect;
    let alert = null;
    if (this.state.showMessage) {
      if (this.state.message === "Login successfull") {
        alert = (
          <Alert variant="success">
            <Alert.Heading>Login Successfull</Alert.Heading>
          </Alert>
        );
      } else if (
        this.state.message ===
        "The user does not exist, please check your mail id or verify your account "
      ) {
        alert = (
          <Alert variant="danger">
            <Alert.Heading>
              This User already exists or please verify your otp
            </Alert.Heading>
          </Alert>
        );
      } else {
        alert = (
          <Alert variant="danger">
            <Alert.Heading>Uh oh! Something went wrong</Alert.Heading>
          </Alert>
        );
      }
      if (redirect) {
        return <Redirect to="/home" />;
      }
    }
    return (
      <div className="login">
        <span>Login</span>
        <br />
        {alert}
        <Form onSubmit={this.handleSubmit}>
          <br />
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={this.mailChangedHandler}
              name="email"
              size="lg"
              type="email"
              placeholder="Enter email"
              value={this.state.emailAddress}
            />
          </Form.Group>
          <Form.Group name="password" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={this.passwordChangedHandler}
              size="lg"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
