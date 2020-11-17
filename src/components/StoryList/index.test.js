/*eslint-env jest*/
import React from "react";
import { mount } from "enzyme";

import { StoryList, StoryListItem} from "./index";

describe("StoryList Component", function () {
  it("should display an error message if no stories", function () {
    var list = mount(<StoryList stories={[]} />);
    expect(list.find(".alert").text()).toBe("No Stories");
    expect(list.find(".alert").hasClass("alert-info")).toBe(true);
  });

  it("should display a list of stories", function () {
    var list = mount(<StoryList stories={[
      {id: 1, title: "m1"},
      {id: 2, title: "m2"}
    ]} />);
    expect(list.find("div").at(0).children()).toHaveLength(2);
    expect(list.find("h2").map(node => node.text())).toEqual(["m1", "m2"]);
  });
});

describe("StoryListItem Component", function () {
  var item = mount(<StoryListItem id={1} title="Woo" />);
  it("should display a title", function() {
    expect(item.find("h2").text()).toBe("Woo");
  });
});
