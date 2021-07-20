import React, { useState } from 'react';
import { ReactElement } from 'react';
import "./task.css";
import { Task } from './TaskInterface';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';

interface TaskProps {
    key: string,
    data: Task
  }

export default function EachTask(props: TaskProps): ReactElement {
    
    const [taskListShow,setTaskLiskShow] = useState<boolean>(false);
    const [fullHeading,showFullHeading] = useState<string>("task_title");
    const [striked,setStriked] = useState<string>("task_content");

    function drop(): void{
        setTaskLiskShow(!taskListShow);
        if(fullHeading === "task_title")
        {
            showFullHeading("show_full_task_title");
        }else{
            showFullHeading("task_title");
        }
    }
    

    function strike(): void{
        if(striked === "")
        {
            setStriked("striked");
        }else{
            setStriked("");
        }
    }
    return (
        <div className="task">
            <div className="task_heading" onClick={drop}>
                <div className="task_deadline">Due on: {props.data.deadline}</div>
                <span className="bar"></span>
                <div className="task_proj_name"><b>{props.data.proj_name}</b></div>
                <div className={fullHeading}>{props.data.title}</div>
                <div className="task_date">{props.data.date}</div>
            </div>
            {taskListShow ? (
                <div className="task_content">
                    <div>
                        <div className="task_assigned">Assigned to: <span className="assigned_name">{props.data.assigned}</span></div>
                        <div className={striked}>{props.data.details}</div>
                    </div>
                    <div className="functions">
                        <div className="far fa-trash-alt">Delete</div>
                        <div onClick={strike} className="far fa-check-square">Read</div>
                        <div className="far fa-bell">Important!</div>
                    </div>
                </div>
            ) : (
                <p></p>
            )}
        </div>
    )
}
