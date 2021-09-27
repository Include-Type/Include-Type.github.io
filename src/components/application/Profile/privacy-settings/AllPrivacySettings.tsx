import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AllPrivacySettings.css";
import Privacy from "./privacy/Privacy";

import Button from "@material-ui/core/Button";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SaveIcon from "@material-ui/icons/Save";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps, Color } from "@material-ui/lab/Alert";
import { PrivacyProfile } from "../../../../models/PrivacyProfile";
import { LoadingSpinnerMedium } from "../../../spinners/Spinners";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export interface Privacies {
  id: number,
  label: string;
  name: string;
  value: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    updateButton: {
      margin: theme.spacing(0),
      color: "white",
      backgroundColor: "green",
      fontSize: "1vw",
      fontWeight: "bold",
      letterSpacing: "1px",
      fontFamily: "Nunito",
      transitionDuration: ".5s",
      "&:hover": {
        color: "green",
        backgroundColor: "white",
      },
    },
    privacyButton: {
      margin: theme.spacing(0),
      fontSize: "1vw",
      fontWeight: "bold",
      letterSpacing: "1px",
      fontFamily: "Nunito",
      transitionDuration: ".5s",
      backgroundColor: "blue",
      "&:hover": {
        color: "blue",
        backgroundColor: "white",
      },
    },
  }),
  { index: 1 });

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

  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false);
  const [updateInfo, setUpdateInfo] = useState<string>("");
  const [updateResult, setUpdateResult] = useState<Color | undefined>(undefined);

  const [status, setStatus] = useState<string>("stopped");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
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
          <Form id="PrivacyForm" className="privacy_form_container">
            {privacies.map((privacy: Privacies) => (
              <Privacy
                key={privacy.name}
                privacy={privacy}
                privacies={privacies}
                setPrivacies={setPrivacies}
              />
            ))}
          </Form>
        </div>
      </div>
      <div className="update_button_container">
        <Link to="/ProProfilePassword" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            className={classes.privacyButton}
            startIcon={
              <SendRoundedIcon style={{ transform: "rotate(180deg)" }} />
            }
          >
            Back
          </Button>
        </Link>
        {status === "started" ? (
          <div style={{ height: 54, width: 104 }}>
            <LoadingSpinnerMedium />
          </div>
        ) : (
          <Button
            onClick={(e) => updatePrivacies(e)}
            form="PrivacyForm"
            type="submit"
            variant="contained"
            className={classes.updateButton}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        )}
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={updateResult}
          >
            {updateInfo}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
