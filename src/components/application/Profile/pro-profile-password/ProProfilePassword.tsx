import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SaveIcon from "@material-ui/icons/Save";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

import "./ProProfilePassword.css";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
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
    saveButton: {
      margin: "0% 5%",
      fontSize: "1vw",
      fontWeight: "bold",
      letterSpacing: "1px",
      fontFamily: "Nunito",
      transitionDuration: ".5s",
      backgroundColor: "darkblue",
      "&:hover": {
        color: "darkblue",
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

export default function ProProfilePassword() {
  const classes = useStyles();

  const [password_open, setPasswordOpen] = React.useState(false);

  const handleClickPassword = () => {
    setPasswordOpen(true);
  };

  const handleClosePassword = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setPasswordOpen(false);
  };

  const [pro_profile_open, setProProfileOpen] = React.useState(false);

  const handleClickProProfile = () => {
    setProProfileOpen(true);
  };

  const handleCloseProProfile = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setProProfileOpen(false);
  };
  return (
    <div
      id="Professional_Profile_Password"
      className="d-flex justify-content-center align-items-center"
    >
      <Form className="pro_form_container">
        <div className="pro_form_title">
          Professional Profile
          <hr className="text-muted" />
        </div>
        <div className="row">
          <div className="col-6">
            <label htmlFor="Education" className="form-label">
              Educational Qualifications & Certifications:
            </label>
            <textarea className="form-control" id="Education" />
          </div>
          <div className="col-6">
            <label
              htmlFor="Professional_Roles_Companies"
              className="form-label"
            >
              Professional Roles & Companies (if any):
            </label>
            <textarea
              className="form-control"
              id="Professional_Roles_Companies"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label htmlFor="Skills" className="form-label">
              Skills:
            </label>
            <textarea className="form-control" id="Skills" />
          </div>
          <div className="col-6">
            <label htmlFor="Experience" className="form-label">
              Experience:
            </label>
            <div className="row g-0">
              <div className="col">
                <select defaultValue="0" className="form-select" aria-label="Years">
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value=">10">&gt;10</option>
                </select>
              </div>
              <div className="col years_months">&ensp;Years</div>
              <div className="col">
                <select defaultValue="0" className="form-select" aria-label="Months">
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                </select>
              </div>
              <div className="col years_months">&ensp;Months</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label htmlFor="Projects" className="form-label">
              Projects & Other Works:
            </label>
            <textarea className="form-control" id="Projects" />
          </div>
          <div className="col-6 d-flex justify-content-end align-items-end">
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                className={classes.privacyButton}
                startIcon={<SendRoundedIcon style={{ transform: 'rotate(180deg)' }} />}
              >
                Back
              </Button>
            </Link>
            <Button
              onClick={handleClickProProfile}
              variant="contained"
              color="primary"
              size="medium"
              className={classes.saveButton}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={pro_profile_open}
              autoHideDuration={6000}
              onClose={handleCloseProProfile}
            >
              <Alert onClose={handleCloseProProfile} severity="success">
                Professional Profile Data is Saved!
              </Alert>
            </Snackbar>
            <Link to="/AllPrivacySettings" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                className={classes.privacyButton}
                endIcon={<SendRoundedIcon />}
              >
                Next
              </Button>
            </Link>
          </div>
        </div>
      </Form>
      <Form className="password_settings_container">
        <div className="pro_form_title">
          Password Settings
          <hr className="text-muted" />
        </div>
        <div className="row">
          <div className="col-5">
            <label htmlFor="oldPassword" className="form-label">
              Old Password
            </label>
            <input
              type="password"
              className="form-control"
              id="oldPassword"
              required
            />
          </div>
          <div className="col-5">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              required
            />
          </div>
          <div className="col-2 d-flex justify-content-center align-items-end">
            <Button
              onClick={handleClickPassword}
              type="submit"
              variant="contained"
              className={classes.updateButton}
              startIcon={<CloudUploadIcon />}
            >
              Update
            </Button>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={password_open}
              autoHideDuration={6000}
              onClose={handleClosePassword}
            >
              <Alert onClose={handleClosePassword} severity="success">
                Password change initiated!
              </Alert>
            </Snackbar>
          </div>
        </div>
      </Form>
    </div>
  );
}
