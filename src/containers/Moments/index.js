import React, { Component } from "react";
import { connect } from "react-redux";
import config from "../../../config";
import { loadMoments } from "../../actions";

import { MomentList } from "../../components";

export class Moments extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, moments: [] };
  }

  async componentDidMount() {
    const moments = await fetch(`${config.apiEntry}/api/moments`);
    const momentJson = await moments.json();

    this.setState({ loading: false, moments: momentJson });
    //this.props.loadMoments({});
  }
  render() {
    const moments = this.state.moments;

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
      loading,
    };
  }
  const { moments } = entities;

  return {
    loading,
    moments,
  };
}

export default connect(mapStateToProps, {
  loadMoments,
})(Moments);
