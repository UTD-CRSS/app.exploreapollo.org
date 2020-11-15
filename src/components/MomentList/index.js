import React, {Component} from "react";
import {keys} from "lodash";

export class MomentListItem extends Component {
  render() {
    const {id, title} = this.props;
    return (
      <div className="panel panel-default">
      <div className="panel-body" id="momentlist-itembox">
        <h2 style={{ marginTop: "1em", marginLeft: "0.5em"}}>{title}</h2>
        <div>
          <div style={{ marginTop: "1em", marginLeft: "1em" }}>
            <button className="btn btn-lg momentStoryButton" style={{marginBottom: "0.5em"}}>
              <a href={`/moments/moment/${id}`}> Launch</a>
            </button>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export class MomentList extends Component {
  renderList() {
    const {moments} = this.props;
    if (!moments || moments.length < 1) {
      return (
        <div className="alert alert-info">No Moments</div>
      );
    }

    return keys(moments).map((index) => {
      return (
        <MomentListItem
          key={moments[index].id}
          id={moments[index].id}
          title={moments[index].title} />
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderList()}
      </div>
    );
  }
}
