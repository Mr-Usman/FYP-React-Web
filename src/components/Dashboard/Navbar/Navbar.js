import React from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBMDBNavbarNav,
  MDBNavLink,
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import styles from "../Navbar/NavBar.module.css";
import FileSection from "../FileSection/FileSection";
import { connect } from "react-redux";
import { Logout } from "../../../store/actions/actionCreators";
import { withRouter } from "react-router-dom";

class NavbarPage extends React.Component {
  state = {
    collapse: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  logout = e => {
    e.preventDefault();
    this.props.Logout();
    this.props.history.push("/signin");
  };

  render() {
    const bgPink = { backgroundColor: "#e91e63" };
    const container = { height: 1300 };
    return (
      <div>
        <Router>
          <header>
            <MDBNavbar color="white" expand="md">
              <MDBNavbarBrand>
                <div className={styles["logo"]}>
                  <img
                    style={{
                      width: "20px",
                      height: "20px",
                      textAlign: "center"
                    }}
                    src={require("../../../assets/logo.png")}
                  />
                </div>
                <strong
                  className="white-text"
                  className={styles["NavBarColor"]}
                >
                  PenToScan
                </strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.toggleCollapse} />
              <MDBCollapse
                id="navbarCollapse3"
                isOpen={this.state.isOpen}
                navbar
              >
                <MDBNavbarNav left />
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBNavLink className="waves-effect waves-light" to="#!">
                      <MDBIcon
                        className={styles["NavBarColor"]}
                        fab
                        icon="facebook"
                      />
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink className="waves-effect waves-light" to="#!">
                      <MDBIcon
                        className={styles["NavBarColor"]}
                        fab
                        icon="twitter"
                      />
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink className="waves-effect waves-light" to="#!">
                      <MDBIcon
                        className={styles["NavBarColor"]}
                        fab
                        icon="google-plus-g"
                      />
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <MDBIcon
                          className={styles["NavBarColor"]}
                          icon="user"
                        />
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default" right>
                        <MDBDropdownItem
                          className={styles["NavBarColor"]}
                          href="#!"
                        >
                          Account Info
                        </MDBDropdownItem>
                        <MDBDropdownItem
                          className={styles["NavBarColor"]}
                          href="#!"
                          onClick={this.logout}
                        >
                          Sign Out
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </header>
        </Router>
        <div className={styles["FileContainer"]}>
          <FileSection /> <br />
        </div>
      </div>
    );
  }
}
// const mapStateToProps = state => {
//   return {};
// };

const mapDispatchToProps = dispatch => {
  return {
    Logout: () => dispatch(Logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(NavbarPage));
