import { ADD_USER, LOGOUT, LOGIN } from "../actions/actionTypes";

const UserToState = {
  user: {
    email: "",
    Loginstatus: false
  },
  key: "",
  successful: false
};

const Auth = (state = UserToState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        successful: true
      };
    case LOGOUT:
      return {
        ...state,
        user: {
          email: "",
          Loginstatus: false
        },
        key: ""
      };
    case LOGIN:
      return {
        ...state,
        user: {
          email: action.payload.email,
          Loginstatus: action.payload.loginStatus
        },
        key: action.payload.key
      };
    default:
      return state;
  }
};

export default Auth;
