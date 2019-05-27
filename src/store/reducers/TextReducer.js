import { TEXT_RESPONSE } from "../actions/actionTypes";

const initialState = {
  textData: "",
  successful: false
};

const Text = (state = initialState, action) => {
  switch (action.type) {
    case TEXT_RESPONSE:
      return {
        ...state,
        textData: action.payload,
        successful: true
      };
    default:
      return state;
  }
};

export default Text;
