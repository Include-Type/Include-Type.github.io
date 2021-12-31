import React from "react";
import "./CalenderWork.css";
import MultidatePicker from "./MultidatePicker";
import CalendarForm from "./CalendarForm";
import CalendarFormPopup from "./CalendarFormPopup";

export default function CalendarWork() {
  return (
    <div className="calender-work">
      <div className="popupform_main">
        <h1>Date Selector</h1>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <MultidatePicker />
      </div>
    </div>
  );
}
