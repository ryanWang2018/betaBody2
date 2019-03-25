import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./components/loginPage";
import RegisterForm from "./components/registerForm";
import GameRooms from "./components/gameRooms";
import PrepareRoom from "./components/prepareRoom";
import bgheader from "./components/pic/bg-header.png";

class App extends Component {
  render() {
    return (
      <div>
        <div
          className="card text-white "
          style={{
            "max-width": "100%",
            height: "355px",
            backgroundImage: "url(" + bgheader + ")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div className="d-flex justify-content-start">
            <h1 className="mx-auto">Body Detection</h1>
          </div>
        </div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LoginPage} />

            <Route exact path="/api/register/" component={RegisterForm} />
            <Route exact path="/api/rooms/" component={GameRooms} />
            <Route exact path="/api/rooms/:roomId/" component={PrepareRoom} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
