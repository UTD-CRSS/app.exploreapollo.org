/*eslint-env jest*/
import React from "react";
import { shallow } from "enzyme";

import { Dashboard } from "./index";

describe("Dashboard Component", function() {
  it("should exist", function() {
    // Render into document
    var app = shallow(<Dashboard />);
    expect(app.find("div.dashboard-container")).toHaveLength(1);
  });
});
