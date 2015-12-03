import React, {Component} from "react";
import {Link} from "react-router";
import {keys} from "lodash";

export class StoryListItem extends Component {
  render() {
    const {id, title} = this.props;
    return (
      <div>
        <h2 ref="storyTitle">{title}</h2>
        <p>
          <Link
            ref="storyLink"
            to={`/stories/story/${id}`}>
            Launch
          </Link>
        </p>
      </div>
    );
  }
}

export default class StoryList extends Component {
  renderList() {
    const {stories} = this.props;
    if (!stories || stories.length < 1) {
      return (
        <div ref="errorMessage" className="alert alert-info">No Stories</div>
      );
    }
    return keys(stories).map((index) => {
      return (
        <StoryListItem
          key={stories[index].id}
          id={stories[index].id}
          title={stories[index].title} />
      );
    });
  }

  render() {
    return (
      <div refCollection="storyListContainer">
        {this.renderList()}
      </div>
    );
  }
}
