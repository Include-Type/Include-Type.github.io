import React from "react";
import "./TodoList.css";
import List from "./ListOfItems";

export default function TodoList() {
  return (
    <div className="todolist">
      <h1>Important Dates</h1>
      <div className="lists">
        <List />
      </div>
    </div>
  );
}
