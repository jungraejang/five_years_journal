import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import "./Question.css";

const Question = props => {
  const {
    questionData,
    writeData,
    fetchQuestion,
    handleEntry,
    questionValue
  } = props;
  return (
    <>
      <Paper
        className="question_paper"
        elevation={6}
        style={{ backgroundColor: "#65446c", color: "white" }}
        key="question-paper"
      >
        <div className="questions">
          {questionData.length && props.questionEditToggle === false ? (
            questionData.map(el => {
              return (
                <>
                  <p key="p-tag">{el.data}</p>
                  <IconButton
                    id={el.id}
                    key={el.id}
                    aria-label="delete"
                    onClick={event => {
                      console.log("delete event", event.target);
                      props.deleteData(
                        event,
                        fetchQuestion,
                        event.currentTarget.id
                      );
                    }}
                  >
                    <DeleteIcon
                      key="delete_question"
                      color="secondary"
                      opacity="1"
                    />
                  </IconButton>
                  <IconButton
                    id={el.id}
                    key="question-edit-toggle"
                    aria-label="editToggle"
                    onClick={event => {
                      props.toggleEdit(fetchQuestion);
                    }}
                  >
                    <EditIcon key="edit-question" color="primary" opacity="1" />
                  </IconButton>
                </>
              );
            })
          ) : (
            <div className="input_form_div">
              <form
                id="question_input_form"
                key="form"
                onSubmit={event => {
                  event.preventDefault();
                  props.questionEditToggle
                    ? props.editData(event, fetchQuestion, questionData[0].id)
                    : writeData(event, fetchQuestion);
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
