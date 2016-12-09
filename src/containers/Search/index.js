import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "react-spinner";
import { map, isEmpty } from "lodash";
import { searchMomentsByTranscript } from "../../actions";
import { MomentCard } from "../../components/StoryTimeline";

export class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {searchQuery: ""};
  }
  onSearchQueryChanged(e) {
    this.setState({searchQuery: e.target.value});
  }
  onSearchClicked(e) {
    const {searchMomentsByTranscript} = this.props;

    if(this.state.searchQuery.length > 0) {
      searchMomentsByTranscript(this.state.searchQuery);
    }

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
        const searchResultChildren = !isEmpty(moments) ? map(moments, (moment) => {
          return <MomentCard key={moment.id} id={moment.id} title={moment.title} metStart={moment.metStart} content={moment.description} />;
        }) : <p style={{textAlign: "center"}}>No search results...</p>;
        
        return (
          <div className="story-timeline-container">
            {searchResultChildren}
          </div>
        );
      }
    };

    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label htmlFor="searchQuery">Search Moments By Title &amp; Description</label>
            <div className="input-group">
              <input type="text" className="form-control" id="searchQuery" value={this.state.searchQuery} onChange={this.onSearchQueryChanged.bind(this)} />
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
  searchMomentsByTranscript
})(Search);
