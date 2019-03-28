import React, { Component } from "react";
import Scores from "./scores.jsx";
import Result from "./result.jsx";
import EmojiBar from "./emojiBar.jsx";
import Cookies from "js-cookie";

class GameBoard extends Component {
  render() {
    // const result = this.props.result;
    const scoreList = this.props.scoreList;
    const timer = this.props.timer;
    const emojiList = this.props.emojiList;
    const ws = this.props.ws;
    const result = this.props.result;
    return (
      <div className="container">
        <div className="row">
          <Scores scoreList={scoreList} timer={timer} />
        </div>
        <Result result={result} className="row" />
        <div>
          <EmojiBar
            ws={ws}
            emojiList={emojiList}
            timer={timer}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh"
            }}
          />
        </div>
      </div>
    );
  }
}

export default GameBoard;
