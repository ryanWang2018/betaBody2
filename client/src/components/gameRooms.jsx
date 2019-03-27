import React, { Component } from "react";
import GameRoom from "./gameRoom.jsx";
import api from "./api.js";
import Cookies from "js-cookie";
import LoginPage from "./loginForm.jsx";
import ReactDOM from "react-dom";
import { Redirect } from "react-router";
import "./gameRooms.css";

class GameRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      time: Date.now(),
      // exit: false,
      inRoom: ""
    };
  }

  getNextPage = () => {
    let curr_rooms = this.state.rooms;
    let lastroom = curr_rooms[curr_rooms.length - 1];

    if (curr_rooms.length == 6) {
      api
        .post("/rooms/nextPage", { last: lastroom })
        .then(res => {
          console.log(res);
          this.setState({ rooms: res.data });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("this is the last page");
    }
  };

  getLastPage = () => {
    let curr_rooms = this.state.rooms;
    api
      .post("/rooms/lastPage/", { first: curr_rooms[0] })
      .then(res => {
        let result = res.data;
        console.log(result);
        if (result.length > 0) {
          this.setState({ rooms: res.data });
        } else {
          console.log("this is the ever first page");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleAddRoom = () => {
    //add the updated rooms into database
    api
      .post("/room/", null)
      .then(res => {
        //enter created room
        console.log(res);
        this.enterRoom(res.data._id);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handlerGetRooms() {
    api
      .get("/rooms/", null)
      .then(res => {
        let rooms = res.data;
        this.setState({ rooms });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // handlerDelete = room => {
  //   api
  //     .delete("/room/" + room._id + "/")
  //     .then(res => {
  //       let rooms = res.data;
  //       // this.setState({ rooms });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  handlerClick = roomId => {
    console.log("room is clicked", roomId);
  };

  enterRoom = roomId => {
    api
      .post("/room/" + roomId + "/enter/")
      .then(res => {
        this.setState({ inRoom: res.data._id });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.handlerGetRooms();
  }
  // clean up data before something is removed from DOM.

  handleSignOut = () => {
    //add the updated rooms into database
    api
      .get("/signout/")
      .then(res => {
        console.log(res);
        // this.setState({ exit: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.inRoom)
      return <Redirect to={"/api/rooms/" + this.state.inRoom} />;
    return (
      <div>
        <a
          href="/"
          className="btn btn-lg btn-danger"
          onClick={this.handleSignOut}
        >
          <span className="glyphicon glyphicon-chevron-left" /> Sign Out
        </a>
        <div className="d-flex flex-wrap">
          {this.state.rooms.map(room => (
            <GameRoom
              key={room._id}
              onRoomClick={this.handlerClick}
              onRoomDelete={this.handlerDelete}
              onEnter={this.enterRoom}
              room={room}
            />
          ))}
        </div>

        <div className="d-flex flex-row-reverse justify-content-sm-between">
          <button className="p-2 btn-info" onClick={this.getNextPage}>
            &raquo;
          </button>
          <button className="p-2 btn-info" onClick={this.getLastPage}>
            &laquo;
          </button>
        </div>

        <button onClick={this.handleAddRoom} className="btn btn-lg btn-danger">
          Create Room
        </button>
      </div>
    );
  }
}

export default GameRooms;
