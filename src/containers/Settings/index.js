import React, {Component} from "react";
import config from "../../../config";

function ListItem({title, value}) {
  return (
    <div key={title} className="list-group-item">
      <h4 className="list-group-item-heading">{title}</h4>
      <p className="list-group-item-text">{value}</p>
    </div>
  );
}

function getGitHubURL(commit) {
  if (commit === "none") {
    return commit;
  }
  return (<a href={`${config.GitHubRepo}/tree/${commit}`}>{commit}</a>);
}

function getTravisBuildURL(id) {
  if (id === "N/A") {
    return id;
  }
  return (<a href={`${config.TravisBaseURL}/builds/${id}`}>Build {id}</a>);
}

export class Settings extends Component {
  render() {
    const info = [
      {title: "Git Commit", value: getGitHubURL(process.env.COMMIT)},
      {
        title: "Travis Build",
        value: getTravisBuildURL(process.env.TRAVIS_BUILD_ID)
      }
    ];
    const configuration = [
      {title: "API Entry Point", value: config.apiEntry}
    ];
    return (<div>
      <div className="panel panel-default">
        <div className="panel-heading">Info</div>
        <div className="list-group">
          {info.map(ListItem)}
        </div>
      </div>
      <div className="panel panel-default">
        <div className="panel-heading">Configuration</div>
        <div className="list-group">
          {configuration.map(ListItem)}
        </div>
      </div>
    </div>);
  }
}
