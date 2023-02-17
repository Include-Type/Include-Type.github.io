import React, { CSSProperties, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-phone-input-2/lib/style.css";

// import { makeStyles, Theme } from "@mui/material/styles";
// import CloudUploadIcon from "@mui/icons/CloudUpload";
import { Chip } from '@mui/material';
import SendRoundedIcon from "@mui/icons-material/SendRounded";

import "./ProjectDetails.css";
import "../../Profile/personal-profile/PersonalProfile.css";
import "../../Profile/ProfilePage.css";

// import profile_dummy from "../../../../Resources/Images/our_team_images/dummy.png";

import { User } from "../../../../models/User";
import { ProjectDetailsDto } from "../../../../dtos/ProjectDetailsDto";
import { ProjectModel } from "../../../../models/ProjectModel";
import { ProjectMember } from "../../../../models/ProjectMember";
import { Button, CircularProgress } from "@mui/material";
// import { LoadingSpinnerMedium } from "../../../spinners/Spinners";

const backButtonStyle: CSSProperties = {
    width: "7vw",
    height: "4.5vh",
    margin: 0,
    fontSize: "1vw",
    fontWeight: "bold",
    letterSpacing: "1px",
    fontFamily: "Nunito",
    transitionDuration: ".5s",
    backgroundColor: "blue"
};

type ProjectDetailsParams = {
    projName: string
};

interface ProjectDetailsProps {
    user: User
};

export default function ProjectDetails(props: ProjectDetailsProps) {
    const navigate = useNavigate();
    const params = useParams<ProjectDetailsParams>();

    const [project, setProject] = useState<ProjectModel | null>(null);
    const [projMembers, setProjMembers] = useState<ProjectMember[]>([]);
    const [loading, setLoading] = useState<number>(1);

    useEffect(() => {
        async function getProjectDetails(): Promise<void> {
            try {
                const response = await fetch(`https://backend-api-pms.onrender.com/api/project/getprojectdetails/${params.projName}&${props.user.username}`, {
                    credentials: "include"
                });
                if (response.ok) {
                    // console.log("Projects received!");
                    const jsonProject: ProjectDetailsDto = await response.json();
                    // console.log(jsonProject);
                    setProject(jsonProject.project);
                    setProjMembers(jsonProject.projectMembers);
                    setLoading(0);
                } else {
                    throw new Error();
                }
            } catch (error) {
                // console.log("Error!");
                setProject(null);
                setProjMembers([]);
                setLoading(0);
            }
        }

        getProjectDetails();
    }, [params.projName, props.user]);

    return (
        <div id="Profile_Page">
            {loading === 1 ? (
                <div className="loading_spinner">
                    <CircularProgress size={60} style={{ color: "rgb(9, 77, 145)" }} />
                </div>
            ) : (
                <div
                    id="Personal_Profile"
                    className="d-flex justify-content-center align-items-center"
                >
                    <div className="project_form d-flex flex-wrap justify-content-center align-items-center">
                        <div className="personal_project_details_scroll_container">
                            <div className="profile_title">
                                {project!.name}
                                &nbsp;&nbsp;
                                <Chip
                                    variant="filled"
                                    size="small"
                                    color={
                                        project!.status === "Open" ? "info" :
                                            project!.status === "Closed" ? "warning" : "error"
                                    }
                                    label={project!.status}
                                    style={{ fontSize: "45%", fontWeight: "normal" }}
                                />
                                <hr className="text-muted" />
                            </div>
                            <div className="row personal_profile_container g-0">
                                <div className="form-label ps-3">
                                    <div className="data">
                                        <p className="sub-data">Date of creation: &nbsp; {project!.date}</p>
                                    </div>
                                    <div className="data">
                                        <p className="sub-data">About:</p>
                                        <p style={{ fontWeight: "normal" }}>{project!.about}</p>
                                    </div>
                                    <div className="data">
                                        <p className="sub-data">Members: <br></br></p>
                                        {projMembers.map((member: ProjectMember) => (
                                            <ul key={member.id}>
                                                <li>
                                                    <p style={{ fontWeight: "normal" }}>
                                                        Name: {member.name}<br></br>
                                                        Username: {member.username}<br></br>
                                                        Current Role: {member.role}
                                                    </p>
                                                </li>
                                            </ul>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="personal_project_docs_scroll_container">
                            <div className="row personal_profile_container g-0">
                                <div className="form-label ps-3">
                                    <div className="data">
                                        <p className="sub-data">Documentation:</p>
                                        <p style={{ fontWeight: "normal" }}>{project!.documentation}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile_buttons_container d-flex align-items-center justify-content-around">
                            <div>
                                <Button
                                    onClick={() => navigate(-1)}
                                    variant="contained"
                                    color="primary"
                                    size="medium"
                                    style={backButtonStyle}
                                    // className={classes.privacyButton}
                                    startIcon={
                                        <SendRoundedIcon style={{ transform: "rotate(180deg)" }} />
                                    }
                                >
                                    Back
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
