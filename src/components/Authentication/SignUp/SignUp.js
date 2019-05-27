import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdbreact";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import styles from "../SignUp/SignUp.module.css";
import validationForm from "./Helper";
import axios from "axios";
import { REGISTRATION, FACEBOOK_LOGIN } from "../../../API_ENDPOINTS";

import { AddUser } from "../../../store/actions/actionCreators";
import store from "../../../store/index";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: "",
    successful: false,
    loginStatus: false,
    errors: {
      hasError: false,
      errorsObj: {},
      serverError: ""
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { username, email, password1, password2, errors } = this.state;
    const validate = validationForm("all", {
      username,
      email,
      password1,
      password2
    });
    if (validate.hasError) {
      this.setState({
        errors: validate
      });
      return;
    }
    const url = REGISTRATION;
    try {
      let response = await axios.post(url, { ...this.state });
      console.log(response.data);
      this.props.AddUser();
      this.props.successful === true
        ? this.props.history.push("/signin")
        : this.props.history.push("/signup");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps => ({
      successful: nextProps.successful
    }));
  }
  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    return (
      <div className={styles["cop"]}>
        <MDBContainer fluid>
          <MDBRow>
            <MDBCol md="6" sm="6">
              <MDBCard>
                <MDBCardBody>
                  <div className={styles["imageContainer"]}>
                    <img
                      src={require("../../../assets/logo.png")}
                      className="img-fluid"
                    />
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <div className="grey-text">
                      <MDBInput
                        label="User Name"
                        group
                        type="text"
                        name="username"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handleChange}
                      />
                      {errors.errorsObj.username && (
                        <p>{errors.errorsObj.username["message"]}</p>
                      )}

                      <MDBInput
                        label="email"
                        group
                        name="email"
                        type="email"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handleChange}
                      />
                      {errors.errorsObj.email && (
                        <p>{errors.errorsObj.email["message"]}</p>
                      )}
                      <MDBInput
                        label="password"
                        name="password1"
                        group
                        type="password"
                        validate
                        onChange={this.handleChange}
                      />
                      {errors.errorsObj.password && (
                        <p>{errors.errorsObj.password["message"]}</p>
                      )}
                      <MDBInput
                        label="Confirm password"
                        group
                        type="password"
                        name="password2"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handleChange}
                      />
                      {errors.errorsObj.confirmPassword && (
                        <p>{errors.errorsObj.confirmPassword["message"]}</p>
                      )}
                      {errors.errorsObj.matchedPassword && (
                        <p>{errors.errorsObj.matchedPassword["message"]}</p>
                      )}
                    </div>
                    <div className="text-center py-4 mt-3">
                      <MDBBtn color="cyan" type="submit">
                        Register
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    successful: state.auth.successful
  };
};

const mapDispatchToProps = dispatch => {
  return {
    AddUser: () => dispatch(AddUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignUp));
