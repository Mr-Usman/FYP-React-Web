import {
  ADD_USER,
  LOGOUT,
  LOGIN,
  FACEBOOK_LOGIN,
  GOOGLE_LOGIN
} from "../actions/actionTypes";

const UserToState = {
  user: {
    name: "",
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
          Loginstatus: false
        }
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
    case FACEBOOK_LOGIN:
      return {
        ...state,
        user: {
          name: action.payload.name,
          email: action.payload.email
        },
        key: action.payload.key
      };
    case GOOGLE_LOGIN:
      return {
        ...state,
        user: {
          name: action.payload.name,
          email: action.payload.email
        },
        key: action.payload.key
      };
    default:
      return state;
  }
};

export default Auth;
