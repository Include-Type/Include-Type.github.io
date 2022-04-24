import React from "react";
import "./TodoList.css";
import List from "./ListOfItems";
import { ToDo } from "../UserDashboard";

interface TodoListProps {
  toDos: ToDo[];
  setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
  saveToDos: (data: ToDo[]) => void;
}

export default function TodoList(props: TodoListProps) {
  return (
    <div className="todolist">
      <div className="text-center">Important Dates</div>
      <div className="lists">
        <List
          toDos={props.toDos}
          setToDos={props.setToDos}
          saveToDos={props.saveToDos}
        />
      </div>
    </div>
  );
}
