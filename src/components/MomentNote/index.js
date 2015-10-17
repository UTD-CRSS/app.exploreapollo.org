import React, {Component} from "react";
import classNames from "classnames";

export class MomentNoteItem extends Component {
  render() {
    const {title, text, image} = this.props;
    return (
      <div>
        <h1 ref="momentNoteTitle">
          {title}
        </h1>
        {!!image &&
          <img ref="momentNoteImage" src={image} />
        }
        <p ref="momentNoteText">
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
          image={note.image}
          text={note.text} />
      );
    });
  }

  render() {
    const classes = classNames("col-md-6", "moment-note-container");
    return (
      <div refCollection="momentNoteContainer" className={classes}>
        {this.renderList()}
      </div>
    );
  }
}