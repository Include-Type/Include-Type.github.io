import React, { useState } from 'react';
import { ReactElement } from 'react';
import "./Task.css";
import { Task } from './TaskInterface';

//Meterial UI
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';

//Meterial UI icons
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import NotificationsNoneSharpIcon from '@material-ui/icons/NotificationsNoneSharp';
import DoneIcon from '@material-ui/icons/Done';


interface TaskProps {
    key: string,
    data: Task,
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
};

export default function EachTask(props: TaskProps): ReactElement {

    const [taskListShow, setTaskLiskShow] = useState<boolean>(false);
    const [fullHeading, setFullHeading] = useState<string>("task_title");
    const [striked, setStriked] = useState<string>("task_content");
    const [strikedHead, setStrikedHead] = useState<string>("task_heading");
    const [taskStatus, setTaskStatus] = useState<string>("Mark as done");

    function drop(): void {
        setTaskLiskShow(!taskListShow);
        if (fullHeading === "task_title") {
            setFullHeading("show_full_task_title");
        } else {
            setFullHeading("task_title");
        }
    }

    function strike(): void {
        if (striked === "task_content") {
            setStriked("task_content striked");
            setStrikedHead("task_heading striked");
            setTaskStatus("Mark as not done");
        } else {
            setStriked("task_content");
            setStrikedHead("task_heading");
            setTaskStatus("Mark as done");
        }
    }

    function deleteTask(): void {
        let tempTasks: Task[] = props.tasks.filter(t => t.id !== props.data.id);
        props.setTasks(tempTasks);
    }

    return (
        <div className="task">
            <div className={strikedHead} onClick={drop}>
                <div className="task_deadline">Due on: {props.data.deadline}</div>
                <span className="bar"></span>
                <div className="task_proj_name"><b>{props.data.projName}</b></div>
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
                        <IconButton color="secondary" title="Delete Task" onClick={deleteTask}>
                            <DeleteOutlineOutlinedIcon />
                        </IconButton>
                        <IconButton color="primary" title={taskStatus} onClick={strike}>
                            <DoneIcon />
                        </IconButton>
                        <IconButton color="default" title="Set priority level">
                            <NotificationsNoneSharpIcon />
                        </IconButton>
                    </div>
                </div>
            ) : (
                <p></p>
            )}

        </div>
    )
}
