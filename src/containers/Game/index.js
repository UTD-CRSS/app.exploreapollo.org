import React, {Component} from "react";
import "./index.scss";

import LunarLander from "../../../static/lunar_lander.png";
import Asteroid from "../../../static/asteroid.png";

const DOWN = 74;
const UP =  75;
const INCREMENT = 10;
const ROCK_INCREMENT = 0.5;
const ROCK_WIDTH = 20;
const LANDER_HEIGHT = 50;
let rockCounter = 0;
import random from "lodash/random";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 0,
      gameOver: false,
      gameTickCallback: null,
      rocks: []
    };
  }

  handleMove(e) {
    const {top} = this.state;
    if (e.keyCode == DOWN) {
      if (top >= 90) {
        return this.setState({top: 90});
      }
      this.setState({top: this.state.top + INCREMENT});
    }
    if (e.keyCode == UP) {
      if (top <= 0) {
        return this.setState({top: 0});
      }
      this.setState({top: this.state.top - INCREMENT});
    }
  }

  gameTick() {
    const {rocks, gameOver} = this.state;
    const newRocks = [
      ...rocks.map(function (rock) {rock.x -= ROCK_INCREMENT; return rock;}).filter(function (rock) { return rock.x > 0; })
    ];
    if (rocks.length < 10) {
      newRocks.push({id: rockCounter++, x: random(100, 150), y: random(0, 95)});
    }
    this.setState({rocks: newRocks});

    if (!gameOver) {
      window.requestAnimationFrame(this.gameTick.bind(this));
    }
  }

  componentDidMount() {
    document.body.onkeydown = (e) => {
      this.handleMove(e);
    };
    this.setState({
      gameTickCallback: window.requestAnimationFrame(this.gameTick.bind(this))
    });
  }

  componentWillUnmount() {
    document.body.onkeydown = null;
    window.cancelAnimationFrame(this.state.gameTickCallback);
  }

  render() {
    const {top, rocks} = this.state;
    return <div>
      <h4>Controls</h4>
      <p><code>J</code> UP, <code>K</code> DOWN</p>
      <div className="stars-bg" style={{height: "400px", position: "relative"}}>
        <img src={LunarLander} style={{height: `${LANDER_HEIGHT}px`, transition: "all 200ms", position: "absolute", top: `${top}%`, left: "10px"}} />
        {rocks.map(function ({id, x, y}) {
          return <img src={Asteroid} key={id} style={{position: "absolute", width: `${ROCK_WIDTH}px`, height: `${ROCK_WIDTH}px`, top: `${y}%`, left: `${x}%`}} />;
        })}
      </div>
    </div>;
  }
}
