import { createStore, applyMiddleware, compose } from "redux";
import { reduxReactRouter } from "redux-router";
import routes from "../routes";
import thunk from "redux-thunk";
import { googleAnalytics } from "../middleware";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";
import { createHistory } from "history";
import {compact} from "lodash";

const isProduction = process.env.NODE_ENV === "production";

const middleware = compact([
  applyMiddleware(thunk),
  reduxReactRouter({ routes, createHistory }),
  applyMiddleware(googleAnalytics),
  !isProduction && applyMiddleware(createLogger())
]);

const finalCreateStore = compose.apply(this, middleware)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
