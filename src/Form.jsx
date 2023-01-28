import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "@mui/material";

export const Form = ({ year, month, onEventAdd, onClose }) => {
  const [date, setDate] = useState(
    `${year}-${month < 10 ? `0` + (month + 1) : month}-${new Date().getDate()}`
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e, date, time, title, description) => {
    e.preventDefault();
    const [y, m, d] = date.split("-").map((el, i) => {
      if (i === 1) {
        return +el - 1;
      }
      return +el;
    });

    onEventAdd({
      date: [y, m, d],
      time,
      description,
      title,
    });
    setTimeout(() => onClose(false), 1000);
  };
  return (
    <form
      className="form"
      onSubmit={(e) => handleSubmit(e, date, time, title, description)}
    >
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
          onChange={(e) => setTitle(e.target.value)}
          required
        ></input>
        <h3 className="form-title">Description</h3>
        <textarea
          className="form-input form-input--discription"
          placeholder="Discription"
          rows={6}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="form-bottom">
          <div className="form-bottom-titles">
            <h3 className="form-title">Date</h3>

            <h3 className="form-title">Begin Time</h3>
          </div>

          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            className="form-input form-input--date"
            value={date}
            required
          ></input>

          <input
            type="time"
            className="form-input form-input--time"
            onChange={(e) => setTime(e.target.value)}
          ></input>
          <Button variant="contained" sx={{ background: "grey" }} type="submit">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};
