import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import "./AdminPage.css";
import { useNavigate } from "react-router-dom";
import { User } from "../../../models/User";
import { useState, useEffect, CSSProperties } from "react";
import { ProjectModel } from "../../../models/ProjectModel";
import { CircularProgress } from "@mui/material";
import AdminPageProject from "./admin-page-project/AdminPageProject";
import "../Projectlist/Projectlist.css";

const addButtonStyle: CSSProperties = {
  width: "11vw",
  height: "4.5vh",
  margin: 10,
  fontSize: "1vw",
  letterSpacing: "1px",
  fontFamily: "Nunito",
  transitionDuration: ".5s",
  backgroundColor: "blue",
};

interface AdminPageProps {
  user: User
};

export default function AdminPage(props: AdminPageProps) {
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState<string>("");

  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [projectCount, setProjectCount] = useState<number>(projects.length);
  const [loading, setLoading] = useState<number>(1);

  useEffect(() => {
    async function getProjectsByUsername(): Promise<void> {
      try {
        const response = await fetch(`https://include-type.herokuapp.com/api/project/getallprojectsbyusername/${props.user.username}`, {
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
    <div id="admin_panel" className="d-flex justify-content-center">
      <div className="admin_container">
        <div className="admin_title">
          Admin Panel
          <hr className="text-muted" />
        </div>
        {loading === 1 ? (
          <div className="project_list_outer_container">
            <CircularProgress size={60} style={{ color: "rgb(9, 77, 145)" }} />
          </div>
        ) : (
          <div className="project_list_outer_container">
            <div className="sync_container">
              <input
                type="text"
                className="form-control search-text"
                id="search-projects"
                placeholder="Search projects"
                value={searchKey}
                onInput={(e) => setSearchKey(e.currentTarget.value)}
              />
              <Button
                onClick={() => navigate("/admin/projects/new")}
                variant="contained"
                style={addButtonStyle}
                startIcon={<AddRoundedIcon />}
              >
                New Project
              </Button>
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
                      <AdminPageProject
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
      </div>
    </div>
  );
}
