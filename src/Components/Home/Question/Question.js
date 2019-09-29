import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./Question.css";

const Question = props => {
  const {
    questionData,
    writeData,
    fetchQuestion,
    handleEntry,
    questionValue
  } = props;
  console.log("question props", props);
  return (
    <>
      <Paper class="question_paper" elevation={6} key={questionData.id}>
        <div className="questions">
          {questionData.length ? (
            questionData.map(el => {
              return (
                <>
                  <p
                    key={el.id}
                    id={el.id}
                    onClick={event => {
                      console.log("delete event", event.target.id);
                      props.deleteData(event, fetchQuestion, event.target.id);
                    }}
                  >
                    {el.data}
                  </p>
                </>
              );
            })
          ) : (
            <div className="input_form_div">
              <form
                id="question_input_form"
                onSubmit={event => {
                  writeData(event, fetchQuestion);
                }}
              >
                <p>What would you ask yourself?</p>
                <textarea
                  className="text_input_area"
                  rows="3"
                  type="text"
                  name="entryInput"
                  onChange={event => {
                    handleEntry(event, "questionValue");
                  }}
                  value={questionValue}
                />
                <div className="submit_button_div">
                  <Button
                    id="submit_entry_button"
                    type="submit"
                    value="submit"
                    variant="contained"
                    color="secondary"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </Paper>
    </>
  );
};

export default Question;
