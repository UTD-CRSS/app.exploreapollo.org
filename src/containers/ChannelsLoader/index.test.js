import React from "react";
import {mount } from "enzyme";
import {Route,  Switch, BrowserRouter as Router} from"react-router-dom";

import { ChannelsLoader, Channels} from "../index";

describe("ChannelsLoader", function () {
  it("should display an error message if no channels", function () {

    
    var loader = mount(
      <Router>
        <Switch >
          <ChannelsLoader />
          <Route exact path="/channels/1" component={Channels} />
        </Switch>
      </Router>
      
      
    );
    expect(loader.find("div.error-message").text()).toBe("Error loading channels, please select channels to listen");


  });
});