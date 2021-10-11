import React, { ChangeEvent, useState } from 'react';
import { ReactElement } from 'react';
import "./Task.css";
import { Task } from './TaskInterface';

//Meterial UI
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';

//Meterial UI icons
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DoneIcon from '@material-ui/icons/Done';
import { FormControl, FormControlLabel, FormLabel, Popover, Radio, RadioGroup, Tooltip } from '@material-ui/core';


interface TaskProps {
    data: Task,
    changeTaskPriority: (id: string, priority: string) => void,
    strikeTask: (id: string) => void,
    deleteTask: (id: string) => void
};

export default function EachTask(props: TaskProps): ReactElement {
    const [taskListShow, setTaskLiskShow] = useState<boolean>(false);
    const [fullHeading, setFullHeading] = useState<string>("task_title");

    function toggleTaskDetails(): void {
        setTaskLiskShow(!taskListShow);
        if (fullHeading === "task_title") {
            setFullHeading("show_full_task_title");
        } else {
            setFullHeading("task_title");
        }
    }

    function strikeTaskHandler(): void {
        props.strikeTask(props.data.id);
    }

    function deleteTaskHandler(): void {
        props.deleteTask(props.data.id);
    }

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const openPriority = Boolean(anchorEl);

    function priorityOpenHandler(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    };

    function priorityCloseHandler() {
        setAnchorEl(null);
    };

    function priorityChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        props.changeTaskPriority(props.data.id, event.target.value);
    }

    return (
        <div className={`task${props.data.completed ? " striked" : ""}`}>
            <div className={`task_heading ${props.data.priority.toLowerCase()}_priority_head`} onClick={toggleTaskDetails}>
                <div className="task_deadline">Due on: {props.data.deadline}</div>
                <span className="bar"></span>
                <div className="task_proj_name"><b>{props.data.projName}</b></div>
                <div className={fullHeading}>{props.data.title}</div>
                <div className="task_date">{props.data.date}</div>
            </div>
            {taskListShow ? (
                <div className={`task_content ${props.data.priority.toLowerCase()}_priority_content`}>
                    <div>
                        <div className="task_assigned">
                            Assigned to: <span className="assigned_name">{props.data.assigned}</span>
                        </div>
                        <div className="task_content">
                            {props.data.details}
                        </div>
                    </div>
                    <div className="functions">
                        <Tooltip
                            title={<text style={{ fontSize: "0.9vw" }}>Delete task</text>}
                            arrow
                            placement="top"
                        >
                            <IconButton style={{ color: "red" }} size="medium" onClick={deleteTaskHandler}>
                                <DeleteOutlineOutlinedIcon style={{ color: "red" }} fontSize="medium" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title={
                                <text style={{ fontSize: "0.9vw" }}>
                                    {props.data.completed ? "Mark as not done" : "Mark as done"}
                                </text>
                            }
                            arrow
                            placement="top"
                        >
                            <IconButton style={{ color: "green" }} size="medium" onClick={strikeTaskHandler}>
                                {props.data.completed ? (
                                    <DoneAllIcon style={{ color: "green" }} fontSize="medium" />
                                ) : (
                                    <DoneIcon style={{ color: "green" }} fontSize="medium" />
                                )}
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title={
                                <text style={{ fontSize: "0.9vw" }}>
                                    Current priority: {props.data.priority}
                                </text>
                            }
                            arrow
                            placement="top"
                        >
                            <IconButton style={{ color: "blueviolet" }} size="medium" onClick={priorityOpenHandler}>
                                {props.data.priority === "High" ? (
                                    <NotificationsActiveIcon style={{ color: "blueviolet" }} fontSize="medium" />
                                ) : (
                                    props.data.priority === "Medium" ? (
                                        <NotificationsIcon style={{ color: "blueviolet" }} fontSize="medium" />
                                    ) : (
                                        <NotificationsNoneIcon style={{ color: "blueviolet" }} fontSize="medium" />
                                    )
                                )}
                            </IconButton>
                        </Tooltip>
                        <Popover
                            open={openPriority}
                            anchorEl={anchorEl}
                            onClose={priorityCloseHandler}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <FormControl component="fieldset" style={{ padding: 15, background: "rgba(123, 235, 255, 0.651)" }}>
                                <FormLabel component="legend" style={{ fontWeight: "bold", color: "black" }}>Set Priority</FormLabel>
                                <RadioGroup
                                    row
                                    value={props.data.priority}
                                    onChange={priorityChangeHandler}
                                >
                                    <FormControlLabel value="High" control={<Radio style={{ color: "rgba(255, 151, 109, 0.699)" }} />} label="High" />
                                    <FormControlLabel value="Medium" control={<Radio style={{ color: "rgba(245, 213, 32, 0.678)" }} />} label="Medium" />
                                    <FormControlLabel value="Low" control={<Radio style={{ color: "rgba(255, 136, 255, 0.678)" }} />} label="Low" />
                                </RadioGroup>
                            </FormControl>
                        </Popover>
                    </div>
                </div>
            ) : (
                <p></p>
            )}
        </div>
    )
}
