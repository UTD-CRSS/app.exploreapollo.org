/*eslint-env mocha*/
import {assert} from "chai";
import React from "react";
import {PlayButton} from "./index";
import testTree from "react-test-tree";
import {hasClass} from "test/utils";

describe("Play Button", function () {
  it("should show a play icon when paused", function () {
    const button = testTree(<PlayButton isPlaying={false} />);
    assert(
      hasClass(button, "playIcon", "glyphicon-play"),
      "doesn't have glyphicon-play class"
    );
    assert(
      !hasClass(button, "playIcon", "glyphicon-pause"),
      "has class pause while not playing"
    );
  });
  it("should show a pause while playing", function () {
    const button = testTree(<PlayButton isPlaying={true} />);
    assert(
      hasClass(button, "playIcon", "glyphicon-pause"),
      "doesn't have glyphicon-pause class"
    );
    assert(
      !hasClass(button, "playIcon", "glyphicon-play"),
      "has class play while playing"
    );
  });
});
