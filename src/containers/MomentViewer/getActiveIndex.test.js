/*eslint-env jest*/
import getActiveIndex from "./getActiveIndex";

describe("MomentViewer Container", function () {
  describe("getActiveIndex", function () {
    it("should return -1 when given invalid data", function () {
      expect(getActiveIndex(null, 1)).toBe(-1);
      expect(getActiveIndex(false, 1)).toBe(-1);
      expect(getActiveIndex({}, 1)).toBe(-1);
    });
    it("should return -1 when there are no transcripts", function () {
      expect(getActiveIndex([], 1)).toBe(-1);
    });
    it("should find nearest transcript index", function () {
      const items = [
        { metStart: 100 },
        { metStart: 200 },
        { metStart: 300 },
        { metStart: 400 },
        { metStart: 500 },
      ];
      expect(getActiveIndex(items, 250)).toBe(1);
      expect(getActiveIndex(items, 300)).toBe(2);
      expect(getActiveIndex(items, 500)).toBe(4);
      expect(getActiveIndex(items, 550)).toBe(4);
      expect(getActiveIndex(items, 0)).toBe(-1);
    });
  });
});
