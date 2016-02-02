/*eslint-env mocha*/
import {assert} from "chai";
import React from "react";
import MomentNote, {MomentNoteItem} from "./index";
import testTree from "react-test-tree";

describe("MomentNote Component", function() {
  it("shows no notes alert if none", function () {
    var momentNote = testTree(<MomentNote note={[]} />);
    assert.equal(
      momentNote
        .get("errorMessage")
        .innerText,
      "No Notes"
    );
  });
  it("should display a list of moment notes", function () {
    var momentNote = testTree(<MomentNote note={[
      {id: 1, title: "title1", text: "text1"},
      {id: 2, title: "title2", text: "text2"},
      {id: 3, title: "title3", text: "text3", image: "http://i.imgur.com/6GpbyFW.gif"}
    ]} />);
    assert.equal(
      momentNote.get("momentNoteContainer").length,
      3
    );
    assert.equal(
      momentNote
        .get("momentNoteContainer")[0]
        .get("momentNoteText").innerText,
      "text1"
    );

    assert.equal(
      momentNote
        .get("momentNoteContainer")[1]
        .get("momentNoteText")
        .innerText,
      "text2"
    );
    assert.isUndefined(
      momentNote
        .get("momentNoteContainer")[1]
        .get("momentNoteImage"),
      "image is not defined"
    );

    assert.equal(
      momentNote
        .get("momentNoteContainer")[2]
        .get("momentNoteText").innerText,
      "text3"
    );
    assert.isDefined(
      momentNote
        .get("momentNoteContainer")[2]
        .get("momentNoteImage"),
      "image is defined"
    );
    assert.equal(
      momentNote
        .get("momentNoteContainer")[2]
        .get("momentNoteImage")
        .getAttribute("src"),
      "http://i.imgur.com/6GpbyFW.gif"
    );
  });
});

describe("MomentNoteItem Component", function () {
  var item = testTree(
    <MomentNoteItem id={1} title="gary oak" text="text" />
  );
  it("should display a title", function() {
    assert.equal(
      item
        .get("momentNoteTitle").innerText,
      "gary oak"
    );
  });
  it("should display text", function() {
    assert.equal(
      item
        .get("momentNoteText")
        .innerText,
      "text"
    );
  });
  it("should not have image if there isn't one", function() {
    assert.isUndefined(
      item.get("momentNoteImage"),
      "image is undefined"
    );
  });
  var itemWithImage = testTree(<MomentNoteItem id={1} title="gary oak" text="text" image="http://i.imgur.com/6GpbyFW.gif" />);
  it("should have image if there is one", function() {
    assert.isDefined(itemWithImage.get("momentNoteImage"), "image is defined");
    assert.equal(itemWithImage.get("momentNoteImage").getAttribute("src"), "http://i.imgur.com/6GpbyFW.gif");
  });
});
