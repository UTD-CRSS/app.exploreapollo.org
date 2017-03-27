import React, {Component} from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import Dimensions from "react-dimensions";
import {Chart, Layer, Animate, Ticks, Bars} from "rumble-charts";

class BarDiagram extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const {time, data, containerWidth} = this.props;

    if(data.size < 1) {return <p className="text-center text-muted">No Data Yet</p>;}

    const raw = form(data);
    const slot = closestIndex(time, raw.map(function(index) {return Number(index.name);}));
    const slice = raw.slice(Math.max(0, slot-2), Math.min(raw.length, slot+3));
    const diagramData = [{data: slice.map(function(index) {return Number(index.data);})}];
    const diagramTicks = slice.map(function(index) {return {name: String((index.name-raw[0].name)/1000)};});

    return (
      <div style={{fontFamily:"sans-serif",fontSize:"0.8em"}}>
        <Chart
          width={containerWidth}
          height={containerWidth/4}
          series={diagramData}
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
                axis="x"
                opacity={1.0}
                position="bottom"
                tickVisible={({tick}) => tick.x>=0}
                label={({index, props}) => props.cticks[index].name}
                labelVisible={true}
                labelAttributes={{y:3}}
                labelStyle={{textAnchor:"middle",alignmentBaseline:"before-edge",fill:"#33ff66"}}
                lineVisible={false}
                lineStyle={{stroke:"#d3d3d3"}}
                lineLength="100%"
                lineOffset={0}
                ticks={{maxTicks:5}}
                cticks={diagramTicks}/>
              <Ticks
                axis="y"
                opacity={1.0}
                position="left"
                tickVisible={({tick}) => tick.y>=0}
                labelVisible={true}
                labelAttributes={{x: -5}}
                labelStyle={{textAnchor:"end",alignmentBaseline:"middle",fill:["#33ff66"]}}
                lineVisible={true}
                lineStyle={{stroke:"#d3d3d3"}}
                lineLength="100%"
                lineOffset={0}
                ticks={{maxTicks:5}}/>
              <Bars
                colors={["#33ff66"]}
                opacity={1.0}
                combined={false}
                groupPadding="1%"
                innerPadding="1%"
                seriesVisible={true}
                barVisible={true}/>
            </Animate>
          </Layer>
        </Chart>
        <center><p style={{fontSize:"1.0em"}}>
          <span style={{color:"#33ff66"}}> WordCount </span>
        </p></center>
      </div>
    );
  }
}

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

function closestIndex(number, array) {
  var result = 0;
  var diff = Math.abs (number - array[0]);
  for (var index = 0; index < array.length; index++) {
    var newdiff = Math.abs (number - array[index]);
    if (newdiff < diff) {
      diff = newdiff;
      result = index;
    }
  }
  return result;
}

export default Dimensions()(BarDiagram);
