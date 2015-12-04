import React, {Component} from "react";
import {Link} from "react-router";
import {keys} from "lodash";

export class MomentListItem extends Component {
  render() {
    const {id, title} = this.props;
    return (
      <div>
        <h2 ref="momentTitle">{title}</h2>
        <p>
          <Link
            ref="momentLink"
            to={`/moments/moment/${id}`}>
            Launch
          </Link>
        </p>
      </div>
    );
  }
}

export default class MomentList extends Component {
  renderList() {
    const {moments} = this.props;
    if (!moments || moments.length < 1) {
      return (
        <div ref="errorMessage" className="alert alert-info">No Moments</div>
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
      <div refCollection="listContainer">
        {this.renderList()}
      </div>
    );
  }
}
