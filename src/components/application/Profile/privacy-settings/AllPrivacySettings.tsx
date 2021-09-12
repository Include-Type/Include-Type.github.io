import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AllPrivacySettings.css";
import Privacy from "./privacy/Privacy";

import Button from "@material-ui/core/Button";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export interface Privacies {
  label: string;
  name: string;
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
  })
);

export default function AllPrivacySettings() {
  const privacies: Privacies[] = [
    {
      label: "Name",
      name: "Name",
    },
    {
      label: "Bio",
      name: "Bio",
    },
    {
      label: "Profile Picture",
      name: "Picture",
    },
    {
      label: "Email",
      name: "Email",
    },
    {
      label: "Contact Number",
      name: "Contact",
    },
    {
      label: "Address",
      name: "Address",
    },
    {
      label: "Educational Qualifications & Certifications",
      name: "Education",
    },
    {
      label: "Professional Roles & Companies (if any)",
      name: "Profession_Company",
    },
    {
      label: "Skills",
      name: "Skills",
    },
    {
      label: "Experience",
      name: "Experience",
    },
    {
      label: "Projects & Other Works",
      name: "Projects_Works",
    },
  ];

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
              <Privacy key={privacy.name} privacy={privacy} />
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
        <Button
          onClick={handleClick}
          form="PrivacyForm"
          type="submit"
          variant="contained"
          className={classes.updateButton}
          startIcon={<CloudUploadIcon />}
        >
          Update
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Privacy Settings Updated!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
