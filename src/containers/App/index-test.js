/*eslint-env mocha*/
import {assert} from "chai";
import React, {Component} from "react";
import App from "./index";
import testTree from "react-test-tree";

class AppWithChild extends Component {
  render () {
    return (
      <App ref="appComponentParent">
        <div ref="appContent">woo</div>
      </App>
    );
  }
}

describe("App Component", function() {
  it("should have a correct title", function () {
    var app = testTree(<AppWithChild />);
    assert.equal(app.appComponentParent.appRouteTitle.innerText, "Apollo SPA");
  });
  it("should display children", function () {
    var app = testTree(<AppWithChild />);
    assert.equal(app.appContent.innerText, "woo");
  });
});
