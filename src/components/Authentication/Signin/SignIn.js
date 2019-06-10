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
import styles from "../Signin/SignIn.module.css";
import { LOGIN, FACEBOOK_LOGIN } from "../../../API_ENDPOINTS";
import { Login } from "../../../store/actions/actionCreators";
import validateLoginInput from "./validatelogin";
import { withRouter } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { connect } from "react-redux";
const url = LOGIN;

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    user: {
      loginStatus: false
    },
    error: {
      message: null
    },
    emailError: "",
    passwordError: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    const { email, password, loginStatus } = this.state;
    const { errorsObject, isValid } = validateLoginInput({
      email,
      password
    });
    if (!isValid) {
      this.setState(() => ({
        emailError: errorsObject.email,
        passwordError: errorsObject.password
      }));
      return;
    }

    try {
      let response = await axios.post(url, { email, password });
      console.log(response.data);
      console.log(response);
      const key = response.data.key;
      this.props.Login({
        email,
        password,
        key,
        loginStatus
      });
      if (this.props.loginStatus === true) {
        this.props.history.push("/");
      }
      this.props.history.push("/signin");
    } catch (error) {
      // console.log(error.response.data.non_field_errors[0]);
      this.setState(() => ({
        error: {
          message: error.response.data.non_field_errors[0]
        }
      }));
    }
  };

  componentWillReceiveProps(nextProps) {
    const { loginStatus } = this.state.user;
    this.setState(() => ({
      loginStatus: nextProps.loginStatus
    }));
    console.log(this.state.user.loginStatus);
  }

  componentWillMount() {
    const key = JSON.parse(localStorage.getItem("key"));
    if (key && key !== undefined) {
      this.props.history.push("/");
    }
  }

  responseFacebook = async res => {
    const facebookurl = FACEBOOK_LOGIN;
    try {
      let response = await axios.post(facebookurl, {
        access_token: res.accessToken
      });
      console.log(response.data);
      console.log(res);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  responseGoogle = response => {
    const name = response.profileObj.name;
    const email = response.profileObj.email;
    const access_token = response.Zi.access_token;
  };

  render() {
    const { emailError, passwordError } = this.state;
    return (
      <div className={styles["cs"]}>
        <MDBContainer fluid>
          <MDBRow>
            <MDBCol md="8" sm="8">
              <MDBCard>
                <MDBCardBody>
                  <div className={styles["imageContainer"]}>
                    <img
                      src={require("../../../assets/logo.png")}
                      className="img-fluid"
                    />
                  </div>
                  <form onSubmit={this.onSubmit}>
                    <div className="grey-text">
                      <MDBInput
                        label="email"
                        onChange={this.handleChange}
                        name="email"
                        group
                        type="email"
                        validate
                        error="wrong"
                        success="right"
                      />
                      {emailError && (
                        <p style={{ color: "red" }}>{emailError}</p>
                      )}
                      <MDBInput
                        label="password"
                        onChange={this.handleChange}
                        name="password"
                        group
                        type="password"
                        validate
                      />
                      {passwordError && (
                        <p style={{ color: "red" }}>{passwordError}</p>
                      )}
                    </div>
                    {this.state.error.message && (
                      <div style={{ textAlign: "center" }}>
                        <p style={{ color: "red" }}>
                          {this.state.error.message}
                        </p>
                      </div>
                    )}
                    <div className="text-center">
                      <MDBBtn type="submit">Sign In</MDBBtn>
                    </div>
                    <div
                      style={{
                        display: "inline",
                        textAlign: "center"
                      }}
                    >
                      <p
                        className={styles["CAT"]}
                        onClick={() => this.props.history.push("/signup")}
                      >
                        Create New Account?
                      </p>
                    </div>
                  </form>
                  <hr />
                  {/* <div className={styles["SML"]}>
                    <FacebookLogin
                      appId="265312887692042"
                      fields="name,email,picture"
                      textButton="&nbsp;&nbsp;Sign In with Facebook"
                      callback={this.responseFacebook}
                    />
                    <GoogleLogin
                      clientId="644499667625-cvfkcrajmoh0cdbs0f8a5pj5390fisi7.apps.googleusercontent.com"
                      buttonText="LOGIN WITH GOOGLE"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                    />
                  </div> */}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

const mapDispatchToState = state => {
  return {
    loginStatus: state.auth.user.Loginstatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    Login: payload => dispatch(Login(payload))
  };
};

export default connect(
  mapDispatchToState,
  mapDispatchToProps
)(withRouter(SignIn));
