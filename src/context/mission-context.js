import React, { useState, createContext } from "react";

// Create the Context Object
export const MissionContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const MissionContextProvider = (props) => {
  const [mission, setMission] = useState(0);

  return (
    <MissionContext.Provider value={[mission, setMission]}>
      {props.children}
    </MissionContext.Provider>
  );
};
