import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles, Theme } from "@material-ui/core/styles";
// import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SaveIcon from "@material-ui/icons/Save";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

import "./ProProfilePassword.css";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps, Color } from "@material-ui/lab/Alert";
import { ProfessionalProfile } from "../../../../models/ProfessionalProfile";
import { User } from "../../../../models/User";
import { LoadingSpinnerMedium } from "../../../spinners/Spinners";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
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
}), { index: 1 });

interface ProProfilePasswordProps {
  personalProfile: User,
  setPersonalProfile: React.Dispatch<React.SetStateAction<User>>,
  professionalProfile: ProfessionalProfile,
  setProfessionalProfile: React.Dispatch<React.SetStateAction<ProfessionalProfile>>
};

export default function ProProfilePassword({ personalProfile, setPersonalProfile, professionalProfile, setProfessionalProfile }: ProProfilePasswordProps) {
  const classes = useStyles();

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [password_open, setPasswordOpen] = useState<boolean>(false);
  const [updatePasswordInfo, setUpdatePasswordInfo] = useState<string>("");
  const [updatePasswordResult, setUpdatePasswordResult] = useState<Color | undefined>(undefined);

  const [statusPasswordUpdate, setStatusPasswordUpdate] = useState<string>("stopped");

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

  const [pro_profile_open, setProProfileOpen] = useState<boolean>(false);
  const [updateProProfileInfo, setUpdateProProfileInfo] = useState<string>("");
  const [updateProProfileResult, setUpdateProProfileResult] = useState<Color | undefined>(undefined);

  const [statusProUpdate, setStatusProUpdate] = useState<string>("stopped");

  const handleClickProProfile = () => {
    setProProfileOpen(true);
  };

  const handleCloseProProfile = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setProProfileOpen(false);
  };

  async function updateProProfile(e: React.FormEvent): Promise<void> {
    setStatusProUpdate("started");
    e.preventDefault();
    try {
      const response = await fetch(`https://include-type.herokuapp.com/api/user/updateuserprofessionalprofile/${professionalProfile.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(professionalProfile),
      });
      if (response.ok) {
        setStatusProUpdate("stopped");
        setUpdateProProfileInfo("Professional Profile Updated!");
        setUpdateProProfileResult("success");
        handleClickProProfile();
      } else {
        throw new Error();
      }
    } catch (error) {
      setStatusProUpdate("stopped");
      setUpdateProProfileInfo("Update Failed!");
      setUpdateProProfileResult("error");
      handleClickProProfile();
    }
  }

  async function updatePassword(e: React.FormEvent): Promise<void> {
    setStatusPasswordUpdate("started");
    e.preventDefault();
    try {
      const verifier = await fetch(`https://include-type.herokuapp.com/api/user/checkpassword/${personalProfile.username}-${oldPassword}`);
      if (verifier.ok) {
        const isValid: string = await verifier.text();
        if (isValid.toLowerCase() === "false") {
          setStatusPasswordUpdate("stopped");
          setOldPassword("");
          setNewPassword("");
          setUpdatePasswordInfo("Old Password Doesn't Match!");
          setUpdatePasswordResult("error");
          handleClickPassword();
          return;
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      setStatusPasswordUpdate("stopped");
      setOldPassword("");
      setNewPassword("");
      setUpdatePasswordInfo("Update Failed!");
      setUpdatePasswordResult("error");
      handleClickPassword();
      return;
    }

    personalProfile.password = newPassword;
    setPersonalProfile(personalProfile);
    try {
      const response = await fetch(`https://include-type.herokuapp.com/api/user/updateuser/${personalProfile.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(personalProfile),
      });
      if (response.ok) {
        setStatusPasswordUpdate("stopped");
        setOldPassword("");
        setNewPassword("");
        setUpdatePasswordInfo("Password Updated!");
        setUpdatePasswordResult("success");
        handleClickPassword();
      } else {
        throw new Error();
      }
    } catch (error) {
      setStatusPasswordUpdate("stopped");
      setOldPassword("");
      setNewPassword("");
      setUpdatePasswordInfo("Update Failed!");
      setUpdatePasswordResult("error");
      handleClickPassword();
    }
  }

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
            <textarea
              className="form-control"
              id="Education"
              value={professionalProfile.education}
              onInput={(e) => setProfessionalProfile({ ...professionalProfile, education: e.currentTarget.value })}
            />
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
              value={professionalProfile.companies}
              onInput={(e) => setProfessionalProfile({ ...professionalProfile, companies: e.currentTarget.value })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label htmlFor="Skills" className="form-label">
              Skills:
            </label>
            <textarea
              className="form-control"
              id="Skills"
              value={professionalProfile.skills}
              onInput={(e) => setProfessionalProfile({ ...professionalProfile, skills: e.currentTarget.value })}
            />
          </div>
          <div className="col-6">
            <label htmlFor="Experience" className="form-label">
              Experience:
            </label>
            <div className="row g-0">
              <div className="col">
                <select
                  defaultValue={professionalProfile.experienceYears}
                  onChange={(e) => setProfessionalProfile({ ...professionalProfile, experienceYears: parseInt(e.target.value) })}
                  className="form-select"
                  aria-label="Years"
                >
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
                <select
                  defaultValue={professionalProfile.experienceMonths}
                  onChange={(e) => setProfessionalProfile({ ...professionalProfile, experienceMonths: parseInt(e.target.value) })}
                  className="form-select"
                  aria-label="Months"
                >
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
            <textarea
              className="form-control"
              id="Projects"
              value={professionalProfile.projects}
              onInput={(e) => setProfessionalProfile({ ...professionalProfile, projects: e.currentTarget.value })}
            />
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
            {statusProUpdate === "started" ? (
              <div style={{ height: 52, width: 154.8 }}>
                <LoadingSpinnerMedium />
              </div>
            ) : (
              <Button
                onClick={(e) => updateProProfile(e)}
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                className={classes.updateButton}
                startIcon={<SaveIcon />}
                style={{ marginLeft: 20, marginRight: 20 }}
              >
                Save
              </Button>
            )}
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={pro_profile_open}
              autoHideDuration={5000}
              onClose={handleCloseProProfile}
            >
              <Alert
                onClose={handleCloseProProfile}
                severity={updateProProfileResult}
              >
                {updateProProfileInfo}
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
              value={oldPassword}
              onInput={(e) => setOldPassword(e.currentTarget.value)}
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
              value={newPassword}
              onInput={(e) => setNewPassword(e.currentTarget.value)}
            />
          </div>
          <div className="col-2 d-flex justify-content-center align-items-end">
            {statusPasswordUpdate === "started" ? (
              <div style={{ height: 51 }}>
                <LoadingSpinnerMedium />
              </div>
            ) : (
              <Button
                onClick={(e) => updatePassword(e)}
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
              open={password_open}
              autoHideDuration={5000}
              onClose={handleClosePassword}
            >
              <Alert
                onClose={handleClosePassword}
                severity={updatePasswordResult}
              >
                {updatePasswordInfo}
              </Alert>
            </Snackbar>
          </div>
        </div>
      </Form>
    </div>
  );
}
