import React, { CSSProperties, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
// import { makeStyles, Theme } from "@mui/material/styles";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

import "./ProProfilePassword.css";
import "../ProfilePage.css";

import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";
import { ProfessionalProfile } from "../../../../models/ProfessionalProfile";
import { User } from "../../../../models/User";
// import { LoadingSpinnerMedium } from "../../../spinners/Spinners";
import { CircularProgress } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const updateButtonStyle: CSSProperties = {
  width: "7vw",
  height: "4.5vh",
  margin: 0,
  marginBottom: "2px",
  color: "white",
  backgroundColor: "green",
  fontSize: "1vw",
  fontWeight: "bold",
  letterSpacing: "1px",
  fontFamily: "Nunito",
  transitionDuration: ".5s",
};

// const saveButtonStyle: CSSProperties = {
//   width: "7vw",
//   height: "4.5vh",
//   margin: "0% 5%",
//   fontSize: "1vw",
//   fontWeight: "bold",
//   letterSpacing: "1px",
//   fontFamily: "Nunito",
//   transitionDuration: ".5s",
//   backgroundColor: "darkblue"
// };

const privacyButtonStyle: CSSProperties = {
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

interface ProProfilePasswordProps {
  personalProfile: User;
  setPersonalProfile: React.Dispatch<React.SetStateAction<User>>;
  professionalProfile: ProfessionalProfile;
  setProfessionalProfile: React.Dispatch<
    React.SetStateAction<ProfessionalProfile>
  >;
}

export default function ProProfilePassword({
  personalProfile,
  setPersonalProfile,
  professionalProfile,
  setProfessionalProfile,
}: ProProfilePasswordProps) {
  // const classes = useStyles();

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [password_open, setPasswordOpen] = useState<boolean>(false);
  const [updatePasswordInfo, setUpdatePasswordInfo] = useState<string>("");
  const [updatePasswordResult, setUpdatePasswordResult] = useState<
    AlertColor | undefined
  >(undefined);

  const [statusPasswordUpdate, setStatusPasswordUpdate] =
    useState<string>("stopped");

  const handleClickPassword = () => {
    setPasswordOpen(true);
  };

  const handleClosePassword = (
    event: Event | React.SyntheticEvent<Element, Event>,
    reason?: string | SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setPasswordOpen(false);
  };

  const [pro_profile_open, setProProfileOpen] = useState<boolean>(false);
  const [updateProProfileInfo, setUpdateProProfileInfo] = useState<string>("");
  const [updateProProfileResult, setUpdateProProfileResult] = useState<
    AlertColor | undefined
  >(undefined);

  const [statusProUpdate, setStatusProUpdate] = useState<string>("stopped");

  const handleClickProProfile = () => {
    setProProfileOpen(true);
  };

  const handleCloseProProfile = (
    event: Event | React.SyntheticEvent<Element, Event>,
    reason?: string | SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setProProfileOpen(false);
  };

  async function updateProProfile(e: React.FormEvent): Promise<void> {
    setStatusProUpdate("started");
    e.preventDefault();
    try {
      const response = await fetch(
        `https://include-type.herokuapp.com/api/user/updateuserprofessionalprofile/${professionalProfile.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(professionalProfile),
        }
      );
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
      const verifier = await fetch(
        `https://include-type.herokuapp.com/api/user/checkpassword/${personalProfile.username}-${oldPassword}`
      );
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
      const response = await fetch(
        `https://include-type.herokuapp.com/api/user/updateuser/${personalProfile.username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(personalProfile),
        }
      );
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
    <div id="Profile_Page">
      <div
        id="Professional_Profile_Password"
        className="d-flex justify-content-center align-items-center"
      >
        <form className="pro_form_container">
          <div className="pro_form_title">
            Professional Profile
            <hr className="text-muted" />
          </div>
          <div className="row">
            <div className="col-6 ps-3 pe-3">
              <label htmlFor="Education" className="form-label">
                Educational Qualifications & Certifications:
              </label>
              <textarea
                className="form-control"
                id="Education"
                value={professionalProfile.education}
                onInput={(e) =>
                  setProfessionalProfile({
                    ...professionalProfile,
                    education: e.currentTarget.value,
                  })
                }
              />
            </div>
            <div className="col-6 ps-3 pe-3">
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
                onInput={(e) =>
                  setProfessionalProfile({
                    ...professionalProfile,
                    companies: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6 ps-3 pe-3">
              <label htmlFor="Skills" className="form-label">
                Skills:
              </label>
              <textarea
                className="form-control"
                id="Skills"
                value={professionalProfile.skills}
                onInput={(e) =>
                  setProfessionalProfile({
                    ...professionalProfile,
                    skills: e.currentTarget.value,
                  })
                }
              />
            </div>
            <div className="col-6 ps-3 pe-3">
              <label htmlFor="Experience" className="form-label">
                Experience:
              </label>
              <div className="row g-0">
                <div className="col">
                  <select
                    defaultValue={professionalProfile.experienceYears}
                    onChange={(e) =>
                      setProfessionalProfile({
                        ...professionalProfile,
                        experienceYears: parseInt(e.target.value),
                      })
                    }
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
                    onChange={(e) =>
                      setProfessionalProfile({
                        ...professionalProfile,
                        experienceMonths: parseInt(e.target.value),
                      })
                    }
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
            <div className="col-6 ps-3 pe-3">
              <label htmlFor="Projects" className="form-label">
                Projects & Other Works:
              </label>
              <textarea
                className="form-control"
                id="Projects"
                value={professionalProfile.projects}
                onInput={(e) =>
                  setProfessionalProfile({
                    ...professionalProfile,
                    projects: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col-12 d-flex justify-content-center align-items-end mt-4">
            <Link to="/profile/personal" style={{ textDecoration: "none" }}>
              <Button
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
            </Link>
            <Button
              disabled={statusProUpdate === "started" ? true : false}
              onClick={(e) => updateProProfile(e)}
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
              // className={classes.updateButton}
              startIcon={statusProUpdate === "started" ? "" : <SaveIcon />}
              style={{ ...updateButtonStyle, marginLeft: 80, marginRight: 80 }}
            >
              {statusProUpdate === "started" ? (
                <CircularProgress size={26} style={{ color: "white" }} />
              ) : (
                "Save"
              )}
            </Button>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={pro_profile_open}
              autoHideDuration={3000}
              onClose={handleCloseProProfile}
            >
              <Alert
                onClose={handleCloseProProfile}
                severity={updateProProfileResult}
                style={{ fontSize: 18 }}
              >
                {updateProProfileInfo}
              </Alert>
            </Snackbar>
            <Link to="/profile/privacy" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                style={privacyButtonStyle}
                // className={classes.privacyButton}
                endIcon={<SendRoundedIcon />}
              >
                Next
              </Button>
            </Link>
          </div>
        </form>
        <form className="password_settings_container">
          <div className="pro_form_title">
            Password Settings
            <hr className="text-muted" />
          </div>
          <div className="row">
            <div className="col-5 ps-3 pe-3">
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
            <div className="col-5 ps-3 pe-3">
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
              <Button
                disabled={statusPasswordUpdate === "started" ? true : false}
                onClick={(e) => updatePassword(e)}
                type="submit"
                variant="contained"
                style={updateButtonStyle}
                // className={classes.updateButton}
                startIcon={
                  statusPasswordUpdate === "started" ? "" : <SaveIcon />
                }
              >
                {statusPasswordUpdate === "started" ? (
                  <CircularProgress size={26} style={{ color: "white" }} />
                ) : (
                  "Save"
                )}
              </Button>
            </div>

            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={password_open}
              autoHideDuration={3000}
              onClose={handleClosePassword}
            >
              <Alert
                onClose={handleClosePassword}
                severity={updatePasswordResult}
                style={{ fontSize: 18 }}
              >
                {updatePasswordInfo}
              </Alert>
            </Snackbar>
          </div>
        </form>
      </div>
    </div>
  );
}
