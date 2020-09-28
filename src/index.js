import "./scss/main.scss";
import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
//import configureStore from "./store/configureStore";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import  Routes  from "./routes";


if (location.href.indexOf("#") != -1) {
  history.replaceState({} , "", `${location.hash.substring(1)}`);
}


ReactDom.render(
    <BrowserRouter>
      <Switch>
        <Routes />
      </Switch>
    </BrowserRouter>,
document.getElementById("houston"));
