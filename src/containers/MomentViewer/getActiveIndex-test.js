// Tests
/*eslint-env mocha*/
import getActiveIndex from "./getActiveIndex";
import {assert} from "chai";
import {fromJS} from "immutable";

describe("MomentViewer Container", function () {
  describe("getActiveIndex", function () {
    it("should return -1 when given invalid data", function () {
      assert.equal(getActiveIndex(null, 1), -1);
      assert.equal(getActiveIndex(false, 1), -1);
      assert.equal(getActiveIndex({}, 1), -1);
    });
    it("should return -1 when there are no transcripts", function () {
      assert.equal(getActiveIndex([], 1), -1);
    });
    it("should find nearest transcript index", function () {
      const items = fromJS([
        {metStart: 100},
        {metStart: 200},
        {metStart: 300},
        {metStart: 400},
        {metStart: 500}
      ]);
      assert.equal(
        getActiveIndex(items, 250),
        1
      );
      assert.equal(
        getActiveIndex(items, 300),
        2
      );
      assert.equal(
        getActiveIndex(items, 500),
        4
      );
      assert.equal(
        getActiveIndex(items, 550),
        4
      );
      assert.equal(
        getActiveIndex(items, 0),
        -1
      );
    });
  });
});
