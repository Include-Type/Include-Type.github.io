import React, { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AllPrivacySettings.css";
import "../ProfilePage.css";
import Privacy from "./privacy/Privacy";

import Button from "@mui/material/Button";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
// import { makeStyles, Theme } from "@mui/material/styles";
// import CloudUploadIcon from "@material-ui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";

import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";
import { PrivacyProfile } from "../../../../models/PrivacyProfile";
// import { LoadingSpinnerMedium } from "../../../spinners/Spinners";
import { CircularProgress } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface Privacies {
  id: number,
  label: string;
  name: string;
  value: string;
}

const updateButtonStyle: CSSProperties = {
  width: "7vw",
  height: "4.5vh",
  margin: 0,
  color: "white",
  backgroundColor: "green",
  fontSize: "1vw",
  fontWeight: "bold",
  letterSpacing: "1px",
  fontFamily: "Nunito",
  transitionDuration: ".5s"
};

const privacyButtonStyle: CSSProperties = {
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

interface AllPrivacySettingsProps {
  privacy: PrivacyProfile,
  setPrivacy: React.Dispatch<React.SetStateAction<PrivacyProfile>>
}

export default function AllPrivacySettings({ privacy, setPrivacy }: AllPrivacySettingsProps) {
  const [privacies, setPrivacies] = useState<Privacies[]>([
    {
      id: 0,
      label: "Name",
      name: "Name",
      value: privacy.name,
    },
    {
      id: 1,
      label: "Bio",
      name: "Bio",
      value: privacy.bio,
    },
    {
      id: 2,
      label: "Profile Picture",
      name: "Picture",
      value: privacy.picture,
    },
    {
      id: 3,
      label: "Email",
      name: "Email",
      value: privacy.email,
    },
    {
      id: 4,
      label: "Contact Number",
      name: "Contact",
      value: privacy.contact,
    },
    {
      id: 5,
      label: "Address",
      name: "Address",
      value: privacy.address,
    },
    {
      id: 6,
      label: "Educational Qualifications & Certifications",
      name: "Education",
      value: privacy.education,
    },
    {
      id: 7,
      label: "Professional Roles & Companies (if any)",
      name: "Profession_Company",
      value: privacy.companies,
    },
    {
      id: 8,
      label: "Skills",
      name: "Skills",
      value: privacy.skills,
    },
    {
      id: 9,
      label: "Experience",
      name: "Experience",
      value: privacy.experience,
    },
    {
      id: 10,
      label: "Projects & Other Works",
      name: "Projects_Works",
      value: privacy.projects,
    }
  ]);

  // const classes = useStyles();
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const [updateInfo, setUpdateInfo] = useState<string>("");
  const [updateResult, setUpdateResult] = useState<AlertColor | undefined>(undefined);

  const [status, setStatus] = useState<string>("stopped");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: Event | React.SyntheticEvent<Element, Event>, reason?: string | SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function updatePrivacies(e: React.FormEvent): Promise<void> {
    setStatus("started");
    e.preventDefault();
    const updatedPrivacies: PrivacyProfile = {
      userId: privacy.userId,
      name: privacies[0].value,
      bio: privacies[1].value,
      picture: privacies[2].value,
      email: privacies[3].value,
      contact: privacies[4].value,
      address: privacies[5].value,
      education: privacies[6].value,
      companies: privacies[7].value,
      skills: privacies[8].value,
      experience: privacies[9].value,
      projects: privacies[10].value
    };

    setPrivacy(updatedPrivacies);
    try {
      const response = await fetch(`https://include-type.herokuapp.com/api/user/updateuserprivacyprofile/${privacy.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedPrivacies),
      });
      if (response.ok) {
        setStatus("stopped");
        setUpdateInfo("Privacy Settings Updated!");
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

  return (
    <div id="Profile_Page">
      <div id="Privacy_Settings_Container" className="">
        <div
          id="All_Privacy_Settings"
          className="d-flex justify-content-center align-items-center"
        >
          <div className="privacy_scroll_container">
            <div className="privacy_title">
              Privacy Settings
              <hr className="text-muted" />
            </div>
            <form id="PrivacyForm" className="privacy_form_container">
              {privacies.map((privacy: Privacies) => (
                <Privacy
                  key={privacy.name}
                  privacy={privacy}
                  privacies={privacies}
                  setPrivacies={setPrivacies}
                />
              ))}
            </form>
          </div>
        </div>
        <div className="update_button_container">
          <div className="button_area">
            <Button
              onClick={() => navigate(-1)}
              variant="contained"
              color="primary"
              size="medium"
              style={privacyButtonStyle}
              // className={classes.privacyButton}
              startIcon={
                <SendRoundedIcon style={{ transform: "rotate(180deg)" }} />
              }
            >
              Back
            </Button>
          </div>
          <div className="button_area">
            <Button
              disabled={status === "started" ? true : false}
              onClick={(e) => updatePrivacies(e)}
              form="PrivacyForm"
              type="submit"
              variant="contained"
              style={updateButtonStyle}
              // className={classes.updateButton}
              startIcon={status === "started" ? "" : <SaveIcon />}
            >
              {status === "started" ? (
                <CircularProgress size={26} style={{ color: "white" }} />
              ) : (
                "Save"
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
      </div>
    </div>
  );
}
