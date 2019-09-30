import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./Welcome.css";

const Welcome = props => {
  return (
    <div className="welcome_div">
      <Paper id="welcome_paper" elevation={6}>
        <Paper id="welcome_message_paper" elevation={8}>
          <Typography variant="h5" component="h5" id="home_message">
            {"Jung Rae's Five Years Journal"}
          </Typography>
          <Typography variant="h6" component="h6" id="user_email">
            Welcome: {props.user.email}
          </Typography>
        </Paper>

        <div className="welcome_buttons">
          <Button
            id="signout_button"
            variant="contained"
            color="secondary"
            onClick={props.logout}
          >
            Sign Out
          </Button>
          <Button
            id="fetch_button"
            variant="contained"
            color="primary"
            onClick={() => {
              props.fetchData(props.fetchEntry);
              props.fetchData(props.fetchQuestion);
            }}
          >
            get entries
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Welcome;
