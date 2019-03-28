import React, { Component } from "react";
import Emoji from "./emoji.jsx";
import MyCamera from "./myCamera.jsx";
import { Redirect } from "react-router-dom";

class EmojiBar extends Component {
  render() {
    let timer = this.props.timer;
    let ws = this.props.ws;
    return (
      <div>
        <MyCamera ws={ws} timer={timer} />
      </div>
    );
  }
}

export default EmojiBar;
