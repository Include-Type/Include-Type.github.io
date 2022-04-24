import React, { useState } from "react";
import { ToDo } from "../UserDashboard";
import "./ListOfItems.css";

interface ListProps {
  toDos: ToDo[];
  setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
  saveToDos: (data: ToDo[]) => void;
}

export default function ListOfItems(props: ListProps) {
  const [fuse, setFuse] = useState<number>(1);

  function removeToDo(toDo: ToDo): void {
    let toDos: ToDo[] = props.toDos;
    const index: number = toDos.indexOf(toDo);
    toDos.splice(index, 1);
    props.setToDos(toDos);
    props.saveToDos(toDos);
    setFuse((prev) => prev + 1);
  }

  return (
    <div className="dashboard_list_container">
      {props.toDos.length > 0 && fuse > 0 ? (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Tasks</th>
            </tr>
          </thead>
          <tbody>
            {props.toDos.map((toDo) => (
              <tr key={toDo.agenda}>
                <td style={{ color: `${toDo.color}` }}>{toDo.date}</td>
                <td style={{ color: `${toDo.color}` }}>{toDo.agenda}</td>
                <td
                  style={{ color: "red", cursor: "pointer" }}
                  title="Remove"
                  onClick={() => removeToDo(toDo)}
                >
                  X
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center", fontSize: "1.5em" }}>Empty</p>
      )}
    </div>
  );
}
