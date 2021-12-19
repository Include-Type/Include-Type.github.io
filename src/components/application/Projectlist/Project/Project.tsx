import React, { useState } from 'react';
import { ReactElement } from 'react';
import "./Project.css";
import { ProjectModel } from '../../../../models/ProjectModel';

//Meterial UI
// import { createStyles, makeStyles, Theme } from "@mui/material/styles";
// import IconButton from '@mui/material/IconButton';

//Meterial UI icons
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// import DoneAllIcon from '@mui/icons-material/DoneAll';
// import DoneIcon from '@mui/icons-material/Done';
// import { FormControl, FormControlLabel, FormLabel, Popover, Radio, RadioGroup, Tooltip } from '@mui/material';
// import { Tooltip } from '@mui/material';


interface ProjectProps {
    data: ProjectModel,
    // changeProjectPriority: (id: string, priority: string) => void,
    // strikeProject: (id: string) => void,
    // deleteProject: (id: string) => void
};

export default function EachProject(props: ProjectProps): ReactElement {
    const [projectListShow, setProjectLiskShow] = useState<boolean>(false);
    const [fullHeading, setFullHeading] = useState<string>("project_title");

    function toggleProjectDetails(): void {
        setProjectLiskShow(!projectListShow);
        if (fullHeading === "project_title") {
            setFullHeading("show_full_project_title");
        } else {
            setFullHeading("project_title");
        }
    }

    // function strikeProjectHandler(): void {
    //     props.strikeProject(props.data.id);
    // }

    // function deleteProjectHandler(): void {
    //     props.deleteProject(props.data.id);
    // }

    // const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    // const openPriority = Boolean(anchorEl);

    // function priorityOpenHandler(event: React.MouseEvent<HTMLButtonElement>) {
    //     setAnchorEl(event.currentTarget);
    // };

    // function priorityCloseHandler() {
    //     setAnchorEl(null);
    // };

    // function priorityChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    //     props.changeProjectPriority(props.data.id, event.target.value);
    // }

    return (
        <div className="project">
            <div className="project_heading" onClick={toggleProjectDetails}>
                {/* <div className="project_deadline">Due on: {props.data.deadline}</div> */}
                {/* <span className="bar"></span> */}
                <div className="project_proj_name">{props.data.title}</div>
                <div className="project_date">{props.data.date}</div>
                <div className="details">{props.data.details}</div>
            </div>
            {/* {projectListShow ? (
                <div className="project_content">
                    <div>
                        <div className="project_assigned">
                            Assigned to: <span className="assigned_name">{props.data.assigned}</span>
                        </div>
                        <div className="project_content">
                            {props.data.details}
                        </div>
                    </div>
                    <div className="functions">
                        <Tooltip
                            title={<div style={{ fontSize: "0.9vw" }}>Delete project</div>}
                            arrow
                            placement="top"
                        >
                            <IconButton style={{ color: "red" }} size="medium" onClick={deleteProjectHandler}>
                                <DeleteOutlineOutlinedIcon style={{ color: "red" }} fontSize="medium" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title={
                                <div style={{ fontSize: "0.9vw" }}>
                                    {props.data.completed ? "Mark as not done" : "Mark as done"}
                                </div>
                            }
                            arrow
                            placement="top"
                        >
                            <IconButton style={{ color: "green" }} size="medium" onClick={strikeProjectHandler}>
                                {props.data.completed ? (
                                    <DoneAllIcon style={{ color: "green" }} fontSize="medium" />
                                ) : (
                                    <DoneIcon style={{ color: "green" }} fontSize="medium" />
                                )}
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title={
                                <div style={{ fontSize: "0.9vw" }}>
                                    Current priority: {props.data.priority}
                                </div>
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
            )} */}
        </div>
    )
}
