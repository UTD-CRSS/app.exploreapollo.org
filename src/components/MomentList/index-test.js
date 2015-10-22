/*eslint-env mocha*/
import {assert} from "chai";
import React from "react";
import MomentList, {MomentListItem} from "./index";
import testTree from "react-test-tree";

describe("MomentList Component", function () {
  it("should display an error message if no moments", function () {
    var list = testTree(<MomentList moments={[]} />);
    assert.equal(list.errorMessage.innerText, "No Moments");
  });

  it("should display a list of moments", function () {
    var list = testTree(<MomentList moments={[
      {id: 1, title: "m1"},
      {id: 2, title: "m2"}
    ]} />);
    assert.equal(list.listContainer.length, 2);
    assert.equal(list.listContainer[0].momentTitle.innerText, "m1");
    assert.equal(list.listContainer[1].momentTitle.innerText, "m2");
  });
});

describe("MomentListItem Component", function () {
  var item = testTree(<MomentListItem id={1} title="Woo" />);
  it("should display a title", function() {
    assert.equal(item.momentTitle.innerText, "Woo");
  });
});
