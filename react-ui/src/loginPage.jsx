import React, { Component } from "react";
import LoginForm from "./loginForm";

class LoginPage extends Component {

  render() {
    return (
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-4 offset-md-4">
            <img src="./media/smile.png" alt="logo" />
          </div>
          <LoginForm
            className="col-md-4 offset-md-4"
          />
        </div>
      </div>
    );
  }
}

export default LoginPage;
