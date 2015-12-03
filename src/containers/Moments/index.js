import React, {Component} from "react";
import { connect } from "react-redux";

import {
  loadMoments
} from "../../actions";

import {MomentList} from "../../components";

export default class Moments extends Component {
  componentWillMount() {
    this.props.loadMoments({});
  }
  render() {
    const moments = this.props.moments;

    return (
      <div>
        <h1>Moments</h1>
        <MomentList moments={moments} />
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { loading, entities } = state.moments;
  if (loading) {
    return {
      loading
    };
  }
  const { moments } = entities;

  return {
    loading,
    moments
  };
}

export default connect(mapStateToProps, {
  loadMoments
})(Moments);
