import React, { CSSProperties, useState } from "react";
import TerminateProjectDialog from "./TerminateProjectDialog";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { fontWeight } from "@mui/system";
import ToggleSwitch from "./ToggleSwitch";

const terminateButtonStyle: CSSProperties = {
  backgroundColor: "red",
  fontWeight: "bold",
  letterSpacing: 1,
};

export default function TitlePage() {
  const [open_dialog, setOpenDialog] = useState<boolean>(false);
  const [CheckboxState, setCheckboxState] = useState(false);

  const terminateProjectCheck = () => {
    setOpenDialog(true);
  };

  return (
    <div className="title_page">
      <div className="row">
        <div className="col-2">
          <label htmlFor="ProjectTitle" className="form-label">
            Project Title :
          </label>
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            id="ProjectTitle"
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <label htmlFor="ProjectDescription" className="form-label">
            Description :
          </label>
        </div>
        <div className="col">
          <textarea
            rows={12}
            className="form-control textarea"
            id="ProjectDescription"
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <label htmlFor="ProjectStatus" className="form-label">
            Project Status :
          </label>
        </div>
        <div className="col">
          <ToggleSwitch
            label={" "}
            checkbox_state={CheckboxState}
            set_checkbox_state={setCheckboxState}
          />
        </div>
        <div className="col">
          {CheckboxState === false ? (
            <div className="float-end">
              <Button
                variant="contained"
                style={terminateButtonStyle}
                onClick={terminateProjectCheck}
                endIcon={<CloseRoundedIcon />}
              >
                Terminate Project
              </Button>
              {open_dialog === true ? (
                <TerminateProjectDialog
                  open_dialog={open_dialog}
                  setOpenDialog={setOpenDialog}
                />
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
