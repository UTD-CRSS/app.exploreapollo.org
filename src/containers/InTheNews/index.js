import React, {Component} from "react";
import {Link} from "react-router";
import { connect } from "react-redux";
import { Dashboard } from "../Dashboard";


export class InTheNews extends Component {
    render() {
      return (
          <div className ="app-container">
             <h1>Welcome to In The News </h1> 
          </div>
      );
        }
}