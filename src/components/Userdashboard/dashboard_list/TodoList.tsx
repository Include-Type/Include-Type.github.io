import React from "react";
import "./TodoList.css";
import List from "./ListOfItems";

export default function TodoList() {
  return (
    <div className="todolist">
      <div className="text-center">Important Dates</div>
      <div className="lists">
        <List />
      </div>
    </div>
  );
}
