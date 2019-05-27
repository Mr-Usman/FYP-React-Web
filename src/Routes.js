import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Main from "./components/Dashboard/Main";
import SignUp from "./components/Authentication/SignUp/SignUp";
import SignIn from "./components/Authentication/Signin/SignIn";
import EditFile from "./components/Dashboard/Editor/Editor";
import Accountinfo from "./components/Dashboard/Accountinfo/Accountinfo";

class Router extends Component {
  constructor(props) {
    super(props);
    let key = JSON.parse(localStorage.getItem("key"));
    let loginStatus = false;
    if (key) {
      loginStatus = true;
    }
    this.state = {
      login: loginStatus
    };
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <PrivateRoute
              exact
              path="/"
              login={this.state.login}
              component={Main}
            />
            <PrivateRoute
              exact
              path="/editor"
              login={this.state.login}
              component={EditFile}
            />
            <PrivateRoute
              exact
              path="/accountinfo"
              login={this.state.login}
              component={Accountinfo}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const PrivateRoute = ({ component: Component, login, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        login ? <Component exact {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default Router;
