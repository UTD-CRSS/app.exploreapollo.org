import React, {Component} from "react";
import { connect } from "react-redux";

import {
  redirectToRandomMoment
} from "../../actions";

import Spinner from "react-spinner";

export class RandomMoment extends Component {
  componentWillMount() {
    this.props.redirectToRandomMoment();
  }
  render() {
    return (
      <div className="text-center lead">
        <p>Loading A Random Moment...</p>
        <Spinner />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  redirectToRandomMoment
})(RandomMoment);
