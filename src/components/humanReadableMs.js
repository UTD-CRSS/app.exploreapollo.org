import React from "react";
import Moment from "moment";

export default function HumanReadableMs({ms}) {
  // this is not correct timezone
  if (typeof ms === "string") {
    ms = parseInt(ms);
  }
  const startDate = -14552880 + ms/1000;
  return <span>
    {Moment(startDate, "X").format("h:mm:ss a")}
  </span>;
}
