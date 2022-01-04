import React, { CSSProperties, useState } from "react";
import TerminateProjectDialog from "./TerminateProjectDialog";
import Button from "@mui/material/Button";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ToggleSwitch from "./ToggleSwitch";
import { ProjectModel } from "../../../../models/ProjectModel";
import { User } from "../../../../models/User";

const terminateButtonStyle: CSSProperties = {
  backgroundColor: "red",
  fontWeight: "bold",
  letterSpacing: 1,
};

interface TitlePageProps {
  user: User,
  project: ProjectModel,
  setProject: React.Dispatch<React.SetStateAction<ProjectModel>>
  updateOrCreateProject: (e: React.FormEvent, message: string) => Promise<void>;
};

export default function TitlePage(props: TitlePageProps) {
  const [open_dialog, setOpenDialog] = useState<boolean>(false);

  const setCheckboxState = (check: boolean) => {
    if (check) {
      props.setProject({ ...props.project, status: "Open" })
    } else {
      props.setProject({ ...props.project, status: "Closed" })
    }
  }

  const terminateProjectCheck = () => {
    setOpenDialog(true);
  };

  return (
    <div className="title_page">
      <div className="row">
        <div className="col-2">
          <label htmlFor="ProjectName" className="form-label">
            Project Name:
          </label>
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            id="ProjectName"
            required
            value={props.project.name}
            onInput={(e) => props.setProject({ ...props.project, name: e.currentTarget.value })}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <label htmlFor="ProjectTitle" className="form-label">
            Project Title:
          </label>
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            id="ProjectTitle"
            required
            value={props.project.about}
            onInput={(e) => props.setProject({ ...props.project, about: e.currentTarget.value })}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <label htmlFor="ProjectDescription" className="form-label">
            Description:
          </label>
        </div>
        <div className="col">
          <textarea
            rows={9}
            className="form-control textarea"
            id="ProjectDescription"
            required
            value={props.project.documentation}
            onInput={(e) => props.setProject({ ...props.project, documentation: e.currentTarget.value })}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <label htmlFor="ProjectStatus" className="form-label">
            Project Status:
          </label>
        </div>
        <div className="col">
          <ToggleSwitch
            label={" "}
            checkbox_state={props.project.status === "Open" ? true : false}
            set_checkbox_state={setCheckboxState}
          />
        </div>
        <div className="col">
          {props.project.status === "Closed" || props.project.status === "Terminated" ? (
            <div className="float-end">
              <Button
                variant="contained"
                style={terminateButtonStyle}
                onClick={terminateProjectCheck}
                endIcon={<DeleteForeverIcon />}
              >
                Terminate Project
              </Button>
              {open_dialog === true ? (
                <TerminateProjectDialog
                  user={props.user}
                  project={props.project}
                  setProject={props.setProject}
                  open_dialog={open_dialog}
                  setOpenDialog={setOpenDialog}
                  updateOrCreateProject={props.updateOrCreateProject}
                />
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
