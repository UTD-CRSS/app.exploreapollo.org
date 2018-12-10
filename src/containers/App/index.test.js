/*eslint-env jest*/
import React, { Component } from "react";
import { render } from "enzyme";

import App, {AppHeader} from "./index";

class AppWithChild extends Component {
  render () {
    return (
      <App>
        <div>woo</div>
      </App>
    );
  }
}

describe("App Container", function() {
  it("should display children", function () {
    var app = render(<AppWithChild />);
    expect(app.find("div.app-panel").text()).toBe("woo");
  });
  describe("Header", function() {
    it("should display header", function() {
      var app = render(<AppHeader />);
      expect(app.find("a.navbar-brand").text()).toBe("Explore Apollo");
    });
  });
});
