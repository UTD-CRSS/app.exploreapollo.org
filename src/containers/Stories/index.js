import React, {Component} from "react";
import { connect } from "react-redux";

import {
  loadStories
} from "../../actions";

import {StoryList} from "../../components";
import Spinner from "react-spinner";

export default class Stories extends Component {
  componentWillMount() {
    this.props.loadStories();
  }
  render() {
    if (this.props.loading) {
      return (
        <div className="text-center lead">
          <p>Loading Stories...</p>
          <Spinner />
        </div>
      );
    }
    const Stories = this.props.stories;
    return (
      <div className="container">
        <h1>Stories</h1>
        <StoryList stories={Stories} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {stories} = state;
  if (stories.loading) {
    return {
      loading: stories.loading
    };
  }
  return {
    loading: stories.loading,
    stories: stories.stories
  };
}

export default connect(mapStateToProps, {
  loadStories
})(Stories);
