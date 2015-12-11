/*eslint-env mocha*/
import {assert} from "chai";
import React, {Component} from "react";
import App, {AppHeader} from "./index";
import testTree from "react-test-tree";

class AppWithChild extends Component {
  render () {
    return (
      <App testRef="appComponentParent">
        <div testRef="appContent">woo</div>
      </App>
    );
  }
}

describe("App Container", function() {
  it("should display children", function () {
    var app = testTree(<AppWithChild />);
    assert.equal(
      app
        .get("appContent")
        .innerText,
      "woo"
    );
  });
  describe("Header", function() {
    it("should display header", function() {
      var app = testTree(<AppHeader />);
      assert.equal(
        app
          .get("appRouteTitle")
          .innerText,
        "Explore Apollo"
      );
    });
  });
});
