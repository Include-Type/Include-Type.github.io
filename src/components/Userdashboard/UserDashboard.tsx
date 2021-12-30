import React from "react";
import "./UserDashboard.css"
import WorkingList from "./work_chart/WorkingList";
import IssueList from "./issues_chart/IssueList";
import CalendarWork from "./dashboard_calendar/CalendarWork";
import TodoList from "./dashboard_list/TodoList";

export default function UserDashboard() {
  return (
    <div className="user_dashboard">
      <WorkingList />
      <IssueList />
      <CalendarWork />
      <TodoList />
    </div>
  );
}
