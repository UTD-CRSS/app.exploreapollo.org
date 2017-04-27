import React, {Component} from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import Dimensions from "react-dimensions";
import {Chart, Bars, Ticks, Layer, Animate, Pies, Transform} from "rumble-charts";
import * as D3 from "d3";

class DashboardDiagram extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const {data, containerWidth} = this.props;

    //Don't render diagram without data
    if(data.series.every(datum => {return datum.value.size < 1;})) {
      return <p className="text-center text-muted">No Data Yet</p>;
    }

    //Data for the diagram
    const rawAll = data.series.map((datum => {return {name: datum.name, value: form(datum.value)};})).filter(datum => datum.value.length > 0);
    const lengths = rawAll.map(datum => datum.value.length);
    const rawSingle = rawAll[lengths.indexOf(Math.max.apply(Math, lengths))];
    const diagramData = rawAll.map(datum => {return {data: datum.value.map(datum => {return Number(datum.data);})};});
    const diagramTicks = rawSingle.value.map(datum => {return {name: String((datum.name-rawSingle.value[0].name)/1000)};});

    return (
      <div style={{fontFamily:"sans-serif",fontSize:"0.8em"}}>
        <Chart
          width={containerWidth}
          height={containerWidth/4}
          series={diagramData}
          minX={0}
          minY={0}
          scaleX={{paddingStart:0,paddingEnd:0}}
          scaleY={{paddingTop:5}}>
          <Layer
            width="90%"
            height="90%"
            position="center">
            <Layer
              width="66%"
              height="90%"
              position="left top">
              <Animate
                ease="linear"
                duration={1}>
                <Ticks
                  axis="y"
                  opacity={1.0}
                  position="left"
                  tickVisible={({tick}) => tick.y>=0}
                  labelVisible={true}
                  labelAttributes={{x: -10}}
                  labelStyle={{textAnchor:"end",alignmentBaseline:"middle",fill:["#d3d3d3"]}}
                  lineVisible={true}
                  lineStyle={{stroke:"#d3d3d3"}}
                  lineLength="100%"
                  lineOffset={0}
                  ticks={{maxTicks:5}}/>
                <Ticks
                  axis="x"
                  opacity={1.0}
                  position="bottom"
                  label={"Time"}
                  labelVisible={true}
                  labelAttributes={{y:3}}
                  labelStyle={{alignmentBaseline:"before-edge",fill:"#d3d3d3"}}
                  lineVisible={false}
                  lineStyle={{stroke:"#d3d3d3"}}
                  lineLength="100%"
                  lineOffset={0}
                  ticks={{maxTicks:0}}
                  cticks={diagramTicks}/>
                <Bars
                  colors={D3.scaleOrdinal(D3.schemeCategory10)}
                  opacity={1.0}
                  combined={false}
                  groupPadding="4px"
                  seriesVisible={true}
                  barVisible={true}/>
              </Animate>
            </Layer>
            <Layer width='33%' height='90%' position='right top'>
              <Transform method={["transpose", "stack"]}>
                <Pies combined={true} />
              </Transform>
            </Layer>
          </Layer>
        </Chart>
        <div style={{position: "center", fontSize: "1.2em", textAlign: "center"}}>
          {generateLegend(rawAll)}
        </div>
      </div>);
  }
}

//Generate the legend based on the current data
function generateLegend(data) {
  var result = [];
  data.map((datum, index) => result.push(<span key={index} style={{color:D3.schemeCategory10[index]}}>&emsp;{datum.name}&emsp;</span>));
  return result;
}

//Parse data into format needed by the diagrams
function form(data) {
  return data.toArray().map((datum => {return {
    name: String(datum.get("met_start")),
    data: [Number(datum.getIn(["data", "count"]))]
  };})).sort(function(a, b) { //sort by met_start
    return a.name.localeCompare(b.name);
  }).filter((element, index, self) => self.findIndex((e) => { //remove duplicates
    return e.name === element.name;
  }) === index);
}

export default Dimensions()(DashboardDiagram);
