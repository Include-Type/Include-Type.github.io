import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import WorkingList from "./work_chart/WorkingList";
import IssueList from "./issues_chart/IssueList";
import CalendarWork from "./dashboard_calendar/CalendarWork";
import TodoList from "./dashboard_list/TodoList";

export interface ToDo {
  date: string;
  agenda: string;
  color: string;
}

export default function UserDashboard() {
  const [toDos, setToDos] = useState<ToDo[]>([]);

  useEffect(() => {
    function fetchToDos(): void {
      const data: string | null = localStorage.getItem("toDos");
      if (typeof data === "string") {
        setToDos(JSON.parse(data));
      }
    }

    fetchToDos();
  }, []);

  function saveToDos(data: ToDo[]): void {
    localStorage.setItem("toDos", JSON.stringify(data));
  }

  return (
    <div className="user_dashboard">
      <WorkingList />
      <IssueList />
      <CalendarWork toDos={toDos} setToDos={setToDos} saveToDos={saveToDos} />
      <TodoList toDos={toDos} setToDos={setToDos} saveToDos={saveToDos} />
    </div>
  );
}
