/*eslint-env jest*/
jest.dontMock("../index.jsx");
const React = require("react/addons");
const TestUtils = React.addons.TestUtils;
const Dashboard = require("../index.jsx").Dashboard;

describe("Dashboard", function() {
  it("should exist", function() {
    // Render into document
    var app = TestUtils.renderIntoDocument( <Dashboard /> );
    expect(TestUtils.isCompositeComponent(app)).toBeTruthy();
  });
  it("should say hi", function () {
    var app = TestUtils.renderIntoDocument( <Dashboard /> );
    var div = TestUtils.findRenderedDOMComponentWithTag(app, "div");
    expect(React.findDOMNode(div).textContent).toEqual("Hello!");
  });
});
