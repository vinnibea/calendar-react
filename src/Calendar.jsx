import React, { useEffect, useState } from "react";
import { date, days, dateFunc } from "./App";

export const Calendar = ({ month, year, events, onEventSelect }) => {
  const [localEvents, setEvents] = useState(() => {
    if (localStorage.getItem("events")) {
      return JSON.parse(localStorage.getItem("events")).filter(
        (e) => e.date[0] === year && e.date[1] === month
      );
    } else {
      localStorage.setItem("events", []);
      return events;
    }
  });

  const thisMonth = dateFunc(month, year);
  const lastMonth = dateFunc(month, year);
  const getDateDif =
    thisMonth.getDay() < 1
      ? days.length - 1
      : days.slice(1, thisMonth.getDay()).length;

  useEffect(() => {
    if (localStorage.getItem("events") && events) {
      setEvents(() =>
        JSON.parse(localStorage.getItem("events")).filter(
          (e) => e.date[0] === year && e.date[1] === month
        )
      );
    }
  }, [events, year, month]);

  lastMonth.setDate(-getDateDif);
  return (
    <div className="calendar">
      {new Array(getDateDif).fill(0).map((day, index) => {
        lastMonth.setDate(lastMonth.getDate() + 1);
        const currentDay =
          days[lastMonth.getDay()] || lastMonth[days.length - 1];
        const currentDate = lastMonth.getDate();

        return (
          <div
            key={day + index}
            className="calendar-day calendar-day--previous"
            style={{
              border: "12px solid white",
            }}
          >
            <div className="calendar-date">
              <span>{currentDate}</span>
              <span>{currentDay}</span>
            </div>
          </div>
        );
      })}

      {new Array(31).fill(0).map((day, index) => {
        if (index === 0) {
          thisMonth.setDate(index + 1);
        } else {
          thisMonth.setDate(thisMonth.getDate() + 1);
        }

        const currentDay = days[thisMonth.getDay()];
        const currentDate = thisMonth.getDate();
        const eventsThisDay = localEvents.filter(
          (event) => event.date[2] === currentDate
        );
        return (
          <div
            key={day + index}
            className="calendar-day"
            style={{
              backgroundColor: `${
                date.getDate() === index + 1 ? "rgba(35, 77, 168, 0.341)" : ""
              }`,
              display: thisMonth.getDate() < index + 1 && "none",
            }}
          >
            <div className="calendar-date">
              <span>{currentDate}</span>
              <span>{currentDay}</span>
            </div>
            <div
              className="calendar-events"
              style={
                eventsThisDay.length >= 2
                  ? {
                      overflowY: "scroll",
                      border: "2px solid rgba(16, 15, 15, 0.148)",
                      backgroundColor: "rgb(80, 80, 80)",
                      borderRadius: "8px",
                    }
                  : {overflow: 'inherit'}
              }
            >
              {eventsThisDay.map((event) => (
                <div
                  className="calendar-title"
                  onClick={() => onEventSelect(event)}
                >
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
