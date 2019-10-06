import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const dotenv = require("dotenv");
dotenv.config();
// const config = require("dotenv").config().parsed;

const initialState = {};
const middleware = [thunk];

let store;
// console.log(config);
if (process.env.NODE_ENV === "development") {
  console.log("Serving in Development");
  store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
} else if (process.env.NODE_ENV === "production") {
  store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
}

export default store;
