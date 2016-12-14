import React, {Component, PropTypes} from "react";
import fetch from "whatwg-fetch";
import d3ChordDiagram from "./d3ChordDiagram";
import Faux from 'react-faux-dom'

export default class ChordDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }

  componentDidMount() {
    require.ensure(["../../../resources/readme.json"], () => {
      const data = require("../../../resources/readme.json");
      this.setState({data, loading: false, d3: d3ChordDiagram(data)});
    });
  }

  render() {
    const {loading, data, d3 = ''} = this.state;
    if (loading) {
      return <div>
        Loading.
      </div>;
    }
    const el = Faux.createElement('svg');
    el.setAttribute('width', 960);
    el.setAttribute('height', 960);
    d3(el);

    // Render it to React elements.
    return el.toReact()
  }
}

ChordDiagram.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object)
};

