import React, {Component} from "react";
import {Link} from "react-router";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid" style={{padding: 0, marginBottom: "2em"}}>
        <div className="mission-selector">
          <img src="http://www.wallpapersxl.com/wallpapers/1600x900/astronaut/208100/astronaut-outer-space-moon-nasa-astronauts-free-208100.jpg" alt="Apollo 11" style={{width: "100%", maxWidth: "1600px"}} />

          <div className="panel panel-default" style={{position: "absolute", left: "20px", top: "30%"}}>
            <div className="panel-body">
                <h1>Apollo 11</h1>
                <p>One small step for man, one giant leap for mankind.</p>
                <Link className="btn btn-lg btn-primary" to="/stories?mission=apollo11">Launch</Link>
            </div>
          </div>

          <div className="fade-to-black up" style={{position: "absolute", left: 0, bottom: 0, width: "100%", height: "50%"}} />
        </div>
      </div>
    );

    /*
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
            <div className="col-sm-4">
              <img style={{maxWidth: "100%"}} src="https://exploreapollo-data.s3.amazonaws.com/static-photos/apollo11.jpg" />
            </div>

            <div className="col-sm-8">
              <h1>Apollo 11</h1>
              <p>One small step for man, one giant leap for mankind.</p>

              <h2>Featured Stories</h2>
              <ul style={{listStyleType: "none", padding: 0}}>
                <li><a href="/"><i className="glyphicon glyphicon-play-circle" style={{fontSize: "1.75em", verticalAlign: "bottom", paddingRight: "0.5em"}} />asdf</a></li>
                <li><a href="/"><i className="glyphicon glyphicon-play-circle" style={{fontSize: "1.75em", verticalAlign: "bottom", paddingRight: "0.5em"}} />asdf</a></li>
                <li><a href="/"><i className="glyphicon glyphicon-play-circle" style={{fontSize: "1.75em", verticalAlign: "bottom", paddingRight: "0.5em"}} />asdf</a></li>
                <li><a href="/"><i className="glyphicon glyphicon-play-circle" style={{fontSize: "1.75em", verticalAlign: "bottom", paddingRight: "0.5em"}} />asdf</a></li>
              </ul>

              <Link className="btn btn-lg btn-primary" to="/stories?mission=apollo11">Launch</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    */

    /*
    return (
      <div className="container">
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
    );*/
  }
}
