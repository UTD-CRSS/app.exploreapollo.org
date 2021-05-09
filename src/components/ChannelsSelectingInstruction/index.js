import React from "react";

import { Modal, Button } from "react-bootstrap";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

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
            How to Select Channels
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="message-body">
          <p>
            Thanks for visiting our page. Here are some tips for selecting
            audios.
          </p>
          <ol>
            <li>First select a tape.</li>
            <li>
              Then select up to 3 channels belonging to the selected tape which
              only appear after a tape is selected.
            </li>
            <li>
              By default, when clicking <strong>Play Random</strong> button, the
              audio player will play random audio files belonging to selected
              tape and channels
            </li>
            <li>
              However, if you want more control of what to be played, select
              <strong> Advanced Options</strong> button
            </li>
            <li>
              Select the audio block and nugget numbers. Block and nugget are
              explained in details when you hover or click
              <span className="mx-2">
                <FontAwesomeIcon className="info-button" icon={faInfo}/>
              </span>
              button next to each of them
            </li>
            <li>
              Finally, hit <strong>Play</strong>
            </li>
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
