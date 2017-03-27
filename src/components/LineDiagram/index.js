import React, {Component} from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import Dimensions from "react-dimensions";
import {Chart, Layer, Animate, Ticks, Lines, Dots} from "rumble-charts";

class LineDiagram extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const {data, containerWidth} = this.props;

    //Make sure we actually have data before we try rendering any diagrams
    if(data.conversation.size < 1 && data.turn.size < 1 && data.word.size < 1) {return <p className="text-center text-muted">No Data Yet</p>;}

    //Parse the data into correct formats and use the longest data array for the axis
    //Order of data array must match the legend order!!!
    //TODO allow any order and match legend to correct data[] array
    const rawAll = [form(data.conversation), form(data.turn), form(data.word)];
    const lengths = rawAll.map(function(a){return a.length;});
    const rawSingle = rawAll[lengths.indexOf(Math.max.apply(Math, lengths))];

    //Construct the data elements for the diagram and set the axis window
    //TODO allow arbitrary size
    const diagramData = [
      {data: rawAll[0].map(function(index) {return Number(index.data);})},
      {data: rawAll[1].map(function(index) {return Number(index.data);})},
      {data: rawAll[2].map(function(index) {return Number(index.data);})}
    ];
    const diagramTicks = rawSingle.map(function(index) {return {name: String((index.name-rawSingle[0].name)/1000)};});
    const window = (data.time-rawSingle[0].name)/(rawSingle[rawSingle.length-1].name-rawSingle[0].name)*(rawSingle.length-1);

    //TODO colors need to be arbitrary
    //TODO dot colors dont match line colors when data is missing
    //TODO fix weird flickering caused by long animation durations
    return (
      <div style={{fontFamily:"sans-serif",fontSize:"0.8em"}}>
        <Chart
          width={containerWidth}
          height={containerWidth/4}
          series={diagramData}
          minX={window}
          minY={0}
          maxX={window+1}
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
                axis="x"
                opacity={1.0}
                position="bottom"
                tickVisible={({tick}) => tick.x>=0}
                label={({index, props}) => props.cticks[index].name}
                labelVisible={false}
                labelAttributes={{y:3}}
                labelStyle={{textAnchor:"middle",alignmentBaseline:"before-edge",fill:"#d3d3d3"}}
                lineVisible={false}
                lineStyle={{stroke:"#d3d3d3"}}
                lineLength="100%"
                lineOffset={0}
                ticks={{maxTicks:-1}}
                cticks={diagramTicks}/>
              <Ticks
                axis="y"
                opacity={1.0}
                position="left"
                tickVisible={({tick}) => tick.y>=0}
                labelVisible={false}
                labelAttributes={{x: -5}}
                labelStyle={{textAnchor:"end",alignmentBaseline:"middle",fill:["#d3d3d3"]}}
                lineVisible={true}
                lineStyle={{stroke:"#d3d3d3"}}
                lineLength="200%"
                lineOffset={10}
                ticks={{maxTicks:5}}/>
              <Lines
                colors={["#FF0000","#00FF00","#0000FF"]}
                opacity={1.0}
                asAreas={false}
                interpolation="monotone"
                seriesVisible={true}
                lineVisible={true}
                lineWidth={3}/>
              <Dots
                colors={["#FF0000","#00FF00","#0000FF"]}
                opacity={1.0}
                dotType="circle"
                circleRadius={4}
                seriesVisible={true}/>
              <Ticks
                axis="y"
                opacity={1.0}
                position="left"
                tickVisible={({tick}) => tick.y>=0}
                labelVisible={true}
                labelAttributes={{x: -5}}
                labelStyle={{textAnchor:"middle",alignmentBaseline:"middle",fill:["#d3d3d3"]}}
                lineVisible={true}
                lineStyle={{stroke:"#d3d3d3"}}
                lineLength="5%"
                lineOffset={-50}
                ticks={{maxTicks:5}}/>
            </Animate>
          </Layer>
        </Chart>
        <center><p style={{fontSize:"1.0em"}}>
          <span style={{color:"#FF0000"}}> ConversationCount </span>
          <span style={{color:"#00FF00"}}> TurnCount </span>
          <span style={{color:"#0000FF"}}> WordCount </span>
        </p></center>
      </div>
    );
  }
}

//Parse data into format needed by the diagrams
function form(data) {
  return data.toArray().map((datum => {return {
    name: String(datum.get("met_start")),
    data: [Number(datum.getIn(["data", "count"]))]
  };})).sort(function(a, b) {
    return a.name.localeCompare(b.name);
  }).filter((element, index, self) => self.findIndex((e) => {
    return e.name === element.name;
  }) === index);
}

export default Dimensions()(LineDiagram);
