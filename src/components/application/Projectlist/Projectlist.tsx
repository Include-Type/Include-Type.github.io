import { ReactElement, useEffect, useState } from 'react'
import "./Projectlist.css";
import EachProject from "./Project/Project"
import { ProjectModel } from '../../../models/ProjectModel';
import { CircularProgress } from '@mui/material';
// import { makeStyles, Theme } from '@mui/material/styles';
import { User } from '../../../models/User';
import "../../spinners/Spinners.css";

interface ProjectlistProps {
    user: User
};

export default function Projectlist(props: ProjectlistProps): ReactElement {
    // const classes = useStyles();

    const [searchKey, setSearchKey] = useState<string>("");

    const [projects, setProjects] = useState<ProjectModel[]>([]);
    const [projectCount, setProjectCount] = useState<number>(projects.length);
    const [loading, setLoading] = useState<number>(1);

    useEffect(() => {
        async function getProjectsByUsername(): Promise<void> {
            try {
                const response = await fetch(`https://backend-api-pms.onrender.com/api/project/getallprojectsbyusername/${props.user.username}`, {
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
                        {projectCount > 0 ? (
                            <div className="for_scroll_projects">
                                {projects.map((project: ProjectModel) => (
                                    project.status !== "Terminated" &&
                                    (searchKey === "" ||
                                        project.name.toLowerCase().includes(searchKey.toLowerCase()) ||
                                        project.about.toLowerCase().includes(searchKey.toLowerCase()) ||
                                        project.documentation.toLowerCase().includes(searchKey.toLowerCase())) &&
                                    (<span key={project.id}>
                                        <EachProject
                                            data={project}
                                        />
                                    </span>)
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: "center" }}>
                                <p className="empty_text">You don't have any projects yet!</p>
                                <p style={{ fontSize: "5em" }}>😴</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
        //         </section>
        //     </section>
        // </section>
    )
}
