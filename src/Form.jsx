import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "@mui/material";

export const Form = () => {
  return (
    <form className="form">
      {" "}
      <CancelIcon
        sx={{
          color: "white",
          width: "30px",
          height: "40px",
          float: "right",
          padding: "5px 10px",
        }}
      ></CancelIcon>
      <div className="calendar-form">
        <h2 className="form-header">Add new idea item</h2>
        <h3 className="form-title">Title*</h3>
        <input
          className="form-input form-input--main"
          type="text"
          placeholder="Title goes here"
        ></input>
        <h3 className="form-title">Description</h3>
        <textarea
          className="form-input form-input--discription"
          placeholder="Discription"
          rows={6}
        ></textarea>

        <div className="form-bottom">
          <div className="form-bottom-titles">
            <h3 className="form-title">Date</h3>
            <h3 className="form-title">Begin Time</h3>
          </div>
          <input type="text" className="form-input form-input--date"></input>
          <input type="text" className="form-input form-input--time"></input>
          <Button variant="contained" sx={{ background: "grey" }} >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};
