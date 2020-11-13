/*eslint-env jest*/
import React from "react";
import { shallow } from "enzyme";
import {PlayButton} from "./index";

describe("MomentPlayer", () => {
  describe("PlayButton", function () {
    it("should show a play icon when paused", function () {
      const button = shallow(<PlayButton isPlaying={false} />);
      expect(button.find("img").hasClass("play")).toBe(true);
      expect(button.find("img").hasClass("pause")).toBe(false);
    });
    it("should show a pause while playing", function () {
      const button = shallow(<PlayButton isPlaying={true} />);
      expect(button.find("img").hasClass("pause")).toBe(true);
      expect(button.find("img").hasClass("play")).toBe(false);
    });
  });
});
