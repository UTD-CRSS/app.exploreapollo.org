import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "react-spinner";
import { map, isEmpty } from "lodash";
import { searchMomentsByTranscript } from "../../actions";
import { MomentCard } from "../../components/StoryTimeline";
import { AppFooter, AppHeader } from "../App";
import { fromJS } from "immutable";
import config from "../../../config";

export class Search extends Component {
  constructor(props) {
    super(props);

    this.state = { searchQuery: "", loading: true, searching: false };
  }
  onSearchQueryChanged(e) {
    this.setState({ searchQuery: e.target.value });
  }
  async onSearchClicked(e) {
    // const {searchMomentsByTranscript} = this.props;
    this.setState({ ...this.state, searching: true });
    if (this.state.searchQuery.length > 0) {
      let transcriptSnippet = this.state.searchQuery;
      const moment = fetch(
        `${config.apiEntry}/api/moments/search?q=${transcriptSnippet}`
      )
        .then((res) => {
          (res) => res.json();
        })
        .then((media) => {
          return fromJS(media);
        });
      console.log("MOMENT");
      console.log(moment);
      this.setState({ ...this.state, loading: false, moments: moment });
      //searchMomentsByTranscript(this.state.searchQuery);
    }
    this.setState({ ...this.state, searching: false });
    e.preventDefault();
  }
  render() {
    const renderSearchResults = () => {
      const { loading, searching, moments } = this.state;
      console.log(moments);

      if (loading && searching) {
        return (
          <div className="text-center lead">
            <p>Searching...</p>
            <Spinner />
          </div>
        );
      } else {
        console.log(moments);
        const searchResultChildren = !isEmpty(moments) ? (
          map(moments, (moment) => {
            return (
              <MomentCard
                key={moment.id}
                id={moment.id}
                title={moment.title}
                metStart={moment.metStart}
                content={moment.description}
              />
            );
          })
        ) : (
          <p style={{ textAlign: "center" }}>No search results...</p>
        );

        return (
          <div className="story-timeline-container">{searchResultChildren}</div>
        );
      }
    };

    return (
      <div className="app-container">
        <AppHeader />
        <div className="container">
          <form>
            <div className="form-group">
              <label htmlFor="searchQuery">
                Search Moments By Title &amp; Description
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="searchQuery"
                  value={this.state.searchQuery}
                  onChange={this.onSearchQueryChanged.bind(this)}
                />
                <span className="input-group-btn">
                  <button
                    type="submit"
                    className="btn btn-default"
                    onClick={this.onSearchClicked.bind(this)}
                  >
                    Search
                  </button>
                </span>
              </div>
            </div>
          </form>

          <hr />

          {renderSearchResults()}
        </div>
        <AppFooter />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const moments = state.moments;

  return {
    loading: moments.loading,
    moments: moments.entities.moments,
  };
}

export default connect(mapStateToProps, {
  searchMomentsByTranscript,
})(Search);
