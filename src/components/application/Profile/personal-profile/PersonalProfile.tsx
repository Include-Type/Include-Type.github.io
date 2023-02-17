import React, { CSSProperties, useState } from "react";
// import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import {
  CountryDropdown,
  RegionDropdown,
  // CountryRegionData,
} from "react-country-region-selector";
import "react-phone-input-2/lib/style.css";

import Button from "@mui/material/Button";
// import { makeStyles, Theme } from "@mui/material/styles";
// import CloudUploadIcon from "@mui/icons/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import "./PersonalProfile.css";
import "../ProfilePage.css";

// import profile_dummy from "../../../../Resources/Images/our_team_images/dummy.png";
import DisplayPicture from "./display-picture/DisplayPicture";

import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";
import { User } from "../../../../models/User";
// import { LoadingSpinnerMedium } from "../../../spinners/Spinners";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const saveButtonStyle: CSSProperties = {
  width: "7vw",
  height: "4.5vh",
  margin: 0,
  marginRight: "5%",
  fontSize: "1vw",
  fontWeight: "bold",
  letterSpacing: "1px",
  fontFamily: "Nunito",
  transitionDuration: ".5s",
  backgroundColor: "green",
};

const proPasswordButtonStyle: CSSProperties = {
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

// const styles = (theme: Theme) => ({
//   saveButton: {
//     width: "7vw",
//     height: "4.5vh",
//     margin: theme.spacing(0),
//     marginRight: "5%",
//     fontSize: "1vw",
//     fontWeight: "bold",
//     letterSpacing: "1px",
//     fontFamily: "Nunito",
//     transitionDuration: ".5s",
//     backgroundColor: "green",
//     "&:hover": {
//       color: "green",
//       backgroundColor: "white",
//     },
//   },
//   proPasswordButton: {
//     width: "7vw",
//     height: "4.5vh",
//     margin: theme.spacing(0),
//     fontSize: "1vw",
//     fontWeight: "bold",
//     letterSpacing: "1px",
//     fontFamily: "Nunito",
//     transitionDuration: ".5s",
//     backgroundColor: "darkblue",
//     "&:hover": {
//       color: "darkblue",
//       backgroundColor: "white",
//     },
//   },
// });

interface PersonalProfileProps {
  personalProfile: User;
  setPersonalProfile: React.Dispatch<React.SetStateAction<User>>;
}

export default function PersonalProfile({
  personalProfile,
  setPersonalProfile,
}: PersonalProfileProps) {
  // const classes = useClasses();
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const [updateInfo, setUpdateInfo] = useState<string>("");
  const [updateResult, setUpdateResult] = useState<AlertColor | undefined>(
    undefined
  );

  const [status, setStatus] = useState<string>("stopped");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: Event | React.SyntheticEvent<Element, Event>,
    reason?: string | SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function updateProfile(e: React.FormEvent): Promise<void> {
    setStatus("started");
    e.preventDefault();
    try {
      const response = await fetch(
        `https://backend-api-pms.onrender.com/api/user/updateuser/${personalProfile.username}`,
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
        setStatus("stopped");
        setUpdateInfo("Profile Updated!");
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
      <div
        id="Personal_Profile"
        className="d-flex justify-content-center align-items-center"
      >
        <form className="profile_form d-flex flex-wrap justify-content-center align-items-center">
          <div className="personal_profile_scroll_container">
            <div className="profile_title">
              Personal Profile
              <hr className="text-muted" />
            </div>
            <div className="row personal_profile_container g-0">
              <div className="col-8">
                <div className="row mb-2">
                  <div className="col-6 ps-3 pe-3">
                    <label htmlFor="FirstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="FirstName"
                      required
                      value={personalProfile.firstName}
                      onInput={(e) =>
                        setPersonalProfile({
                          ...personalProfile,
                          firstName: e.currentTarget.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-6 ps-3 pe-3">
                    <label htmlFor="LastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="LastName"
                      required
                      value={personalProfile.lastName}
                      onInput={(e) =>
                        setPersonalProfile({
                          ...personalProfile,
                          lastName: e.currentTarget.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 ps-3 pe-3">
                    <label htmlFor="Bio" className="form-label">
                      Bio
                    </label>
                    <textarea
                      className="form-control textarea"
                      id="Bio"
                      rows={4}
                      value={personalProfile.bio}
                      onInput={(e) =>
                        setPersonalProfile({
                          ...personalProfile,
                          bio: e.currentTarget.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-4 img_col g-4 ps-3 pe-3">
                <div className="profile_image_container ">
                  {/* <img src={profile_dummy} alt="profile" className="profile_image"/> */}
                  <DisplayPicture />
                </div>
              </div>
              <div className="row">
                <div className="col-5 ps-3 pe-3">
                  <label htmlFor="Username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Username"
                    required
                    value={personalProfile.username}
                    onInput={(e) =>
                      setPersonalProfile({
                        ...personalProfile,
                        username: e.currentTarget.value,
                      })
                    }
                    disabled
                  />
                </div>
                <div className="col-7 ps-3 pe-3">
                  <label htmlFor="Email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="Email"
                    required
                    value={personalProfile.email}
                    onInput={(e) =>
                      setPersonalProfile({
                        ...personalProfile,
                        email: e.currentTarget.value,
                      })
                    }
                    disabled
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-5 ps-3 pe-3">
                  <label htmlFor="Address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Address"
                    // placeholder="1234 Main St"
                    required
                    value={personalProfile.address}
                    onInput={(e) =>
                      setPersonalProfile({
                        ...personalProfile,
                        address: e.currentTarget.value,
                      })
                    }
                  />
                </div>
                <div className="col-4 ps-3 pe-3">
                  <label htmlFor="Country" className="form-label">
                    Country
                  </label>
                  <CountryDropdown
                    id="Country"
                    value={personalProfile.country}
                    onChange={(val) =>
                      setPersonalProfile({ ...personalProfile, country: val })
                    }
                    classes="form-control"
                  />
                </div>
                <div className="col-3 ps-3 pe-3">
                  <label htmlFor="Contact" className="form-label">
                    Contact
                  </label>
                  <PhoneInput
                    inputClass="form-control"
                    buttonClass="phone_dropdown_button"
                    dropdownClass="phone_dropdown_container"
                    country={personalProfile.country}
                    value={personalProfile.contact}
                    onChange={(val) =>
                      setPersonalProfile({ ...personalProfile, contact: val })
                    }
                    inputProps={{
                      id: "Contact",
                      name: "phone",
                      required: true,
                      // autoFocus: true,
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-5 ps-3 pe-3">
                  <label htmlFor="State" className="form-label">
                    State
                  </label>
                  <RegionDropdown
                    id="State"
                    country={personalProfile.country}
                    value={personalProfile.state}
                    onChange={(val) =>
                      setPersonalProfile({ ...personalProfile, state: val })
                    }
                    classes="form-control"
                  />
                </div>
                <div className="col-4 ps-3 pe-3">
                  <label htmlFor="City" className="form-label">
                    City
                  </label>
                  <input
                    id="City"
                    type="text"
                    className="form-control"
                    required
                    value={personalProfile.city}
                    onInput={(e) =>
                      setPersonalProfile({
                        ...personalProfile,
                        city: e.currentTarget.value,
                      })
                    }
                  />
                </div>
                <div className="col-3 ps-3 pe-3">
                  <label htmlFor="Pincode" className="form-label">
                    Zip / Pincode
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Pincode"
                    required
                    value={personalProfile.pincode}
                    onInput={(e) =>
                      setPersonalProfile({
                        ...personalProfile,
                        pincode: e.currentTarget.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="profile_buttons_container d-flex align-items-center justify-content-around">
            <div className="button_area">
              <Button
                disabled={status === "started" ? true : false}
                onClick={(e) => updateProfile(e)}
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                // className={classes.saveButton}
                style={saveButtonStyle}
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
            <div className="button_area">
              {/* <Link to="/profile/pro-pass" replace style={{ textDecoration: "none" }}> */}
              <Button
                onClick={() => navigate("/profile/pro-pass")}
                variant="contained"
                color="primary"
                size="medium"
                style={proPasswordButtonStyle}
                // className={classes.proPasswordButton}
                endIcon={<SendRoundedIcon />}
              >
                Next
              </Button>
              {/* </Link> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
