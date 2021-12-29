import React, { CSSProperties, useState } from "react";
import "./NewUpdateProject.css";
import TitlePage from "./Admin Pages/TitlePage";
import Contributors from "./Admin Pages/Contributors";
import CreateAssignTasks from "./Admin Pages/CreateAssignTasks";
import Button from "@mui/material/Button";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import SaveIcon from "@mui/icons-material/Save";

const adminNavigationButtonStyle: CSSProperties = {
  width: "7vw",
  height: "4.5vh",
  margin: 0,
  fontSize: "1vw",
  fontWeight: "bold",
  letterSpacing: "1px",
  fontFamily: "Nunito",
  transitionDuration: ".5s",
  backgroundColor: "darkblue",
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

export default function NewUpdateProject() {
  const [Page, setPage] = useState<number>(1);

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

  return (
    <div id="new_update_project" className="d-flex justify-content-center">
      <div className="new_update_project_container">
        <div className="new_update_project_title">
          Create / Modify Project
          <hr className="text-muted" />
        </div>
        {Page === 1 ? (
          <div className="title_page_container">
            <TitlePage />
            <div className="d-flex justify-content-end px-2 mt-3">
              <Button
                style={adminNavigationButtonStyle}
                variant="contained"
                endIcon={<NavigateNextRoundedIcon />}
                onClick={NextPageToggler}
              >
                Next
              </Button>
            </div>
          </div>
        ) : Page === 2 ? (
          <div className="contributors_page_container">
            <Contributors />
            <div className="d-flex justify-content-between px-2 mt-3">
              <Button
                style={adminNavigationButtonStyle}
                variant="contained"
                startIcon={<NavigateBeforeRoundedIcon />}
                onClick={PrevPageToggler}
              >
                Prev
              </Button>
              <Button
                style={adminNavigationButtonStyle}
                variant="contained"
                endIcon={<NavigateNextRoundedIcon />}
                onClick={NextPageToggler}
              >
                Next
              </Button>
            </div>
          </div>
        ) : (
          <div className="create_assign_tasks_page_container">
            <CreateAssignTasks />
            <div className="d-flex justify-content-between px-2 mt-3">
              <Button
                style={adminNavigationButtonStyle}
                variant="contained"
                startIcon={<NavigateBeforeRoundedIcon />}
                onClick={PrevPageToggler}
              >
                Prev
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                // className={classes.saveButton}
                style={saveButtonStyle}
                startIcon={<SaveIcon />}
              >Save
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
