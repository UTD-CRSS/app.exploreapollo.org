/*eslint-env jest*/
import React from "react";
import { shallow, mount } from "enzyme";

import { MomentNote, MomentNoteItem} from "./index";

describe("MomentNote Component", function() {
  it("shows no notes alert if none", function () {
    var momentNote = shallow(<MomentNote note={[]} />);
    expect(momentNote.text()).toBe("No Notes");
  });

  it("should display a list of moment notes", function () {
    const momentNote = mount(
      <MomentNote note={[
        {id: 1, title: "title1", text: "text1"},
        {id: 2, title: "title2", text: "text2"},
        {id: 3, title: "title3", text: "text3", image: "http://i.imgur.com/6GpbyFW.gif"}
      ]} />
    );

    expect(momentNote.find(".moment-note-container").children()).toHaveLength(3);
    const firstItem = momentNote.find(".moment-note-container").childAt(0);
    expect(firstItem.find("p").text()).toBe("text1");
    const secondItem = momentNote.find(".moment-note-container").childAt(1);
    expect(secondItem.find("p").text()).toBe("text2");
    expect(secondItem.exists("img")).toBe(false);
    const thirdItem = momentNote.find(".moment-note-container").childAt(2);
    expect(thirdItem.find("p").text()).toBe("text3");
    expect(thirdItem.exists("img")).toBe(true);
    expect(thirdItem.find("img").props()).toHaveProperty("src", "http://i.imgur.com/6GpbyFW.gif");
  });
});

describe("MomentNoteItem Component", function () {
  it("should display a title", function() {
    const item = shallow(
      <MomentNoteItem id={1} title="gary oak" text="text" />
    );
    expect(item.find("h1").text()).toBe("gary oak");
  });

  it("should display text", function() {
    const item = shallow(
      <MomentNoteItem id={1} title="gary oak" text="text" />
    );
    expect(item.find("p").text()).toBe("text");
  });

  it("should not have image if there isn't one", function() {
    const item = shallow(
      <MomentNoteItem id={1} title="gary oak" text="text" />
    );
    expect(item.find("img")).toHaveLength(0);
  });

  it("should have image if there is one", function() {
    const itemWithImage = shallow(
      <MomentNoteItem
        id={1}
        title="gary oak"
        text="text"
        image="http://i.imgur.com/6GpbyFW.gif"
      />
    );
    const itemImage = itemWithImage.find("img");
    expect(itemImage).toHaveLength(1);
    expect(itemImage.props()).toHaveProperty("src", "http://i.imgur.com/6GpbyFW.gif");
  });
});
