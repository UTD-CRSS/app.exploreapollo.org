import React from "react";
import Dimensions from "react-dimensions";
import {VictoryChart, VictoryLine} from "victory";

function WordCountGraph({data, containerWidth}) {
  const chartData = data.toArray().map((datum) => {
    return {
      x: datum.get("met_start"),
      y: Number(datum.getIn(["data", "count"]))
    };
  });

  return (<VictoryChart width={containerWidth}
                        height={containerWidth/(16/4)}>
    <VictoryLine data={chartData} />
  </VictoryChart>);
}

export default Dimensions()(WordCountGraph);
