import { ADD_USER, LOGOUT, LOGIN } from "./actionTypes";

export const AddUser = () => {
  return dispatch => {
    dispatch({
      type: ADD_USER
    });
  };
};

export const Logout = () => {
  return dispatch => {
    localStorage.removeItem("key");
    dispatch({
      type: LOGOUT
    });
  };
};

export const Login = payload => {
  return dispatch => {
    payload.loginStatus = true;
    localStorage.setItem("key", JSON.stringify(payload.key));
    dispatch({
      type: LOGIN,
      payload
    });
  };
};
