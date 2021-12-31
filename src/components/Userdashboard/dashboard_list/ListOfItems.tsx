import React, { useState } from "react";
import "./ListOfItems.css";

export default function ListOfItems() {
  const [users] = useState([
    { id: 1, Date: "2/1/2022", Tasks: "complete task A" },
    { id: 2, Date: "8/1/2022", Tasks: "complete task B" },
    { id: 3, Date: "15/1/2022", Tasks: "complete task C" },
    { id: 4, Date: "6/1/2022", Tasks: "complete task D" },
    { id: 5, Date: "9/1/2022", Tasks: "complete task E" },
  ]);

  return (
    <div className="dashboard_list_container">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.Date}</td>
                <td>{user.Tasks}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
