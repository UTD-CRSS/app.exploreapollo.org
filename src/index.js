import "./scss/main.scss";
import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Switch } from "react-router-dom";
import Routes from "./routes";

if (location.href.indexOf("#") != -1) {
  history.replaceState({}, "", `${location.hash.substring(1)}`);
}

ReactDom.render(
  <BrowserRouter>
    <Switch>
      <Routes />
    </Switch>
  </BrowserRouter>,
  document.getElementById("houston")
);
