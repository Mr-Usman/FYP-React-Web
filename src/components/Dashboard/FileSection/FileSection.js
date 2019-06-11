import React, { Component } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBFileInput
} from "mdbreact";
import axios from "axios";
import { IMAGE } from "../../../API_ENDPOINTS";
import FormData from "form-data";
import { connect } from "react-redux";
import Spinner from "react-spinner-material";
import {
  TextResponse,
  displayImage
} from "../../../store/actions/actionCreators";
import { withRouter } from "react-router-dom";

class FileSection extends Component {
  state = {
    selectedFile: null,
    filename: "",
    loading: false
  };

  onChange = e => {
    // const selectedFile = e.target.files[0];
    // const filename = e.target.files[0].name;
    // this.setState(() => ({
    //   selectedFile,
    //   filename
    // }));
    let reader = new FileReader();
    let file = e.target.files[0];
    const filename = e.target.files[0].name;
    reader.onloadend = () => {
      this.setState({
        selectedFile: file,
        filename
      });
    };
    reader.readAsDataURL(file);
    this.props.displayImage(file);
  };

  upload = async e => {
    e.preventDefault();
    this.setState(() => ({
      loading: true
    }));
    try {
      let formData = new FormData();
      formData.append("pic", this.state.selectedFile);
      var headers = {
        Accept: "application/json, text/plain, */*",
        Authorization: "Token " + JSON.parse(localStorage.getItem("key"))
      };
      const res = await axios.post(IMAGE, formData, { headers: headers });
      this.props.TextResponse(res.data);
      if (this.props.successful === true) {
        this.props.history.push("/editor");
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        <MDBContainer>
          <MDBRow>
            <MDBCol size="12" sm="12" lg="12">
              <MDBCard style={{ width: "100%" }}>
                <MDBCardBody>
                  <form onSubmit={this.upload} enctype="multipart/form-data">
                    <MDBCardTitle>Select Image To Be Uploaded</MDBCardTitle>
                    <MDBCardText>
                      <div className="input-group">
                        <div className="custom-file">
                          <input
                            type="file"
                            onChange={this.onChange}
                            className="custom-file-input"
                            name="myImage"
                            aria-describedby="inputGroupFileAddon01"
                            multiple
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="inputGroupFile01"
                          >
                            {this.state.filename}
                          </label>
                        </div>
                      </div>
                      {this.state.message && (
                        <div
                          style={{
                            textAlign: "center"
                          }}
                        >
                          <p style={{ color: "blue" }}>{this.state.message}</p>
                        </div>
                      )}
                    </MDBCardText>
                    <div>
                      <div style={{ display: "inline-block" }}>
                        <MDBBtn type="submit">Upload</MDBBtn>
                      </div>
                      {this.state.loading && (
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <div
                            style={{
                              display: "inline-block",
                              marginLeft: "10px"
                            }}
                          >
                            <Spinner
                              size={20}
                              spinnerColor={"#2bbbad"}
                              spinnerWidth={1}
                              visible={true}
                            />
                          </div>
                          <div
                            style={{
                              display: "inline-block",
                              marginLeft: "5px"
                            }}
                          >
                            <p style={{ color: "#2bbbad" }}>
                              please wait, result is generating
                            </p>
                          </div>
                        </div>
                      )}
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
    successful: state.text.successful,
    image: state.text.image
  };
};

const mapDispatchToProps = dispatch => {
  return {
    TextResponse: payload => dispatch(TextResponse(payload)),
    displayImage: payload => dispatch(displayImage(payload))
  };
};

export default connect(
  mapDispatchToState,
  mapDispatchToProps
)(withRouter(FileSection));
