import React from "react";
import Moment from "moment";

export function HumanReadableMs({ms, date, year}) {
  // this is not correct timezone
  if (typeof ms === "string") {
    ms = parseInt(ms);
  }
  let format = "h:mm:ss a";
  if (date === true) {
    if (year === true) {
      format = "MMM Do, YYYY - h:mm:ss a";
    } else {
      format = "MMM Do h:mm:ss a";
    }
  }
  const startDate = -14552880 + ms/1000;
  return <span>
    {Moment(startDate, "X").format(format)}
  </span>;
}
