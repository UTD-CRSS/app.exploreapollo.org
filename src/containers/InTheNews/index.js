import React, {Component} from "react";
import {Link} from "react-router";
import { connect } from "react-redux";
import { Dashboard } from "../Dashboard";
import {InTheNewsComponent} from "../../components/InTheNewsComponent";

export default class InTheNews extends Component {
    render() {
      return (
          <div className="app-container">
             <h1>We've been in the news! Check out the buzz (aldrin, haha). </h1> 
             <InTheNewsComponent />
             </div>


      );
        }
}