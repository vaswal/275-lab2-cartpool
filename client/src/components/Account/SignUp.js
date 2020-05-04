import React, { Component } from "react";
import { Redirect } from "react-router";

import logo from "../../images/cart.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Toast } from "react-bootstrap";
import { signUp } from "../../redux/actions/authActions";
import Expire from "./Expire";
import { connect } from "react-redux";

function mapStateToProps(store) {
  return {
    signupSuccess: store.auth.signupSuccess,
    signupMessage: store.auth.signupMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: (payload) => dispatch(signUp(payload)),
  };
}

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.state = {
      redirectVar: false,
      test: false,
    };
  }

  signUp = (e) => {
    e.preventDefault();

    const data = {};
    for (let i = 0; i < e.target.length; i++) {
      if (e.target[i].id !== "") {
        data[e.target[i].id] = e.target[i].value;
      }
    }

    let updatedData = null;
    if (
      this.props.location.props &&
      this.props.location.props.provider !== ""
    ) {
      updatedData = {
        screenName: data.screenName,
        nickName: data.nickName,
        email: data.email,
        accessToken: this.props.location.props.accessToken,
        img_url: this.props.location.props.img_url,
        name: this.props.location.props.name,
        provider: this.props.location.props.provider,
        provider_id: this.props.location.props.provider_id,
      };
    } else {
      updatedData = {
        screenName: data.screenName,
        nickName: data.nickName,
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      };
    }

    this.props.signUp(updatedData);
  };

  callbackFunction = (val) => {
    this.setState({ redirectVar: val });
  };

  render() {
    let OAuthRedirect = false;
    if (
      this.props.location.props &&
      this.props.location.props.provider !== ""
    ) {
      OAuthRedirect = true;
    }
    return (
      <div style={styles.container}>
        {this.state.redirectVar === true && (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )}

        {this.props.signupSuccess === true && (
          <Expire delay={5000} parentCallback={this.callbackFunction}>
            <Toast>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded mr-2"
                  alt=""
                />
                <strong className="mr-auto">Notification</strong>
              </Toast.Header>
              <Toast.Body>
                You have successfully signed-up! You are being redirected to the
                login page in 5 seconds.
              </Toast.Body>
            </Toast>
          </Expire>
        )}

        {this.state.isAddressCorrect !== null &&
          this.state.isAddressCorrect === false && (
            <Toast>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded mr-2"
                  alt=""
                />
                <strong className="mr-auto">Notification</strong>
              </Toast.Header>
              <Toast.Body>{this.state.isAddressCorrectMessage}</Toast.Body>
            </Toast>
          )}

        <div>
          <img style={styles.logo} src={logo} alt="Quora" />
        </div>

        <h3 style={styles.message}>SignUp</h3>
        <Form onSubmit={this.signUp}>
          <Form.Group controlId="screenName">
            <Form.Label>Screen name</Form.Label>
            <Form.Control placeholder="Enter a cool screen name" required />
          </Form.Group>

          <Form.Group controlId="nickName">
            <Form.Label>Nickname</Form.Label>
            <Form.Control placeholder="Enter a cool nickname" required />
          </Form.Group>

          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              defaultValue={
                this.props.location.props &&
                this.props.location.props.firstName !== ""
                  ? this.props.location.props.firstName
                  : ""
              }
              placeholder="Please provide your first name"
              required
            />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              defaultValue={
                this.props.location.props &&
                this.props.location.props.lastName !== ""
                  ? this.props.location.props.lastName
                  : ""
              }
              placeholder="Please provide your last name"
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              disabled={
                this.props.location.props &&
                this.props.location.props.provider !== ""
              }
              defaultValue={
                this.props.location.props &&
                this.props.location.props.provider !== ""
                  ? this.props.location.props.email
                  : ""
              }
              placeholder={
                this.props.location.props &&
                this.props.location.props.provider !== ""
                  ? this.props.location.props.email
                  : "What's your email?"
              }
              required
            />
          </Form.Group>

          <Form.Group
            controlId="password"
            className={
              this.props.location.props &&
              this.props.location.props.provider !== ""
                ? "d-none"
                : ""
            }
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter a strong password"
            />
          </Form.Group>
          {OAuthRedirect}
          <Button style={styles.signUpButton} variant="primary" type="submit">
            Sign up
          </Button>
        </Form>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  message: {
    fontWeight: "bold",
    paddingTop: "2rem",
  },
  logo: {
    paddingTop: "10px",
    width: "50px",
  },
  email: {
    width: "30rem",
  },
  signUpButton: {
    width: "30rem",
    backgroundColor: "#2F99EA",
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
