import React, {Component} from "react";
import {Link} from "react-router";
import MomentList from "../../components/MomentList";

export default class Search extends Component {
  render() {
    return (
      <div className="container">
        <form>
            <div className="form-group">
                <label htmlFor="searchQuery">Search Query (transcripts, tags, astronauts, etc.)</label>
                <input type="text" className="form-control" id="searchQuery" />
            </div>

            <div className="form-group">
                <label htmlFor="missions">Missions</label>
                <select multiple className="form-control" id="missions">
                    <option selected>Apollo 11</option>
                    <option selected>Other Mission</option>
                </select>
            </div>

            <button type="submit" className="btn btn-default">Search</button>
        </form>

        <hr />
        <h2>Search Results</h2>
        <form>
            <div className="form-group">
                <label htmlFor="sortBy">Sort By</label>
                <select className="form-control" id="sortBy">
                    <option>Relevance</option>
                    <option>Rating</option>
                    <option>Popularity</option>
                    <option>Random</option>
                </select>
            </div>
        </form>

        <MomentList moments={[
            {id: 1, title: "adsf"},
            {id: 2, title: "adsf"},
            {id: 3, title: "adsf"},
            {id: 4, title: "adsf"}
        ]} />

        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li>
                    <a href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li>
                    <a href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
      </div>
    );
  }
}
