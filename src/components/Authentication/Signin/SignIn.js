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
import { LOGIN } from "../../../API_ENDPOINTS";
import { Login } from "../../../store/actions/actionCreators";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
const url = LOGIN;

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    user: {
      loginStatus: false
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    const { email, password, loginStatus } = this.state;
    try {
      let response = await axios.post(url, { email, password });
      console.log(response.data);
      const key = response.data.key;
      this.props.Login({
        email,
        password,
        key,
        loginStatus
      });
      this.props.loginStatus === true
        ? this.props.history.push("/")
        : this.props.history.push("/signin");
    } catch (error) {
      console.log(error);
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

  render() {
    return (
      <div className={styles["cs"]}>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="5">
              <MDBCard>
                <MDBCardBody>
                  <form onSubmit={this.onSubmit}>
                    <p className="h5 text-center mb-4">Sign in</p>
                    <div className="grey-text">
                      <MDBInput
                        label="email"
                        onChange={this.handleChange}
                        icon="envelope"
                        name="email"
                        group
                        type="email"
                        validate
                        error="wrong"
                        success="right"
                      />
                      <MDBInput
                        label="password"
                        onChange={this.handleChange}
                        name="password"
                        icon="lock"
                        group
                        type="password"
                        validate
                      />
                    </div>
                    <div className="text-center">
                      <MDBBtn type="submit">Login</MDBBtn>
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
