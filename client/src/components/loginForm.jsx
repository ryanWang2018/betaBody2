import React, { Component } from "react";
import api from "./api.js";
import ErrorMessage from "./errorMessage.jsx";
import { Redirect } from "react-router";
const client_id = "google-sign-in-button";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: { content: "", shown: "" },
      username: "",
      password: "",
      remember: false,
      isAuth: false
    };
    this.handleOnChanges = this.handleOnChanges.bind(this);
  }

  // google api sign in code snipped from
  // http://www.albertgao.xyz/2018/12/15/how-to-add-official-google-sign-in-to-your-react-application/
  componentDidMount() {
    window.gapi.signin2.render(client_id, {
      width: "auto",
      height: 30,
      onsuccess: this.onSuccess
    });
  }

  onSuccess(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log("Name: " + profile.getName());
  }

  handleOnChanges(event) {
    const value =
      event.type === "checkbox" ? event.target.checked : event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    if (!this.state.isAuth) {
      return (
        <div
          className="constainer center"
          style={{ width: "700px", height: "800px" }}
        >
          <ErrorMessage
            onChange={this.handleOnError}
            error={this.state.error}
          />
          <div
            id="loginbox"
            style={{ "margin-top": "50px" }}
            className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"
          >
            <div className="panel panel-info">
              <div className="panel-heading">
                <div className="panel-title">
                  <h2>Sign In</h2>
                </div>
                <div
                  style={{
                    float: "right",
                    "font-size": "80%",
                    position: "relative",
                    top: "-10px"
                  }}
                >
                  <a href="/api/register/">register</a>
                </div>
              </div>
              <div style={{ "padding-top": "30px" }} className="panel-body">
                <div
                  style={{ display: "none" }}
                  id="login-alert"
                  className="alert alert-danger col-sm-12"
                />
                <form
                  id="loginform"
                  className="form-horizontal"
                  role="form"
                  onSubmit={this.login}
                >
                  <span className="input-group-addon">
                    <i className="glyphicon glyphicon-user" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleOnChanges}
                    required
                  />

                  <span className="input-group-addon">
                    <i className="glyphicon glyphicon-lock" />
                  </span>

                  <input
                    id="login-password"
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleOnChanges}
                    required
                  />

                  <div
                    style={{
                      "margin-top": "10px",
                      "padding-left": "10px",
                      "padding-right": "10px"
                    }}
                    className="form-group"
                  >
                    <button type="submit" className="btn btn-primary btn-block">
                      Log In
                    </button>
                    <h1 />
                    <div id={client_id}>Google LogIn</div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // let path = url(this.state.username);
      return <Redirect to="/api/rooms/" />;
    }
  }

  handleOnError = (err, shown) => {
    let error = { ...this.state.error };
    error.content = err;
    error.shown = "alert alert-primary";
    this.setState({ error });
    this.setState({ password: "", username: "" });
  };

  login = event => {
    event.preventDefault();
    api
      .post("/signin/", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          this.setState({ isAuth: true });
          console.log("hello");
          // this.props.history.push("/");
        }
      })
      .catch(err => {
        if (err.response) {
          this.handleOnError(err.response.data);
        } else {
          this.handleOnError(err.message);
        }
      });
  };
}

export default LoginForm;
