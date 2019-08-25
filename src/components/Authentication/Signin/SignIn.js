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
import { Login, Facebook, Google } from "../../../store/actions/actionCreators";
import validateLoginInput from "./validatelogin";
import { withRouter } from "react-router-dom";
import Spinner from "react-spinner-material";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faFacebook } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { connect } from "react-redux";
import { GOOGLE_LOGIN } from "../../../store/actions/actionTypes";
const url = LOGIN;

library.add(faFacebookF, faFacebook);

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    loginStatus: false,
    error: {
      message: null
    },
    emailError: "",
    passwordError: "",
    loading: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const { email, password, loginStatus } = this.state;
    const { errorsObject, isValid } = validateLoginInput({
      email,
      password
    });
    if (!isValid) {
      this.setState(() => ({
        emailError: errorsObject.email,
        passwordError: errorsObject.password,
        loading: false
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
        loading: false,
        error: {
          message: error.response.data.non_field_errors[0]
        }
      }));
    }
  };

  componentWillReceiveProps(nextProps) {
    const { loginStatus } = this.state;
    this.setState(() => ({
      loginStatus: nextProps.loginStatus
    }));
  }

  componentWillMount() {
    const key = JSON.parse(localStorage.getItem("key"));
    if (key && key !== undefined) {
      this.props.history.push("/");
    }
  }

  SocialSignUpWithFacebook = async res => {
    const facebookUrl = FACEBOOK_LOGIN;
    try {
      let response = await axios.post(facebookUrl, {
        access_token: res.accessToken
      });
      console.log(response.data);
      console.log(res);
      const name = res.name;
      const email = res.email;
      const key = response.data;
      const payload = { name, email, key, loginStatus: true };
      localStorage.removeItem("key");
      this.props.facebook(payload);
      this.props.history.push("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  SocialSignUpWithGoogle = async res => {
    const googleUrl = GOOGLE_LOGIN;
    try {
      let response = await axios.post(googleUrl, {
        access_token: res.accessToken
      });
      console.log(response.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { emailError, passwordError } = this.state;
    const element = <FontAwesomeIcon icon={faFacebook} />;
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
                        <p style={{ color: "#2bbbad" }}>
                          {this.state.error.message}
                        </p>
                      </div>
                    )}

                    <div className="text-center">
                      <MDBBtn type="submit">Sign In</MDBBtn>
                    </div>
                    {this.state.loading && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Spinner
                          size={20}
                          spinnerColor={"#2bbbad"}
                          spinnerWidth={1}
                          visible={true}
                        />
                        &nbsp;&nbsp;
                        <div style={{ color: "#2bbbad" }}>please wait ...</div>
                      </div>
                    )}
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
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <FacebookLogin
                      appId="265312887692042"
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={this.SocialSignUpWithFacebook}
                      cssClass={styles["btnFacebook"]}
                      icon={
                        <i className={element} style={{ marginLeft: "5px" }} />
                      }
                      textButton="&nbsp;&nbsp;Sign In with Facebook"
                    />

                    <GoogleLogin
                      clientId="644499667625-cvfkcrajmoh0cdbs0f8a5pj5390fisi7.apps.googleusercontent.com"
                      onSuccess={this.SocialSignUpWithGoogle}
                      onFailure={this.SocialSignUpWithGoogle}
                    >
                      <span>&nbsp;&nbsp;Sign In with Google</span>
                    </GoogleLogin>
                  </div>
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
    Login: payload => dispatch(Login(payload)),
    facebook: payload => dispatch(Facebook(payload)),
    google: payload => dispatch(Google(payload))
  };
};

export default connect(
  mapDispatchToState,
  mapDispatchToProps
)(withRouter(SignIn));
