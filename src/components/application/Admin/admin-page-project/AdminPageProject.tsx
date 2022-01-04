import React from 'react';
import { ReactElement } from 'react';
import "../../Projectlist/Project/Project.css";
import { ProjectModel } from '../../../../models/ProjectModel';
import { useNavigate } from 'react-router-dom';
import { Chip } from '@mui/material';

interface AdminPageProjectProps {
    data: ProjectModel
};

export default function AdminPageProject(props: AdminPageProjectProps): ReactElement {
    const navigate = useNavigate();

    return (
        <div className="project">
            <div className="project_heading" onClick={() => navigate(`/admin/projects/${props.data.name}`)}>
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
