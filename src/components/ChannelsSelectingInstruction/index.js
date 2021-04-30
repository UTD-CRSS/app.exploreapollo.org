import React from "react";

import { Modal, Button } from "react-bootstrap";
import "./index.scss";
/**
 *  A simple popup for first time users to help them use our navigation page
 */

export function ChannelsSelectingInstruction(props) {
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
            How to Select Channelss
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="message-body">
          <p>
            Thanks for visiting our page. Here are some tips for playing audios.
          </p>
          <ol>
            <li>First select a tape.</li>
            <li>
              Then select up to 3 channels which only appear after a tape is
              selected.
            </li>
            <li>
              Then select the audio block and nugget. There are 6 nuggets in a
              block of audio, a block is usally 30-minute long.
            </li>
            <li>And finally hit play!</li>
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
