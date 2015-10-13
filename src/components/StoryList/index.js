import React, {Component} from "react";

export class StoryListItem extends Component {
  render() {
    const {id, title} = this.props;
    return (
      <div>
        <h2 ref="storyTitle">{title}</h2>
        <p>
          <a
            ref="storyLink"
            href={`#/stories/story/${id}`}>
            Launch
          </a>
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

    return stories.map((story) => {
      return (
        <StoryListItem
          key={story.id}
          id={story.id}
          title={story.title} />
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
