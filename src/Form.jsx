import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const Form = ({
  year,
  month,
  onEventAdd,
  onClose,
  currentEvent,
  onDelete,
}) => {
  const [date, setDate] = useState(() => {
    if (!currentEvent) {
      return `${year}-${month + 1 <= 9 ? `0` + (month + 1) : month + 1}-01`;
    } else {
      const [y, m, d] = currentEvent.date;
      return `${y}-${m <= 9 ? `0` + m : m}-${d < 10 ? "0" + d : d}`;
    }
  });
  const [title, setTitle] = useState(currentEvent ? currentEvent.title : "");
  const [description, setDescription] = useState(
    currentEvent ? currentEvent.description : ""
  );
  const [time, setTime] = useState(currentEvent ? currentEvent.time : "");

  const handleSubmit = (e, date, time, title, description) => {
    e.preventDefault();

    if (!currentEvent) {
      const [y, m, d] = date.split("-").map((el, i) => {
        if (i === 1) {
          return +el - 1;
        }
        return +el;
      });
      onEventAdd({
        id: title,
        date: [y, m, d],
        time,
        description,
        title,
        updated: false,
      });

      return;
    } else {
      const [y, m, d] = date.split("-");

      onEventAdd({
        ...currentEvent,
        date: [y, m, d],
        time,
        description,
        title,
        updated: true,
      });
    }
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
        <h2 className="form-header">
          {currentEvent && currentEvent.updated
            ? `Edit item`
            : `Add new idea item`}
        </h2>
        {currentEvent && (
          <h5 className="form-article-status">
            {currentEvent.updated
              ? `Updated at: ${date.replace(/[-]/gi, ".")} ${currentEvent.time}`
              : `Created At ${date.replace(/[-]/gi, ".")} ${currentEvent.time}`}
          </h5>
        )}
        <h3 className="form-title">Title*</h3>
        <input
          className="form-input form-input--main"
          type="text"
          placeholder="Title goes here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        ></input>
        <h3 className="form-title">Description</h3>
        <textarea
          className="form-input form-input--discription"
          placeholder="Description"
          value={description}
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
            value={time}
            className="form-input form-input--time"
            onChange={(e) => setTime(e.target.value)}
          ></input>
          <div className="form-buttons">
            {currentEvent && (
              <DeleteIcon
                className="form-bin"
                sx={{
                  width: "35px",
                  height: "35px",
                  transition: "all 0.3s ease",
                }}
                onClick={() => onDelete(currentEvent.id)}
              ></DeleteIcon>
            )}
            <Button
              variant="contained"
              sx={{ background: "grey", transition: "all 0.3s ease" }}
              type="submit"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
