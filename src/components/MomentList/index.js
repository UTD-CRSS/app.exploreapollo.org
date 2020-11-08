import React, {Component} from "react";
import {Link} from "react-router-dom";
import {keys} from "lodash";

export class MomentListItem extends Component {
  render() {
    const {id, title} = this.props;
    return (
      <div>
        <h2 testref="momentTitle">{title}</h2>
        <p>
          <Link
            testref="momentLink"
            to={`/moments/moment/${id}`}>
            Launch
          </Link>
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
        <div testref="errorMessage" className="alert alert-info">No Moments</div>
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
      <div testrefcollection="listContainer">
        {this.renderList()}
      </div>
    );
  }
}
