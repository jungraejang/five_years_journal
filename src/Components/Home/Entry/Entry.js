import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./Entry.css";

const Entry = props => {
  const { entryData, writeData, fetchEntry, handleEntry, entryValue } = props;
  return (
    <>
      <Paper elevation={6} class="entry_paper">
        <div className="entries">
          {entryData.length ? (
            entryData.map(el => {
              return (
                <p
                  key={el.id}
                  id={el.id}
                  onClick={event => {
                    console.log("delete event", event.target.id);
                    props.deleteData(event, fetchEntry, event.target.id);
                  }}
                >
                  {el.data}
                </p>
              );
            })
          ) : (
            <div className="input_form_div">
              <form
                onSubmit={event => {
                  writeData(event, fetchEntry);
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
                    {" "}
                    Submit{" "}
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
