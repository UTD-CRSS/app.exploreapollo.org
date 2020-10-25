import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { Dashboard } from "../Dashboard";
import inthenews from '../../../static/inthenews.png';
import { InTheNewsComponent } from "../../components/InTheNewsComponent";

export default class InTheNews extends Component {
  render() {
    return (
      <div className="app-container">

        <h1>We've been in the news! Check out the buzz! </h1>
        <div className="row">
          <div className="col-md-7" >
            <img src={inthenews} />
          </div>
          <div className="col-md-5">
            <InTheNewsComponent />
          </div>
        </div>
      </div>


    );
  }
}