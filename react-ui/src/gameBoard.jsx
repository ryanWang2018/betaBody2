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
    const path = this.props.path;
    return (

      <div className="container">
        <button onClick={() => this.props.leaveRoom()} className="btn btn-danger btn-sm m-2">back</button>
        <div className="row">
          <Scores scoreList={scoreList} timer={timer}></Scores>
        </div>
        <Result result={result} className="row"></Result>
        <div >
          <EmojiBar ws={ws} emojiList={emojiList} timer={timer} path={path} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}></EmojiBar>
        </div>

      </div>
    );
  }
}

export default GameBoard;
