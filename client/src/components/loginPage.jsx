import React, { Component } from "react";
import LoginForm from "./loginForm";

class LoginPage extends Component {
  render() {
    return (
      <div className="d-flex flex-column">
        <div className="mx-auto">
          <img src="./media/smile.png" alt="logo" />
        </div>
        <div className="mx-auto">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;
