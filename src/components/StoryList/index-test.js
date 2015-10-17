/*eslint-env mocha*/
import {assert} from "chai";
import React from "react";
import StoryList, {StoryListItem} from "./index";
import testTree from "react-test-tree";

describe("StoryList Component", function () {
  it("should display an error message if no stories", function () {
    var list = testTree(<StoryList stories={[]} />);
    assert.equal(list.errorMessage.innerText, "No Stories");
  });

  it("should display a list of stories", function () {
    var list = testTree(<StoryList stories={[
      {id: 1, title: "m1"},
      {id: 2, title: "m2"}
    ]} />);
    assert.equal(list.storyListContainer.length, 2);
    assert.equal(list.storyListContainer[0].storyTitle.innerText, "m1");
    assert.equal(list.storyListContainer[1].storyTitle.innerText, "m2");
  });
});

describe("StoryListItem Component", function () {
  var item = testTree(<StoryListItem id={1} title="Woo" />);
  it("should display a title", function() {
    assert.equal(item.storyTitle.innerText, "Woo");
  });
  it("should have a link to the story", function () {
    assert.equal(item.storyLink.getAttribute("href"), "#/stories/story/1");
  });
});
