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

  responseFacebook = async response => {
    const facebookurl = FACEBOOK_LOGIN;
    try {
      let response = await axios.post(facebookurl);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
    // this.setState({
    //   display: false,
    //   isLoggedin: true,
    //   userID: response.userID,
    //   userName: response.userName,
    //   userEmail: response.userEmail,
    //   Picture: response.picture.data.url
    // });
  };

  responseGoogle = response => {};

  // componentDidMount() {
  //   console.log(this.props.history);
  // }

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    return (
      <div className={styles["cop"]}>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="7">
              <MDBCard>
                <MDBCardBody>
                  <form onSubmit={this.handleSubmit}>
                    <p className="h4 text-center py-4">Sign up</p>
                    {/* {user.email} */}
                    <div className="grey-text">
                      <MDBInput
                        label="User Name"
                        icon="user"
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
                        icon="envelope"
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
                        icon="lock"
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
                        icon="exclamation-triangle"
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
                    <div>
                      <FacebookLogin
                        appId="265312887692042"
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                      />
                      <br /> <br />
                      <GoogleLogin
                        clientId="644499667625-cvfkcrajmoh0cdbs0f8a5pj5390fisi7.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                      />
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
