import React, { useState } from 'react';
import "./task.css";
import { Task } from './TaskInterface';

interface TaskProps {
    key: string,
    data: Task
  }

export default function EachTask(props: TaskProps) {
    function drop(){
        setTaskLiskShow(!taskListShow);
    }
    
    const [taskListShow,setTaskLiskShow] = useState<boolean>(false);

    return (
        <div className="task">
            <div className="task_heading" onClick={drop}>
                <div className="task_deadline">Due on: {props.data.deadline}</div>
                <span className="bar"></span>
                <div className="task_proj_name"><b>{props.data.proj_name}</b></div>
                <div className="task_title">{props.data.title}</div>
                <div className="task_date">{props.data.date}</div>
            </div>
            {taskListShow ? (
                <div className="task_content">
                    <div className="task_assigned">Assigned to: <span className="assigned_name">{props.data.assigned}</span></div>
                    <div className="task_data">{props.data.details}</div>
                </div>
            ) : (
                <p></p>
            )}
            <div className="functions">
                <i className="far fa-check-square"></i>
                <i className="far fa-bell"></i>
                <i className="far fa-trash-alt"></i>
            </div>
        </div>
    )
}
