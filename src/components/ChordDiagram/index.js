import React, {Component, PropTypes} from "react";
//import fetch from "whatwg-fetch";
import d3ChordDiagram from "./d3ChordDiagram";
import Faux from "react-faux-dom";

export default class ChordDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }



  componentDidMount() {
    //FIXME revert to dynamic data after demo!!
    const matrix = [
    [  7.,   1.,   5.,   0.,   1.,   0.],
    [  0.,   4.,   3.,   0.,   0.,   0.],
    [  6.,   2.,  17.,   1.,   1.,   1.],
    [  0.,   0.,   1.,   0.,   0.,   0.],
    [  2.,   0.,   0.,   0.,   3.,   0.],
    [  0.,   0.,   1.,   0.,   0.,   4.]];


    require.ensure(["../../../resources/readme.json"], () => {
      const data = matrix;
      this.setState({
        data,
        loading: false,
        d3: d3ChordDiagram(data)
      });
    });
  }

  render() {
    const {
      loading,
      data,
      d3 = ""
    } = this.state;

    if (loading) {
      return <div> Loading. </div>;
    }

    const el = Faux.createElement("svg");
    d3(el);

    // Render it to React elements.
    return el.toReact();
  }
}

ChordDiagram.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object)
};
