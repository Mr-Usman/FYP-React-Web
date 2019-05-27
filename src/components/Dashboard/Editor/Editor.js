import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
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
import "./Editor.css";
import NavbarPage from "../Navbar/Navbar";
import { connect } from "react-redux";
import htmlToText from "html-to-text";
import jsPDF from "jspdf";

class EditFile extends Component {
  state = {
    textData: this.props.TextResponse
  };

  // componentWillReceiveProps(nextProps) {
  //   console.log("componentWillReceiveProps", nextProps);
  //   this.setState({
  //     textData: this.props.TextResponse
  //   });
  //   console.log(this.state.textData);
  // }

  exportPdf = e => {
    e.preventDefault();
    const input = this.state.textData;
    const text = htmlToText.fromString(input, {
      wordwrap: 130
    });
    var pdf = new jsPDF();
    pdf.setFontSize(10);
    pdf.setFont("times");
    pdf.text(20, 10, text);
    pdf.save("Document.pdf");
  };

  textUpdated = content => {
    this.setState({
      textData: content
    });
  };

  render() {
    return (
      <div>
        <div>
          <NavbarPage />
        </div>
        <MDBContainer>
          <MDBRow>
            <MDBCol size="8" sm="8" lg="8">
              <form onSubmit={this.exportPdf}>
                <div className="E-Container">
                  <Editor
                    initialValue={this.props.TextResponse}
                    onEditorChange={this.textUpdated}
                    init={{
                      powerpaste_allow_local_images: true,
                      plugins: "link image code",
                      toolbar:
                        "save | undo redo | bold italic | alignleft aligncenter alignright | code",
                      height: "480",
                      paste_as_text: true,
                      plugins: "paste"
                    }}
                  />
                  <div className="text-right" style={{ marginTop: 20 }}>
                    <MDBBtn type="submit">Save File</MDBBtn>
                  </div>
                </div>
              </form>
            </MDBCol>
            <MDBCol size="4" sm="4" lg="4">
              <MDBCard style={{ width: "100%", marginTop: 38 }}>
                <MDBCardBody>
                  <MDBCardTitle>Preview an Image</MDBCardTitle>
                  <MDBCardText />
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
    TextResponse: state.text.textData
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditFile);
