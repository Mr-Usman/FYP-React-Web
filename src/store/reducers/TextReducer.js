import { TEXT_RESPONSE, IMAGE } from "../actions/actionTypes";

const initialState = {
  textData: "",
  successful: false,
  image: null
};

const Text = (state = initialState, action) => {
  switch (action.type) {
    case TEXT_RESPONSE:
      return {
        ...state,
        textData: action.payload,
        successful: true
      };
    case IMAGE:
      let image = URL.createObjectURL(action.payload);
      let reader = new FileReader();
      return {
        ...state,
        image
      };
    default:
      return state;
  }
};

export default Text;
