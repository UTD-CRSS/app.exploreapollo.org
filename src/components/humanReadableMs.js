import React from "react";
import Moment from "moment";

export default function HumanReadableMs({ms}) {
  // this is not correct timezone
  if (typeof ms === "string") {
    ms = parseInt(ms);
  }
  const startDate = new Date(-14552880 + ms);
  return <span>
    {Moment(startDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
  </span>;
}
