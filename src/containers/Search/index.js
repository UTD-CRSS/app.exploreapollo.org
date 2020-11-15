import React, { Component } from "react";
import Spinner from "react-spinner";
import { map, isEmpty } from "lodash";
import { MomentCard } from "../../components/StoryTimeline";
import { AppFooter, AppHeader } from "../App";
import config from "../../../config";

export class Search extends Component {
  constructor(props) {
    super(props);

    this.state = { searchQuery: "", loading: true, searching: false };
  }
  onSearchQueryChanged(e) {
    this.setState({ searchQuery: e.target.value });
  }
  onSearchClicked(e) {
    this.setState({ ...this.state, searching: true });
    if (this.state.searchQuery.length > 0) {
      let transcriptSnippet = this.state.searchQuery;
      this.getResults(transcriptSnippet);
    }
    this.setState({ ...this.state, searching: false });
    e.preventDefault();
  }

  async getResults(query) {
    const moment = await fetch(
      `${config.apiEntry}/api/moments/search?q=${query}`
    );
    let momentJson = await moment.json();
    this.setState({ ...this.state, loading: false, moments: momentJson });
  }

  render() {
    const renderSearchResults = () => {
      const { loading, searching, moments } = this.state;

      if (loading && searching) {
        return (
          <div className="text-center lead">
            <p>Searching...</p>
            <Spinner />
          </div>
        );
      } else {
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
          <div className="moment-search-container">{searchResultChildren}</div>
        );
      }
    };

    return (
      <div className="app-container">
        <AppHeader />
        <div className="search-container">
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
