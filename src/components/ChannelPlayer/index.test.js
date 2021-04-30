import React from "react";
import { mount } from "enzyme";
import { ChannelPlayer } from "./index";
import { expect } from "chai";
describe("ChannelPlayer", () => {
  it("allows us to set props", () => {
    const wrapper = mount(<ChannelPlayer title="testing" />);
    expect(wrapper.props().title).to.equal("testing");
    wrapper.setProps({ title: "apollo" });
    expect(wrapper.props().title).to.equal("apollo");
  });
});
