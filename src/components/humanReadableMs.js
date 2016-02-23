import React from "react";
import Moment from "moment";

export default function HumanReadableMs({ms, date}) {
  // this is not correct timezone
  if (typeof ms === "string") {
    ms = parseInt(ms);
  }
  let format = "h:mm:ss a";
  if (date === true) {
    format = "MMM Do h:mm:ss a";
  }
  const startDate = -14552880 + ms/1000;
  return <span>
    {Moment(startDate, "X").format(format)}
  </span>;
}
