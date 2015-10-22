import "babel-core/polyfill";
import "./scss/main.scss";
import React from "react";
// import { render } from "react-dom";
import { Provider } from "react-redux";
import { ReduxRouter } from "redux-router";
import configureStore from "./store/configureStore";

if (location.href.indexOf("#") != -1) {
  history.replaceState({} , "", `${location.hash.substring(1)}`);
}

const store = configureStore();

React.render((
  <Provider store={store}>
    {() =>
      <ReduxRouter />
    }
  </Provider>
), document.body);
