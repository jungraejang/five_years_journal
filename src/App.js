import React from "react";
import "./App.css";
import fire from "./config/Fire.js";
import Login from "./Components/Login/Login.js";
import Home from "./Components/Home/Home.js";
// import { css } from '@emotion/core';
import { FadeLoader } from "react-spinners";
// import { Route, Switch, Router, withRouter, Redirect } from "react-router-dom";

// const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;
// `;

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      user: null,
      email: "",
      password: "",
      loaded: false
    };
  }

  componentDidMount() {
    // console.log("local storage", localStorage.getItem('user'))
    this.authListener();
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = e => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .catch(error => {
        console.log(error);
      });
  };

  signup = e => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .then(u => {})
      .catch(error => {
        console.log(error);
      });
  };

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user, loaded: true });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null, loaded: true });
        localStorage.removeItem("user");
      }
    });
  }

  displayLogin = () => {
    let { login, signup, handleChange } = this;
    let { email, password, user } = this.state;
    if (this.state.user) {
      return (
        <>
          <Home user={user} />
        </>
      );
    } else if (!this.state.loaded) {
      return (
        <>
          <FadeLoader
            sizeUnit={"px"}
            size={500}
            color={"#123abc"}
            loading={!this.state.loaded}
          />{" "}
        </>
      );
    } else if (!this.state.user) {
      return (
        <>
          <Login
            email={email}
            login={login}
            signup={signup}
            handleChange={handleChange}
            password={password}
          />
        </>
      );
    }
  };
  render() {
    // let {login, signup, handleChange} = this
    let { loaded } = this.state;
    return (
      <div className="App">
        {loaded ? (
          <>{this.displayLogin()}</>
        ) : (
          <FadeLoader
            sizeUnit={"px"}
            size={500}
            color={"#123abc"}
            loading={!loaded}
          />
        )}
      </div>
    );
  }
}

export default App;
