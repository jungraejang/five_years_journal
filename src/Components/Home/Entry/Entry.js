import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import "./Entry.css";

const Entry = props => {
  const { entryData, writeData, fetchEntry, handleEntry, entryValue } = props;
  return (
    <>
      <Paper
        elevation={6}
        className="entry_paper"
        style={{ backgroundColor: "#ff7884" }}
      >
        <div className="entries">
          {entryData.length && props.entryEditToggle === false ? (
            entryData.map(el => {
              return (
                <>
                  <p>{el.data}</p>
                  <IconButton
                    aria-label="entry_delete_button"
                    id={el.id}
                    key={el.id}
                    onClick={event => {
                      console.log("delete event", event.currentTarget.key);
                      props.deleteData(
                        event,
                        fetchEntry,
                        event.currentTarget.id
                      );
                    }}
                  >
                    <DeleteIcon
                      key="edit_question"
                      color="secondary"
                      opacity="1"
                    />
                  </IconButton>
                  <IconButton
                    id={el.id}
                    key="entry-edit-toggle"
                    aria-label="editToggle"
                    onClick={event => {
                      props.toggleEdit(fetchEntry);
                    }}
                  >
                    <EditIcon key="edit-entry" color="primary" opacity="1" />
                  </IconButton>
                </>
              );
            })
          ) : (
            <div className="input_form_div">
              <form
                onSubmit={event => {
                  event.preventDefault();
                  props.entryEditToggle
                    ? props.editData(event, fetchEntry, entryData[0].id)
                    : writeData(event, fetchEntry);
                }}
              >
                <p>What are you thinking?</p>
                <textarea
                  className="text_input_area"
                  rows="10"
                  type="text"
                  name="entryInput"
                  onChange={event => {
                    handleEntry(event, "entryValue");
                  }}
                  value={entryValue}
                />
                <div className="submit_button_div">
                  <Button
                    id="submit_entry_button"
                    type="submit"
                    value="submit"
                    variant="contained"
                    color="primary"
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

export default Entry;
