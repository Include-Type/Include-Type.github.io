import React, { CSSProperties, useEffect, useState } from "react";
import "./NewUpdateProject.css";
import TitlePage from "./Admin Pages/TitlePage";
import Contributors from "./Admin Pages/Contributors";
import CreateAssignTasks from "./Admin Pages/CreateAssignTasks";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import AddBoxIcon from '@mui/icons-material/AddBox';
import SendRoundedIcon from "@mui/icons-material/SendRounded";

import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";
// import { User } from "../../../../models/User";
// import { LoadingSpinnerMedium } from "../../../spinners/Spinners";
import { CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectModel } from "../../../models/ProjectModel";
import { ProjectMember } from "../../../models/ProjectMember";
import { ProjectDetailsDto } from "../../../dtos/ProjectDetailsDto";
import { User } from "../../../models/User";
import { CompleteUserDto } from "../../../dtos/CompleteUserDto";
import { ProjectTask } from "../../../models/ProjectTask";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const adminNavigationButtonStyle: CSSProperties = {
  width: "7vw",
  height: "4.5vh",
  margin: 0,
  fontSize: "1vw",
  fontWeight: "bold",
  letterSpacing: "1px",
  fontFamily: "Nunito",
  transitionDuration: ".5s",
  backgroundColor: "blue",
};

const saveButtonStyle: CSSProperties = {
  width: "7vw",
  height: "4.5vh",
  margin: 0,
  fontSize: "1vw",
  fontWeight: "bold",
  letterSpacing: "1px",
  fontFamily: "Nunito",
  transitionDuration: ".5s",
  backgroundColor: "green"
};

const createButtonStyle: CSSProperties = {
  width: "12vw",
  height: "4.5vh",
  margin: 0,
  fontSize: "1vw",
  fontWeight: "bold",
  letterSpacing: "1px",
  fontFamily: "Nunito",
  transitionDuration: ".5s",
  backgroundColor: "green"
};

type NewUpdateProjectParams = {
  projName: string
};

interface NewUpdateProjectProps {
  user: User
};

const initialProject: ProjectModel = {
  id: "",
  date: "",
  name: "",
  status: "Open",
  about: "",
  documentation: ""
};

const initialTask: ProjectTask = {
  id: "",
  projId: "",
  projName: "",
  title: "",
  date: "",
  details: "",
  deadline: "",
  assigned: "",
  completed: false,
  priority: "",
  author: ""
};

export default function NewUpdateProject(props: NewUpdateProjectProps) {
  const navigate = useNavigate();
  const params = useParams<NewUpdateProjectParams>();
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [Page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<string>("stopped");
  const [open, setOpen] = useState<boolean>(false);
  const [updateInfo, setUpdateInfo] = useState<string>("");
  const [updateResult, setUpdateResult] = useState<AlertColor | undefined>(undefined);
  const [project, setProject] = useState<ProjectModel>(initialProject);
  const [projMembers, setProjMembers] = useState<ProjectMember[]>([]);
  const [task, setTask] = useState<ProjectTask>(initialTask);

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
          setInitialLoad(false);
        } else {
          throw new Error();
        }
      } catch (error) {
        // console.log("Error!");
        setProject(initialProject);
        setProjMembers([]);
        setInitialLoad(true);
      }
    }

    if (params.projName !== "new") {
      getProjectDetails();
    } else {
      setInitialLoad(false);
    }

  }, [params.projName, props.user]);

  async function createProject(): Promise<void> {
    setStatus("started");
    try {
      const response = await fetch(`https://backend-api-pms.onrender.com/api/project/addproject/${props.user.username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(project)
      });
      if (response.ok) {
        // console.log("Project updated!");
        setStatus("stopped");
        setUpdateInfo("Project created successfully.");
        setUpdateResult("success");
        handleClick();
        setTimeout(() => navigate(`/admin/projects/${project.name}`, { replace: true }), 1000);
      } else {
        throw new Error();
      }
    } catch (error) {
      // console.log("Error!");
      setStatus("stopped");
      setUpdateInfo("Project creation failed! Try again.");
      setUpdateResult("error");
      handleClick();
    }
  }

  async function updateProject(message: string): Promise<void> {
    const updatedProject: ProjectModel = project;

    if (message === "termination-password-missmatch") {
      setUpdateInfo("Wrong password! Try again.");
      setUpdateResult("error");
      handleClick();
      return;
    } else if (message === "termination") {
      updatedProject.status = "Terminated";
      setProject(updatedProject);
    } else {
      setStatus("started");
    }

    try {
      const response = await fetch(`https://backend-api-pms.onrender.com/api/project/updateproject/${params.projName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedProject)
      });
      if (response.ok) {
        // console.log("Project updated!");
        if (message === "termination") {
          setUpdateInfo("Project terminated successfully.");
          setTimeout(() => navigate("/admin", { replace: true }), 1700);
        } else {
          setStatus("stopped");
          setUpdateInfo("Project updated successfully.");
        }
        setUpdateResult("success");
        handleClick();
        if (params.projName !== updatedProject.name) {
          navigate(`/admin/projects/${updatedProject.name}`, { replace: true });
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      // console.log("Error!");
      if (message === "termination") {
        setUpdateInfo("Project termination failed! Try again.");
      } else {
        setStatus("stopped");
        setUpdateInfo("Update failed! Try again.");
      }
      setUpdateResult("error");
      handleClick();
    }
  }

  async function updateOrCreateProject(e: React.FormEvent, message: string): Promise<void> {
    e.preventDefault();
    if (params.projName === "new") {
      await createProject();
    } else {
      await updateProject(message);
    }
  }

  async function addProjMember(userKey: string, userRole: string): Promise<void> {
    try {
      const response = await fetch(`https://backend-api-pms.onrender.com/api/user/getuser/${userKey}`, {
        credentials: "include",
      }
      );
      if (response.ok) {
        // console.log("Authenticated User Received");
        const jsonUser: CompleteUserDto = await response.json();
        const newMember: ProjectMember = {
          id: "",
          projName: project.name,
          name: `${jsonUser.user.firstName} ${jsonUser.user.lastName}`,
          role: userRole,
          username: jsonUser.user.username
        };

        for (let i: number = 0; i < projMembers.length; i++) {
          if (projMembers[i].username === newMember.username) {
            setUpdateInfo("Member is already present in the project.");
            setUpdateResult("error");
            handleClick();
            return;
          }
        }
        projMembers.push(newMember);
        setProjMembers(projMembers);
        setUpdateInfo("New member added to the project.");
        setUpdateResult("success");
        handleClick();
      } else {
        throw new Error();
      }
    } catch (error) {
      setUpdateInfo("No member with that username/email is available in the app's database.");
      setUpdateResult("error");
      handleClick();
    }
  }

  async function updateProjMembers(e: React.FormEvent): Promise<void> {
    const updatedProjMembers: ProjectMember[] = projMembers;
    setStatus("started");
    e.preventDefault();
    try {
      const response = await fetch(`https://backend-api-pms.onrender.com/api/project/updateprojectmembers/${params.projName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedProjMembers)
      });
      if (response.ok) {
        // console.log("Project updated!");
        setStatus("stopped");
        setUpdateInfo("Project members updated successfully.");
        setUpdateResult("success");
        handleClick();
      } else {
        throw new Error();
      }
    } catch (error) {
      // console.log("Error!");
      setStatus("stopped");
      setUpdateInfo("Project members updation failed! Try again.");
      setUpdateResult("error");
      handleClick();
    }
  }

  async function createTask(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (
      task.title === "" ||
      task.details === "" ||
      task.assigned === "" ||
      task.priority === "" ||
      task.deadline === "" ||
      task.deadline === null ||
      task.deadline === "null"
    ) {
      setUpdateInfo("Some fields are missing! Check again.");
      setUpdateResult("error");
      handleClick();
      return;
    }

    setStatus("started");
    const projectTask: ProjectTask = task;
    projectTask.projId = project.id;
    projectTask.projName = project.name;
    projectTask.author = props.user.username;

    try {
      const response = await fetch(`https://backend-api-pms.onrender.com/api/projecttask/addtask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(projectTask)
      });
      if (response.ok) {
        // console.log("Project updated!");
        setStatus("stopped");
        setUpdateInfo("Task created successfully.");
        setUpdateResult("success");
        handleClick();
        setTask(initialTask);
        setTimeout(() => navigate("/task_list"), 1500);
      } else {
        throw new Error();
      }
    } catch (error) {
      // console.log("Error!");
      setStatus("stopped");
      setUpdateInfo("Task creation failed! Try again.");
      setUpdateResult("error");
      handleClick();
    }
  }

  const handleClick = () => {
    setOpen(false);
    setOpen(true);
  };

  const handleClose = (
    event: Event | React.SyntheticEvent<Element, Event>,
    reason?: string | SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const NextPageToggler = () => {
    if (Page < 3) {
      setPage(Page + 1);
    }
  };

  const PrevPageToggler = () => {
    if (Page > 1) {
      setPage(Page - 1);
    }
  };

  if (initialLoad) {
    return (
      <div id="new_update_project" className="d-flex">
        <div className="new_update_project_container update_project_spinner">
          <CircularProgress size={60} style={{ color: "rgb(9, 77, 145)" }} />
        </div>
      </div>
    );
  }

  return (
    <div id="new_update_project" className="d-flex">
      <div className="new_update_project_container">
        <div className="new_update_project_title">
          {params.projName === "new" ? (
            "Create New Project"
          ) : (
            project.name
          )}
          <hr className="text-muted" />
        </div>
        {Page === 1 ? (
          <div className="title_page_container">
            <TitlePage
              user={props.user}
              project={project}
              setProject={setProject}
              updateOrCreateProject={updateOrCreateProject}
            />
            <div className="d-flex justify-content-between px-2 mt-3">
              <Button
                disabled={status === "started" || project.name === "" ? true : false}
                onClick={async (e) => await updateOrCreateProject(e, "update")}
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                // className={classes.saveButton}
                style={saveButtonStyle}
                startIcon={status === "started" ? "" : <SaveIcon />}
              >
                {status === "started" ? (
                  <CircularProgress size={26} style={{ color: "white" }} />
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                disabled={params.projName === "new" ? true : false}
                style={adminNavigationButtonStyle}
                variant="contained"
                endIcon={<SendRoundedIcon />}
                onClick={NextPageToggler}
              >
                Next
              </Button>
            </div>
          </div>
        ) : Page === 2 ? (
          <div className="contributors_page_container">
            <Contributors
              user={props.user}
              projMembers={projMembers}
              setProjMembers={setProjMembers}
              addProjMember={addProjMember}
            />
            <div className="d-flex justify-content-between px-2 mt-3">
              <Button
                style={adminNavigationButtonStyle}
                variant="contained"
                startIcon={<SendRoundedIcon style={{ transform: "rotate(180deg)" }} />}
                onClick={PrevPageToggler}
              >
                Back
              </Button>
              <Button
                disabled={status === "started" ? true : false}
                onClick={async (e) => await updateProjMembers(e)}
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                // className={classes.saveButton}
                style={saveButtonStyle}
                startIcon={status === "started" ? "" : <SaveIcon />}
              >
                {status === "started" ? (
                  <CircularProgress size={26} style={{ color: "white" }} />
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                style={adminNavigationButtonStyle}
                variant="contained"
                endIcon={<SendRoundedIcon />}
                onClick={NextPageToggler}
              >
                Next
              </Button>
            </div>
          </div>
        ) : (
          <div className="create_assign_tasks_page_container">
            <CreateAssignTasks
              user={props.user}
              projMembers={projMembers}
              task={task}
              setTask={setTask}
            />
            <div className="d-flex justify-content-between px-2 mt-3">
              <Button
                style={adminNavigationButtonStyle}
                variant="contained"
                startIcon={<SendRoundedIcon style={{ transform: "rotate(180deg)" }} />}
                onClick={PrevPageToggler}
              >
                Back
              </Button>
              <Button
                // disabled={status === "started" ? true : false}
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                // className={classes.saveButton}
                style={createButtonStyle}
                startIcon={status === "started" ? "" : <AddBoxIcon />}
                onClick={async (e) => await createTask(e)}
              >
                {status === "started" ? (
                  <CircularProgress size={26} style={{ color: "white" }} />
                ) : (
                  "Create Task"
                )}
              </Button>
            </div>
          </div>
        )}
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
  );
}
