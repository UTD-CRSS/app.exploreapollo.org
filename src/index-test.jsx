/*eslint-env mocha*/
import {assert} from "chai";
import React from "react";
import {Dashboard, App} from "./index.jsx";
import testTree from "react-test-tree";

describe("Dashboard Component", function() {
  it("should exist", function() {
    // Render into document
    var app = testTree(<Dashboard />);
    assert.ok(app.isMounted());
  });
  it("should say hi", function () {
    var app = testTree(<Dashboard />);
    assert.equal(app.helloDiv.innerText, "Hello!");
  });
});

describe("App Component", function() {
  it("should have a correct title", function () {
    var app = testTree(<App />, {
      stub: {
        appRouteHandler: null
      }
    });
    assert.equal(app.appRouteTitle.innerText, "Apollo SPA");
  });
});
