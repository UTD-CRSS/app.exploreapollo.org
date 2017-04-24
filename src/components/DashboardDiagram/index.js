import React, {Component} from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import Dimensions from "react-dimensions";
import {Chart, Bars, Ticks, Layer, Pies, Transform} from "rumble-charts";

class DashboardDiagram extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const {data, containerWidth} = this.props;

    if(data.size < 1) {return <p className="text-center text-muted">No Data Yet</p>;}

    const diagramData = [{data: data.toArray().map((datum) => {return Number(datum.getIn(["data", "count"]));})}];
    const diagramTicks = data.toArray().map((datum) => {return {name: String(datum.get("met_start"))};});

    return (
      <div style={{fontFamily:"sans-serif",fontSize:"0.8em"}}>
        <Chart
          width={containerWidth}
          height={containerWidth/4}
          series={diagramData}
          minY={0}
          scaleX={{paddingStart: 0, paddingEnd: 0}}
          scaleY={{paddingTop: 10}}>
          <Layer width='90%' height='90%'>
            <Layer width="66%" height="90%" position="left top">
              <Ticks
                axis="y"
                ticks={{maxTicks: 5}}
                tickVisible={({tick}) => tick.y >= 0}
                lineLength="100%"
                lineVisible={true}
                lineStyle={{stroke:"lightgray"}}
                labelStyle={{textAnchor:"end", alignmentBaseline:"middle", fill:["#33ff66"]}}
                labelAttributes={{x: -5}}/>
              <Ticks
                axis="x"
                ticks={{maxTicks: -1}}
                cticks={diagramTicks}
                label={({index, props}) => props.cticks[index].name}
                labelStyle={{textAnchor:"middle", alignmentBaseline:"before-edge", fill:["#33ff66"]}}
                labelAttributes={{y: 3}}/>
              <Bars
                colors={["#33ff66"]}
                groupPadding="3%"
                innerPadding="0.5%"/>
            </Layer>
            <Layer width='33%' height='90%' position='right top'>
              <Transform method={["transpose", "stack"]}>
                <Pies combined={true} />
              </Transform>
            </Layer>
          </Layer>
        </Chart>
      </div>);
  }
}

export default Dimensions()(DashboardDiagram);
