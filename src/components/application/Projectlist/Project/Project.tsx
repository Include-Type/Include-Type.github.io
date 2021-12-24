import React from 'react';
import { ReactElement } from 'react';
import "./Project.css";
import { ProjectModel } from '../../../../models/ProjectModel';
import { useNavigate } from 'react-router-dom';

//Meterial UI
// import { createStyles, makeStyles, Theme } from "@mui/material/styles";
// import IconButton from '@mui/material/IconButton';
import { Chip } from '@mui/material';

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
    data: ProjectModel
};

export default function EachProject(props: ProjectProps): ReactElement {
    const navigate = useNavigate();

    function viewProjectDetails(): void {
        navigate(`/projects/${props.data.name}`);
    }

    return (
        <div className="project">
            <div className="project_heading" onClick={() => viewProjectDetails()}>
                <div className="project_proj_name">{props.data.name}</div>
                <div className="project_date">{props.data.date}</div>
                <div className="details">{props.data.about}</div>
                <div className="status">
                    <Chip
                        variant="filled"
                        size="small"
                        color={
                            props.data.status === "Open" ? "info" :
                                props.data.status === "Closed" ? "warning" : "error"
                        }
                        label={props.data.status}
                        style={{ fontSize: "90%" }}
                    />
                </div>
            </div>
        </div>
    )
}
