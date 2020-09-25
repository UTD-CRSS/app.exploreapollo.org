import React, {Component} from "react";
import d3ChordDiagram from "./d3ChordDiagram";
import Faux from "react-faux-dom";

export class ChordDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }

  shouldComponentUpdate(nextProps, nextState) {
    const rawInteractions = formInteractions(this.props.data.interactions);
    if(rawInteractions.length > 0) {
      const slot = closestIndex(this.props.data.time, rawInteractions.map(function(index) {return Number(index.name);}));
      if(nextState.slot != slot) {
        return true;
      }
    }
    return false;
  }

  componentWillMount() {
    const rawSpeakers = formSpeakers(this.props.data.speakers);
    const rawInteractions = formInteractions(this.props.data.interactions);
    if(rawInteractions.length > 0) {
      const slot = closestIndex(this.props.data.time, rawInteractions.map(function(index) {return Number(index.name);}));
      const speakers = JSON.parse(rawSpeakers[slot].data);
      const interactions = JSON.parse(rawInteractions[slot].data);
      this.setState({
        loading: false,
        slot: -1,
        d3: d3ChordDiagram(speakers, interactions)
      });
    }
  }

  componentWillUpdate() {
    const rawSpeakers = formSpeakers(this.props.data.speakers);
    const rawInteractions = formInteractions(this.props.data.interactions);
    if(rawInteractions.length > 0) {
      const slot = closestIndex(this.props.data.time, rawInteractions.map(function(index) {return Number(index.name);}));
      const speakers = JSON.parse(rawSpeakers[slot].data);
      const interactions = JSON.parse(rawInteractions[slot].data);
      this.setState({
        loading: false,
        slot: slot,
        d3: d3ChordDiagram(speakers, interactions)
      });
    }
  }

  render() {
    const {loading, d3 = ""} = this.state;

    //Don't render diagram without data
    if (this.props.data.interactions.size < 1) {
      return <p className="text-center text-muted">No Data Yet</p>;
    }
    if(loading) {
      return <p className="text-center text-muted">Loading</p>;
    }

    const el = Faux.createElement("svg");
    d3(el);
    return el.toReact();
  }
}

function formInteractions(data) {
  if(typeof data == "undefined") {
    return [];
  }

  //TODO get rid of artificial 'duplicates'
  //this is horrible... but I don't know how to keep react a step ahead
  //so i'm creating duplicate steps...
  var result = data.toArray().map((datum => {return {
    name: String(Number(datum.get("met_start"))),
    data: String(datum.getIn(["data", "matrix"]))
  };})).concat(data.toArray().map((datum => {return {
    name: String(Number(datum.get("met_start")) + 1),
    data: String(datum.getIn(["data", "matrix"]))
  };}))).sort(function(a, b) {
    return a.name.localeCompare(b.name);
  }).filter((element, index, self) => self.findIndex((e) => {
    return e.name === element.name;
  }) === index);
  return result;
}

function formSpeakers(data) {
  if(typeof data == "undefined") {
    return [];
  }

  //TODO get rid of artificial 'duplicates'
  //this is horrible... but I don't know how to keep react a step ahead
  //so i'm creating duplicate steps...
  var result = data.toArray().map((datum => {return {
    name: String(Number(datum.get("met_start"))),
    data: String(datum.getIn(["data", "names"])),
    ids: String(datum.getIn(["data", "ids"]))
  };})).concat(data.toArray().map((datum => {return {
    name: String(Number(datum.get("met_start")) + 1),
    data: String(datum.getIn(["data", "names"])),
    ids: String(datum.getIn(["data", "ids"]))
  };}))).sort(function(a, b) {
    return a.name.localeCompare(b.name);
  }).filter((element, index, self) => self.findIndex((e) => {
    return e.name === element.name;
  }) === index);
  return result;
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
