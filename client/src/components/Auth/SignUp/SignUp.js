import React, { Component } from "react";
import "./SignUp.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Redirect } from "react-router-dom";

class SignUp extends Component {
  state = {
    name: "",
    emailAddress: "",
    password: "",
    message: "",
    showMessage: false,
    redirect: false,
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const new_user = {
      name: this.state.name,
      emailAddress: this.state.emailAddress,
      password: this.state.password,
    };
    this.setState({ showMessage: true });
    axios
      .post("/signup", new_user)
      .then((response) => {
        if (
          response.data.message === "Congratulations, the user has been created"
        ) {
          this.setState({ redirect: true });
        }
        localStorage.setItem("token", response.data.token);
        console.log(response.data.message);
        this.setState({ message: response.data.message });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  nameChangedHandler = (event) => {
    this.setState({ name: event.target.value });
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
      if (this.state.message === "Congratulations, the user has been created") {
        alert = (
          <Alert variant="success">
            <Alert.Heading>
              Congragulations, your account has been created
            </Alert.Heading>
          </Alert>
        );
      } else if (this.state.message === "This user already exists") {
        alert = (
          <Alert variant="danger">
            <Alert.Heading>
              This User already exists, Please try again
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
        return <Redirect to="/verifyOtp" />;
      }
    }
    return (
      <div className="signUp">
        <span>Sign Up</span>
        <br />
        {alert}
        <Form onSubmit={this.handleSubmit}>
          <br />
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={this.nameChangedHandler}
            name="Name"
            size="lg"
            placeholder="Name"
            value={this.state.name}
          />

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
            <Form.Text className="text-muted ">
              We'll never share your email with anyone else.
            </Form.Text>
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

export default SignUp;
