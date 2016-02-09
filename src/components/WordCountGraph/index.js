import React, {Component} from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import Dimensions from "react-dimensions";
import {VictoryChart, VictoryLine} from "victory";

class WordCountGraph extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const {data, containerWidth} = this.props;

    if (data.size < 1) {
      return <p className="text-center text-muted">No Data Yet</p>;
    }

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
}

export default Dimensions()(WordCountGraph);
