import React, { Component } from "react";
import inthenews from "../../../static/inthenews.png";
import { InTheNewsComponent } from "../../components/InTheNewsComponent";

export default class InTheNews extends Component {
  render() {
    return (
      <div className="app-container">

        <h1 className ="center"><b><u>Fearless Steps: In the NEWS!</u></b></h1>
        <br></br>
        <div className="row">
          <div className="col-md-5">
            <InTheNewsComponent />
          </div>
          <br></br>
          <div className="col-sm-1" >
            <img src={inthenews} className = "newslogo" width="auto" height="auto"/>
          </div>
           
        </div>
      </div>
    );
  }
}
