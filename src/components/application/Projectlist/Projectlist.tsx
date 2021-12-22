import React, { CSSProperties, ReactElement, useEffect, useState } from 'react'
import "./Projectlist.css";
import EachProject from "./Project/Project"
import { ProjectModel } from '../../../models/ProjectModel';
import { ProjectDto } from '../../../dtos/ProjectDto';
import { Button, CircularProgress, Snackbar, SnackbarCloseReason } from '@mui/material';
// import { makeStyles, Theme } from '@mui/material/styles';
import SyncIcon from '@mui/icons-material/Sync';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';
import { User } from '../../../models/User';
import "../../spinners/Spinners.css";

const saveButtonStyle: CSSProperties = {
    width: "7vw",
    height: "4.5vh",
    margin: 0,
    marginRight: "5%",
    fontSize: "1vw",
    fontWeight: "bold",
    letterSpacing: "1px",
    fontFamily: "Nunito",
    transitionDuration: ".5s",
    backgroundColor: "green"
};

// const searchButtonStyle: CSSProperties = {
//     width: "8.7vw",
//     height: "4.5vh",
//     margin: 0,
//     marginRight: "5%",
//     fontSize: "1vw",
//     fontWeight: "bold",
//     letterSpacing: "1px",
//     fontFamily: "Nunito",
//     transitionDuration: ".5s",
//     backgroundColor: "blueviolet"
// };

// const proPasswordButtonStyle: CSSProperties = {
//     width: "7vw",
//     height: "4.5vh",
//     margin: 0,
//     fontSize: "1vw",
//     fontWeight: "bold",
//     letterSpacing: "1px",
//     fontFamily: "Nunito",
//     transitionDuration: ".5s",
//     backgroundColor: "darkblue"
// };

interface ProjectlistProps {
    user: User
};

export default function Projectlist(props: ProjectlistProps): ReactElement {
    // const classes = useStyles();

    const [searchKey, setSearchKey] = useState<string>("");

    const [projects, setProjects] = useState<ProjectModel[]>([]);
    const [projectCount, setProjectCount] = useState<number>(projects.length);
    const [execFuse] = useState<number>(0);
    const [status, setStatus] = useState<string>("stopped");
    const [loading, setLoading] = useState<number>(1);

    const [open, setOpen] = useState<boolean>(false);
    const [updateInfo, setUpdateInfo] = useState<string>("");
    const [updateResult, setUpdateResult] = useState<AlertColor | undefined>(undefined);

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    useEffect(() => {
        async function getProjectsByUsername(): Promise<void> {
            try {
                const response = await fetch(`https://include-type.herokuapp.com/api/projectproject/getprojectsbyusernam/${props.user.username}`, {
                    credentials: "include"
                });
                if (response.ok) {
                    // console.log("Projects received!");
                    const jsonProjects: ProjectModel[] = await response.json();
                    // console.log(jsonProjects);
                    setProjects(jsonProjects);
                    setProjectCount(jsonProjects.length);
                    setLoading(0);
                } else {
                    throw new Error();
                }
            } catch (error) {
                // console.log("Error!");
                setProjects([]);
                setProjectCount(0);
                setLoading(0);
            }
        }

        getProjectsByUsername();
    }, [props.user]);

    async function updateProjectsByUsername(e: React.FormEvent): Promise<void> {
        setStatus("started");
        e.preventDefault();
        const updatedProjects: ProjectDto = {
            projects: projects
        };

        try {
            const response = await fetch(`https://include-type.herokuapp.com/api/projectproject/updateprojectsbyusername/${props.user.username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(updatedProjects)
            });
            if (response.ok) {
                setStatus("stopped");
                setUpdateInfo("Projects Updated!");
                setUpdateResult("success");
                handleClick();
            } else {
                throw new Error();
            }
        } catch (error) {
            setStatus("stopped");
            setUpdateInfo("Update Failed!");
            setUpdateResult("error");
            handleClick();
        }
    }

    function handleClick() {
        setOpen(true);
    };

    function handleClose(event: Event | React.SyntheticEvent<Element, Event>, reason?: string | SnackbarCloseReason) {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    // function strikeProject(id: string): void {
    //     let index = projects.findIndex(t => t.id === id);
    //     projects[index].completed = !projects[index].completed;
    //     setProjects(projects);
    //     setExecFuse((prevState) => (prevState + 1));
    // }

    // function deleteProject(id: string): void {
    //     let index = projects.findIndex(t => t.id === id);
    //     projects.splice(index, 1);
    //     setProjects(projects);
    //     setProjectCount((prevState) => (prevState - 1));
    // }

    // function changeProjectPriority(id: string, priority: string): void {
    //     let index = projects.findIndex(t => t.id === id);
    //     projects[index].priority = priority as ProjectPriority;
    //     setProjects(projects);
    //     setExecFuse((prevState) => (prevState + 1));
    // }

    return (
        // <section id="Application_page">
        //     <section id="Status"></section>
        //     <section id="Main_area">
        //         <section id="Application_menu_area"></section>
        //         <section id="Application_content_area">
        <>
            {loading === 1 ? (
                <div className="projectlist_outer_container">
                    <CircularProgress size={60} style={{ color: "rgb(9, 77, 145)" }} />
                </div>
            ) : (
                <div className="projectlist_outer_container">
                    <div className="sync_container">
                        <input
                            type="text"
                            className="form-control search-text"
                            id="search-projects"
                            placeholder="Search projects"
                            value={searchKey}
                            onInput={(e) => setSearchKey(e.currentTarget.value)}
                        />
                        {/* <Button
                            // disabled={status === "started" ? true : false}
                            type="submit"
                            // onClick={(e) => updateProjectsByUsername(e)}
                            variant="contained"
                            color="secondary"
                            size="medium"
                            style={searchButtonStyle}
                            // className={classes.saveButton}
                            startIcon={status === "started" ? "" : <SearchIcon />}
                        >
                            {status === "started" ? (
                                <CircularProgress size={26} style={{ color: "white" }} />
                            ) : (
                                "Search"
                            )}
                        </Button> */}
                    </div>
                    <div className="projectlist_container">
                        {(projectCount > 0) && (execFuse >= 0) ? (
                            <div className="for_scroll_projects">
                                {projects.map((project: ProjectModel) => (
                                    (searchKey === "" ||
                                        project.projId.toLowerCase().includes(searchKey.toLowerCase()) ||
                                        project.title.toLowerCase().includes(searchKey.toLowerCase()) ||
                                        project.details.toLowerCase().includes(searchKey.toLowerCase())) &&
                                    (<span key={project.id}>
                                        <EachProject
                                            data={project}
                                        // changeProjectPriority={changeProjectPriority}
                                        // strikeProject={strikeProject}
                                        // deleteProject={deleteProject}
                                        />
                                    </span>)
                                ))}
                            </div>
                        ) : (
                            <p className="empty_text">You don't have any projects yet!<br></br>🚀</p>
                        )}
                    </div>
                    <div className="sync_container">
                        <Button
                            disabled={status === "started" ? true : false}
                            type="submit"
                            onClick={(e) => updateProjectsByUsername(e)}
                            variant="contained"
                            color="primary"
                            size="medium"
                            style={saveButtonStyle}
                            // className={classes.saveButton}
                            startIcon={status === "started" ? "" : <SyncIcon />}
                        >
                            {status === "started" ? (
                                <CircularProgress size={26} style={{ color: "white" }} />
                            ) : (
                                "Sync"
                            )}
                        </Button>
                        <Snackbar
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            open={open}
                            autoHideDuration={3000}
                            onClose={handleClose}
                        >
                            <Alert
                                onClose={handleClose}
                                severity={updateResult}
                                style={{ fontSize: 18 }}
                            >
                                {updateInfo}
                            </Alert>
                        </Snackbar>
                    </div>
                </div>
            )}
        </>
        //         </section>
        //     </section>
        // </section>
    )
}
