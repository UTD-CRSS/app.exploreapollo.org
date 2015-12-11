import React, {Component} from "react";
import {Link} from "react-router";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="jumbotron">
              <h2 className="text-center">
                Explore Apollo is the first curated resource for Apollo mission audio and research.
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <h2>
              Missions
            </h2>
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="row">
                  <div className="col-sm-4">
                    <figure className="thumb">
                      <img
                        style={{maxWidth: "100%"}}
                        src="https://exploreapollo-data.s3.amazonaws.com/static-photos/apollo11.jpg" />
                    </figure>
                  </div>
                  <div className="col-sm-8">
                    <h3>Apollo 11</h3>
                    <Link
                      className="btn btn-lg btn-primary"
                      to="/stories?mission=apollo11">Launch</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-body">
                <h3 className="text-muted">More to come...</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
