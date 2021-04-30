import React from "react";

import { Modal, Button } from "react-bootstrap";
import "./index.scss";
/**
 *  A simple popup for first time users to help them use our navigation page
 */

export function ChannelPlayerNavigatingInstruction(props) {
  var handleClosePopup = props.handleClosePopup;
  var showInstruction = props.showInstruction;
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showInstruction}
        onHide={handleClosePopup}
        dialogClassName=""
      >
        <Modal.Header closeButton>
          <Modal.Title
            className="message-title"
            id="contained-modal-title-vcenter"
          >
            How to navigate in playback page
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="message-body">
          <p>
            Thanks for visiting our page. Here are some tips for playing audios.
          </p>
          <ol>
            <li>To play all, click "Play All" button</li>
            <li>To play next parts of audio, click "Play Next" button</li>
            <li>
              To play previous parts of audio, click "Play Previous" button
            </li>
            <li>
              Note that when one of these two buttons is faded, it means there
              are no audios in next or previous part
            </li>
            <li>
              Toggle "Display Transcript" or "Hide Transcript" buttons to enable
              or disable transcripts for desired players
            </li>
            <p className="noted-message">
              Important: if you are experiencing performance issues, please hide
              some transripts, displaying up to 2 transcripts is ideal
            </p>
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <div className="btn-close-container">
            <Button variant="bigCentered" size="lg" onClick={handleClosePopup}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
