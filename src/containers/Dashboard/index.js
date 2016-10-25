import React, {Component} from "react";
import {Link} from "react-router";

class FeaturedStoryLink extends Component {
  render() {
    return (
      <a href={this.props.to} style={{color: "#fff"}}>
        <i className="glyphicon glyphicon-play-circle" style={{fontSize: "1.75em", verticalAlign: "bottom", paddingRight: "0.5em"}} />
        {this.props.text}
      </a>
    );
  }
}

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <div className="container-fluid hidden-xs" style={{padding: 0, marginBottom: "2em"}}>
          <div className="mission-selector">
            <img src="https://s3.amazonaws.com/exploreapollo-data/static-photos/apollo-11-astronaut.jpg" alt="Apollo 11" style={{display: "block", width: "100%", maxWidth: "1600px", margin: "0 auto"}} />

            <div className="panel panel-default" style={{position: "absolute", left: "20px", top: "30%", maxWidth: "35%"}}>
              <div className="panel-body">
                  <h1 style={{marginTop: 0}}>Apollo 11</h1>
                  <p>One small step for man, one giant leap for mankind.</p>
                  <Link className="btn btn-lg btn-primary" to="/stories?mission=apollo11">Launch</Link>
              </div>
            </div>

            <div className="fade-to-black up" style={{position: "absolute", left: 0, bottom: 0, width: "100%", height: "50%"}} />
          </div>
        </div>

        <div className="container">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="row">
                <div className="col-sm-5">
                  <img style={{maxWidth: "100%"}} src="https://exploreapollo-data.s3.amazonaws.com/static-photos/apollo11.jpg" />
                </div>

                <div className="col-sm-7">
                  <h1>Apollo 11</h1>
                  <p>One small step for man, one giant leap for mankind.</p>

                  <h2>Featured Stories</h2>
                  <ul className="featured-stories">
                    <li><FeaturedStoryLink text="Apollo Launch" to="/stories/story/1" /></li>
                    <li><FeaturedStoryLink text="Lunar Landing" to="/stories/story/2" /></li>
                    <li><FeaturedStoryLink text="Moon Surface Walk" to="/stories/story/3" /></li>
                    <li><FeaturedStoryLink text="Apollo Touchdown" to="/stories/story/4" /></li>
                  </ul>

                  <Link className="btn btn-lg btn-primary" to="/stories?mission=apollo11" style={{marginTop: "1em"}}>Launch</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
