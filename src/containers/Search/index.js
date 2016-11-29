import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "react-spinner";
import { map } from "lodash";
import { loadMoments } from "../../actions";
import { MomentCard } from "../../components/StoryTimeline";

export class Search extends Component {
  onSearchClicked(e) {
    const {loadMoments} = this.props;

    loadMoments({ momentId: "" });

    e.preventDefault();
  }
  render() {
    const renderSearchResults = () => {
      const {loading, moments} = this.props;

      if (loading) {
        return (
          <div className="text-center lead">
            <p>Searching...</p>
            <Spinner />
          </div>
        );
      } else {
        return (
          <div className="story-timeline-container">
            {map(moments, (moment) => {
              return <MomentCard key={moment.id} id={moment.id} title={moment.title} metStart={moment.metStart} content={"Transcript goes here..."} />;
            })}
          </div>
        );
      }
    };

    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label htmlFor="searchQuery">Search Moments By Transcript</label>
            <div className="input-group">
              <input type="text" className="form-control" id="searchQuery" />
              <span className="input-group-btn">
                <button type="submit" className="btn btn-default" onClick={this.onSearchClicked.bind(this)}>Search</button>
              </span>
            </div>
          </div>
        </form>

        <hr />

        {renderSearchResults()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const moments = state.moments;

  return {
    loading: moments.loading,
    moments: moments.entities.moments
  };
}

export default connect(mapStateToProps, {
  loadMoments
})(Search);
