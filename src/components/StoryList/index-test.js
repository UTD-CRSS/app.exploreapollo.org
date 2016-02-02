/*eslint-env mocha*/
import {assert} from "chai";
import React from "react";
import StoryList, {StoryListItem} from "./index";
import testTree from "react-test-tree";

describe("StoryList Component", function () {
  it("should display an error message if no stories", function () {
    var list = testTree(<StoryList stories={[]} />);
    assert.equal(list.get("errorMessage").innerText, "No Stories");
  });

  it("should display a list of stories", function () {
    var list = testTree(<StoryList stories={[
      {id: 1, title: "m1"},
      {id: 2, title: "m2"}
    ]} />);
    assert.equal(list.get("storyListContainer").length, 2);
    assert.equal(
      list
        .get("storyListContainer")[0]
        .get("storyTitle")
        .innerText,
      "m1"
    );
    assert.equal(
      list
        .get("storyListContainer")[1]
        .get("storyTitle")
        .innerText,
      "m2"
    );
  });
});

describe("StoryListItem Component", function () {
  var item = testTree(<StoryListItem id={1} title="Woo" />);
  it("should display a title", function() {
    assert.equal(item.get("storyTitle").innerText, "Woo");
  });
});
