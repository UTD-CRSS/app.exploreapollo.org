import React, {Component} from "react";
import {keys} from "lodash";

export class MomentListItem extends Component {
  render() {
    const {id, title} = this.props;
    return (
      <div>
        <h2>{title}</h2>
        <p>
          <div style={{ marginTop: "2em" }}>
            <button className="btn btn-primary btn-lg">
              <a href={`/moments/moment/${id}`}> Launch</a>
            </button>
          </div>
        </p>
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
