import React, {Component} from "react";
import "./index.scss";

import LunarLander from "../../../static/lunar_lander.png";
import Asteroid from "../../../static/asteroid.png";
import Explosion from "../../../static/explosion.gif";

const DOWN = 74;
const UP =  75;
const INCREMENT = 10;
const ROCK_INCREMENT = 0.5;
const ROCK_WIDTH = 20;
const LANDER_HEIGHT = 50;
let rockCounter = 0;
import random from "lodash/random";
import some from "lodash/some";
import filter from "lodash/filter";

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
    const {top, gameOver} = this.state;
    if (gameOver) {
      return;
    }
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

  collisionDetect(top, rocks) {
    const yTop = top;
    const yBottom = top + 10;
    return some(
      filter(rocks, function (rock) {
        return rock.x <= 1;
      }),
      function (rock) {
        return rock.y >= yTop && rock.y <= yBottom;
      });
  }

  gameTick() {
    const {top, rocks, gameOver} = this.state;
    // add and update rocks
    const newRocks = [
      ...rocks.map(function (rock) {rock.x -= ROCK_INCREMENT; return rock;}).filter(function (rock) { return rock.x > 0; })
    ];
    if (rocks.length < 10) {
      newRocks.push({id: rockCounter++, x: random(100, 150), y: random(0, 95)});
    }

    // collision detection
    const isGameOver = this.collisionDetect(top, rocks);

    this.setState({rocks: newRocks, gameOver: isGameOver});

    if (!gameOver && !isGameOver) {
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

  resetGame() {
    this.setState({
      rocks: [],
      gameOver: false,
      gameTickCallback: window.requestAnimationFrame(this.gameTick.bind(this))
    });
  }

  render() {
    const {top, rocks, gameOver} = this.state;
    return <div>
      <h4>Controls</h4>
      <p><code>J</code> DOWN, <code>K</code> UP</p>
      <div className="stars-bg" style={{height: "400px", position: "relative"}}>
        <img src={LunarLander} style={{height: `${LANDER_HEIGHT}px`, transition: "all 200ms", position: "absolute", top: `${top}%`, left: "10px"}} />
        {gameOver && <img src={Explosion} style={{height: `${LANDER_HEIGHT}px`, transition: "all 200ms", position: "absolute", top: `${top}%`, left: "10px"}} />}
        {gameOver && <div style={{textAlign: "center", position: "absolute", top: "50%", left: "50%", transform: "translateY(-50%) translateX(-50%)", color: "red", fontSize: "4em"}}>
          Game over!
          <div><button className="btn btn-primary" onClick={this.resetGame.bind(this)}>Play Again</button></div>
        </div>}
        {rocks.map(function ({id, x, y}) {
          return <img src={Asteroid} key={id} style={{position: "absolute", width: `${ROCK_WIDTH}px`, height: `${ROCK_WIDTH}px`, top: `${y}%`, left: `${x}%`}} />;
        })}
      </div>
    </div>;
  }
}
