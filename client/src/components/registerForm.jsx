import React, { Component } from "react";
import api from "./api.js";
import ErrorMessage from "./errorMessage.jsx";
class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      first_name: "",
      last_name: "",
      error: { content: "", shown: "" }
    };
    this.handleOnChanges = this.handleOnChanges.bind(this);
  }

  handleOnChanges(event) {
    event.preventDefault();

    //
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <a href="/" className="btn btn-sm btn-dark" role="button">
          Back
        </a>
        <ErrorMessage onChange={this.handleOnError} error={this.state.error} />
        <div
          id="signupbox"
          style={{ "margin-top": "50px" }}
          className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"
        >
          <div className="panel panel-info">
            <div className="panel-heading">
              <div className="panel-title">Register</div>
              <div
                style={{
                  float: "right",
                  "font-size": "85%",
                  position: "relative",
                  top: "-10px"
                }}
              />
            </div>

            <div class="panel-body">
              <form
                onSubmit={this.register}
                id="register_form"
                className="form-horizontal"
                role="form"
              >
                <div className="form-group">
                  <label className="col-md-3 control-label">username:</label>

                  <div className="col-md-9">
                    <input
                      className="form-control"
                      type="text"
                      name="username"
                      value={this.state.username}
                      id="username"
                      placeholder="Username"
                      onChange={this.handleOnChanges}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label">password:</label>
                  <div className="col-md-9">
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      value={this.state.password}
                      id="password"
                      placeholder="Password"
                      onChange={this.handleOnChanges}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-md-3 control-label">Email: </label>
                  <div className="col-md-9">
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      value={this.state.email}
                      id="email"
                      placeholder="E-mail Address"
                      onChange={this.handleOnChanges}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label">First Name:</label>
                  <div className="col-md-9">
                    <input
                      className="form-control"
                      type="text"
                      name="first_name"
                      value={this.state.first_name}
                      id="first_name"
                      placeholder="First Name"
                      onChange={this.handleOnChanges}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label">Last Name:</label>
                  <div className="col-md-9">
                    <input
                      className="form-control"
                      type="text"
                      name="last_name"
                      value={this.state.last_name}
                      id="last_name"
                      placeholder="Last Name"
                      onChange={this.handleOnChanges}
                    />
                  </div>
                </div>
              </form>
              <div className="mx-auto ">
                <button
                  style={{ "margin-left": "45px", "margin-right": "40px" }}
                  type="submit"
                  id="register_btn"
                  className="btn btn-info"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  register = event => {
    event.preventDefault();

    api
      .post("/register", {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        first_name: this.state.first_name,
        last_name: this.state.last_name
      })
      .then(res => {
        console.log(res.status);
        if (res.status === 200) {
          this.handleOnSuccess();
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

  handleOnSuccess = () => {
    this.context.router.history.push("/");
  };

  handleOnError = (err, shown) => {
    let error = { ...this.state.error };
    error.content = err;
    error.shown = "alert alert-primary";
    this.setState({ error });
  };
}

export default RegisterForm;
