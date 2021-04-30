/*eslint-env jest*/
import React /*, { Component } */ from "react";
import { /*render,*/ shallow } from "enzyme";

import { /*App, */ AppHeader, AppFooter } from "./index";

// class AppWithChild extends Component {
//   render () {
//     return (
//       <App>
//         <div>woo</div>
//       </App>
//     );
//   }
// }

// This test will fail because render is not compatible with a component that contains any images
// This is a problem with Enzyme. Until it is fixed, there's no solution.

// describe("App Container", function() {
//   it("should display children", function () {
//     var app = render(<AppWithChild />);
//     expect(app.find("div.app-panel").text()).toBe("woo");
//   });
describe("Header", function () {
  it("should display header", function () {
    var app = shallow(<AppHeader />);
    expect(app.find("Link.inTheNews").text()).toBe("In the News");
  });
});
describe("Footer", function () {
  it("should display footer", function () {
    var app = shallow(<AppFooter />);
    expect(app.find("p.footer-text").text()).toBe(
      "ExploreApollo.org uses signal, speech and language processing algorithms to extract new information, merge information sources, and provide a new perspective on the NASA Apollo missions."
    );
  });
});
