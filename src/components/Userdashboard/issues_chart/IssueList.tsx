import React from "react";
import "./IssueList.css";
import ChartPie from "./IssueChart";

export default function Issueslist() {
  return (
    <div className="issue-list">
      <h1>Issue List</h1>
      <div className="piecharts">
        <ChartPie />
      </div>
    </div>
  );
}
