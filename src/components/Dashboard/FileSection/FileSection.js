import React, { Component } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBRow
} from "mdbreact";
import axios from "axios";

class FileSection extends Component {
  state = {
    selectImage: false,
    images: [],
    message: ""
  };

  selectedImages = event => {
    let images = [];
    for (var i = 0; i < event.target.files.length; i++) {
      images[i] = event.target.files.item(i);
    }
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/));
    let message = `${images.length} valid image(s) selected`;
    this.setState(() => ({
      images,
      message,
      selectImage: true
    }));
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
                            onChange={this.selectedImages}
                            className="custom-file-input"
                            name="file"
                            aria-describedby="inputGroupFileAddon01"
                            multiple
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="inputGroupFile01"
                          >
                            Choose file
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
                    <MDBBtn type="submit">Upload</MDBBtn>
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

export default FileSection;
