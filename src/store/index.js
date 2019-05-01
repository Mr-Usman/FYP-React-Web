import { createStore, combineReducers, applyMiddleware } from "redux";
import AuthReducer from "./reducers/AuthReducer";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
  auth: AuthReducer
});
const store = createStore(
  rootReducer,
  {},
  applyMiddleware(thunkMiddleware, logger)
);

export default store;
