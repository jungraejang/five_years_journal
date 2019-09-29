import React, { Component } from "react";
import fire from "../../config/Fire";
import * as firebase from "firebase";
import "./Home.css";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Welcome from "./Welcome/Welcome.js";
import Entry from "./Entry/Entry.js";
import Question from "./Question/Question.js";
let db = firebase.firestore();

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entryData: [],
      questionData: [],
      entryValue: "",
      questionValue: "",
      fetchEntry: {
        collection: "entries",
        field: "entry_text",
        time: "entry_date",
        day: "entry_day",
        month: "entry_month",
        arrName: "entryArr",
        stateName: "entryData"
      },
      fetchQuestion: {
        collection: "questions",
        field: "question_text",
        time: "question_date",
        day: "question_day",
        month: "question_month",
        arrName: "questionArr",
        stateName: "questionData"
      }
    };
  }

  logout = () => {
    fire.auth().signOut();
  };

  getCurrentTimeString = () => {
    let currentTimeObj = {};
    let timeNow = Date(Date.now())
      .split(" ")
      .splice(0, 4);
    currentTimeObj.month = timeNow[1];
    currentTimeObj.day = Number(timeNow[2]);
    return currentTimeObj;
  };

  fetchData = fetchType => {
    console.log("fetching data");
    let { collection, field, stateName, day, month } = fetchType;
    let today = this.getCurrentTimeString();
    db.collection(`${collection}`)
      .where("poster_id", "==", `${this.props.user.uid}`)
      .where(`${month}`, "==", `${today.month}`)
      .where(`${day}`, "==", today.day)
      .get()
      .then(querySnapshot => {
        let dataArr = [];
        querySnapshot.forEach(doc => {
          // let timeDate = doc.data()[`${time}`].toDate().toDateString()
          // .toDate().toDateString().split(" ")
          let dataObj = {
            data: doc.data()[`${field}`],
            id: doc.id
          };

          console.log("dataObj", dataObj);

          dataArr.push(dataObj);
        });
        this.setState({
          [stateName]: dataArr
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };

  deleteData = (event, fetchType, id) => {
    event.preventDefault();
    let { collection } = fetchType;
    db.collection(`${collection}`)
      .doc(`${id}`)
      .delete()
      .then(() => {
        console.log("deleted a document");
        this.fetchData(fetchType);
      });
  };

  writeData = (event, fetchType) => {
    event.preventDefault();
    let { collection, field, time, day, month } = fetchType;
    let today = this.getCurrentTimeString();
    let dataObj = {};
    dataObj[`${field}`] =
      collection === "questions"
        ? this.state.questionValue
        : this.state.entryValue;
    dataObj[`${time}`] = firebase.firestore.FieldValue.serverTimestamp();
    dataObj[`${day}`] = today.day;
    dataObj[`${month}`] = today.month;
    dataObj["poster_id"] = `${this.props.user.uid}`;

    db.collection(`${collection}`)
      .add(dataObj)
      .catch(function(error) {});
    this.setState({
      entryValue: ""
    });
    this.fetchData(this.state.fetchQuestion);
    this.fetchData(this.state.fetchEntry);
  };

  handleEntry = (event, type) => {
    if (type === "entryValue") {
      this.setState({
        entryValue: event.target.value
      });
    } else {
      this.setState({
        questionValue: event.target.value
      });
    }
  };

  componentDidMount() {
    this.fetchData(this.state.fetchQuestion);
    this.fetchData(this.state.fetchEntry);
  }

  render() {
    console.log("state", this.state);
    let { user } = this.props;
    let {
      entryData,
      questionData,
      fetchQuestion,
      fetchEntry,
      entryValue,
      questionValue
    } = this.state;

    return (
      <div className="home">
        <Welcome
          user={user}
          fetchData={this.fetchData}
          fetchEntry={fetchEntry}
          fetchQuestion={fetchQuestion}
          logout={this.logout}
        />

        <Question
          questionData={questionData}
          writeData={this.writeData}
          fetchQuestion={fetchQuestion}
          handleEntry={this.handleEntry}
          questionValue={questionValue}
          deleteData={this.deleteData}
        />

        <Entry
          entryData={entryData}
          writeData={this.writeData}
          fetchEntry={fetchEntry}
          handleEntry={this.handleEntry}
          entryValue={entryValue}
          deleteData={this.deleteData}
        />
      </div>
    );
  }
}
