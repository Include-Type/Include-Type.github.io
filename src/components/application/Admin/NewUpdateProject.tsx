import React, { useState } from "react";
import "./NewUpdateProject.css";
import TitlePage from "./Admin Pages/TitlePage";
import Contributors from "./Admin Pages/Contributors";
import CreateAssignTasks from "./Admin Pages/CreateAssignTasks";
import Button from "@mui/material/Button";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";

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
            <div className="d-flex justify-content-end px-2">
              <Button
                className="next_button"
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
            <div className="d-flex justify-content-between px-2">
              <Button
                className="prev_button"
                variant="contained"
                startIcon={<NavigateBeforeRoundedIcon />}
                onClick={PrevPageToggler}
              >
                Prev
              </Button>
              <Button
                className="next_button"
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
            <div className="d-flex px-2">
              <Button
                className="prev_button"
                variant="contained"
                startIcon={<NavigateBeforeRoundedIcon />}
                onClick={PrevPageToggler}
              >
                Prev
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
