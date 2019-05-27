import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";

import AuthReducer from "./reducers/AuthReducer";
import Text from "./reducers/TextReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  text: Text
});
const store = createStore(
  rootReducer,
  {},
  applyMiddleware(thunkMiddleware, logger)
);

export default store;
