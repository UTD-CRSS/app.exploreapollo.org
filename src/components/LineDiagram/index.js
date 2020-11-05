import React, {Component} from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import Dimensions from "react-dimensions";
import {Chart, Layer, Animate, Ticks, Lines, Dots} from "rumble-charts";
import * as D3 from "d3";

export class LineDiagram extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const {data, containerWidth, containerHeight} = this.props;
    //console.log("Data Line Diagram")
    //console.log(data)
    //console.log(containerWidth)

    //Don't render diagram without data
    if(data.series.every(datum => {return datum.value.size < 1;})) {
      return <p className="text-center text-muted">No Data Yet</p>;
    }

    //Data for the diagram
    const rawAll = data.series.map((datum => {return {name: datum.name, value: form(datum.value)};})).filter(datum => datum.value.length > 0);
    const diagramData = rawAll.map(datum => {return {data: datum.value.map(datum => {return Number(datum.data);})};});

    //Ticks for the diagram
    const lengths = rawAll.map(datum => datum.value.length);
    const rawSingle = rawAll[lengths.indexOf(Math.max.apply(Math, lengths))];
    const timeDelta = data.time-data.start;
    const progress = (timeDelta/(data.end-data.start))*100;
    const tickCurrent = (progress/100)*(rawSingle.value.length-1);
    const tickDistance = 0.001*(rawSingle.value.length-1);

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
              <Lines
                colors={D3.scaleOrdinal(D3.schemeCategory10)}
                opacity={1.0}
                asAreas={false}
                interpolation="monotone"
                seriesVisible={true}
                lineVisible={true}
                lineWidth={3}/>
              <Dots
                colors={D3.scaleOrdinal(D3.schemeCategory10)}
                opacity={1.0}
                dotType="circle"
                circleRadius={4}
                seriesVisible={true}/>
              <Ticks
                axis="x"
                opacity={1.0}
                position="bottom"
                tickVisible={({tick}) => tick.x>=tickCurrent && tick.x<tickCurrent+tickDistance}
                label={Math.round(timeDelta/1000)+"s"}
                labelVisible={true}
                labelAttributes={{y: 3}}
                labelStyle={{textAnchor:"middle",alignmentBaseline:"before-edge",fill:"#ff0000"}}
                lineVisible={true}
                lineStyle={{stroke:"#ff0000"}}
                lineLength="100%"
                lineOffset="-100%"
                ticks={{maxTicks:0,distance:tickDistance}}/>
            </Animate>
          </Layer>
        </Chart>
        <div style={{position: "center", fontSize: "1.2em", textAlign: "center"}}>
          {generateLegend(rawAll)}
        </div>
      </div>
    );
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
  return data.map((datum => {return { //removed data.map.toArray
    name: String(datum["met_start"]),
    data: [Number(datum["data"]["count"])]
  };})).sort(function(a, b) { //sort by met_start
    return a.name.localeCompare(b.name);
  }).filter((element, index, self) => self.findIndex((e) => { //remove duplicates
    return e.name === element.name;
  }) === index);
}

export default Dimensions()(LineDiagram);
