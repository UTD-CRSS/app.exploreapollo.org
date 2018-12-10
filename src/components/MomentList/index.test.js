/*eslint-env jest*/
import React from "react";
import { shallow, mount } from "enzyme";

import MomentList, {MomentListItem} from "./index";

describe("MomentList Component", function () {
  it("should display an error message if no moments", function () {
    var list = mount(<MomentList moments={[]} />);
    expect(list.text()).toBe("No Moments");
  });

  it("should display a list of moments", function () {
    const list = mount(<MomentList moments={[
      {id: 1, title: "m1"},
      {id: 2, title: "m2"}
    ]} />);
    expect(list.find("h2").map(node => node.text())).toEqual(["m1", "m2"]);
  });
});

describe("MomentListItem Component", function () {
  it("should display a title", function() {
    var item = shallow(<MomentListItem id={1} title="Woo" />);
    expect(item.find("h2").text()).toBe("Woo");
  });
});
