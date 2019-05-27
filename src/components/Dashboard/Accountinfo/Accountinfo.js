import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle } from "mdbreact";
import { INFO } from "../../../API_ENDPOINTS";
import axios from "axios";

class Accountinfo extends Component {
  state = {
    fname: "",
    lname: "",
    email: "",
    username: ""
  };

  async componentWillMount() {
    try {
      var headers = {
        Authorization: "Token " + JSON.parse(localStorage.getItem("key"))
      };
      const res = await axios.get(INFO, { headers: headers });
      console.log(res.data);
      this.setState(() => ({
        fname: res.data.first_name,
        lname: res.data.last_name,
        email: res.data.email,
        username: res.data.username
      }));
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <Navbar />

        <MDBCard
          style={{ width: "70%", alignContent: "center", margin: "70px auto" }}
        >
          <div style={{ textAlign: "center", padding: "10px" }}>
            <MDBCardTitle>User's Account Info</MDBCardTitle>
          </div>
          <MDBCardBody>
            <div>
              <form className="needs-validation">
                <MDBRow>
                  <MDBCol md="5" className="mb-3">
                    <label
                      htmlFor="defaultFormRegisterNameEx"
                      className="grey-text"
                    >
                      First Name
                    </label>
                    <input
                      name="fname"
                      value={this.state.fname}
                      disabled
                      onChange={this.changeHandler}
                      type="text"
                      id="defaultFormRegisterNameEx"
                      className="form-control"
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                  </MDBCol>
                  <MDBCol md="1" className="mb-3" />
                  <MDBCol md="5" className="mb-3">
                    <label
                      htmlFor="defaultFormRegisterNameEx"
                      className="grey-text"
                    >
                      Last Name
                    </label>
                    <input
                      name="lname"
                      disabled
                      value={this.state.lname}
                      onChange={this.changeHandler}
                      type="text"
                      id="defaultFormRegisterNameEx"
                      className="form-control"
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="5" className="mb-3">
                    <label
                      htmlFor="defaultFormRegisterNameEx"
                      className="grey-text"
                    >
                      User Name
                    </label>
                    <input
                      name="fname"
                      disabled
                      value={this.state.username}
                      onChange={this.changeHandler}
                      type="text"
                      id="defaultFormRegisterNameEx"
                      className="form-control"
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                  </MDBCol>
                  <MDBCol md="1" className="mb-3" />
                  <MDBCol md="5" className="mb-3">
                    <label
                      htmlFor="defaultFormRegisterNameEx"
                      className="grey-text"
                    >
                      Email
                    </label>
                    <input
                      name="fname"
                      disabled
                      value={this.state.email}
                      onChange={this.changeHandler}
                      type="email"
                      id="defaultFormRegisterNameEx"
                      className="form-control"
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                  </MDBCol>
                </MDBRow>
              </form>
              <hr />
              <p>This User Information is for only Read Purpose!</p>
            </div>
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  }
}

export default Accountinfo;
