import React, {Component} from "react";
import classNames from "classnames";

export class MomentNoteItem extends Component {
  render() {
    const {id, title, text} = this.props;
    return (
      <div>
        <h1>
          {title}
        </h1>
        <p>
          {text}
        </p>
      </div>
    );
  }
}

export default class MomentNote extends Component {
  renderList() {
    const {note} = this.props;
    if (!note || note.length < 1) {
      return (
        <div ref="errorMessage" className="alert alert-info">No Notes</div>
      );
    }

    return note.map((note) => {
      return (
        <MomentNoteItem
          key={note.id}
          id={note.id}
          title={note.title}
          text={note.text} />
      );
    });
  }

  render() {
    let classes = classNames('col-md-6');
    return (
      <div refCollection="momentNoteContainer" className={classes}>
        {this.renderList()}
      </div>
    );
  }
}