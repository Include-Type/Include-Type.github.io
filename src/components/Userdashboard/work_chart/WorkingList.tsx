import React from "react";
import "./WorkingList.css";
import WorkGraph from "./WorkGraph";

export default function Workinglist() {
  return (
    <div className="working-list">
      <h1>Work List</h1>
      <div className="piecharts">
        <WorkGraph />
      </div>
    </div>
  );
}
