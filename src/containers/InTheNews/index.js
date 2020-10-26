import React, { Component } from "react";
import inthenews from "../../../static/inthenews.png";
import { InTheNewsComponent } from "../../components/InTheNewsComponent";

export default class InTheNews extends Component {
  render() {
    return (
      <div className="app-container">

        <h1 className ="center">We've been in the news! Check out the buzz! </h1>
        <div className="row">
          <div className="col-md-5">
            <InTheNewsComponent />
          </div>
          <div className="col-md-7" >
            <img src={inthenews} className = "newslogo" />
          </div>
        </div>
      </div>


    );
  }
}