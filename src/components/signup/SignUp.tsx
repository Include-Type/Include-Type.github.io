import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import Banner from "../login/banner/Banner";
import { User } from "../../models/User";
import { UserDto } from "../../dtos/UserDto";
import { CircularProgress, Tooltip } from "@mui/material";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CreateIcon from '@mui/icons-material/Create';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface SignUpProps {
  setUser: React.Dispatch<React.SetStateAction<User>>,
  setLoginComplete: React.Dispatch<React.SetStateAction<boolean>>
};

export default function SignUp(props: SignUpProps) {
  const [newUser, setNewUser] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    bio: "",
    username: "",
    email: "",
    password: "",
    address: "",
    country: "",
    city: "",
    state: "",
    pincode: "",
    contact: "",
    picture: "",
    isAdmin: false
  });
  const [signupState, setSignupState] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [validUsername, setValidUsername] = useState<number>(-1);
  const [validEmail, setValidEmail] = useState<number>(-1);
  const [checkerTimer, setCheckerTimer] = useState<NodeJS.Timeout>();
  const navigate = useNavigate();

  async function submitForm(e: React.FormEvent): Promise<void> {
    setSignupState("initiated");
    e.preventDefault();
    try {
      const response = await fetch("https://backend-api-pms.onrender.com/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        // console.log("User successfully registered.");
        await login(newUser.username, newUser.password);
      } else {
        throw new Error();
      }
    } catch (error) {
      setSignupState("failed");
      // console.log("Invalid request!");
    }
  }

  async function login(key: string, password: string): Promise<void> {
    const userDto: UserDto = {
      key: key,
      password: password
    };
    // console.log(userDto);
    try {
      const response = await fetch("https://backend-api-pms.onrender.com/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userDto),
      });
      if (response.ok) {
        // console.log("User Login Successfull");
        props.setUser((prevUser) => ({
          ...prevUser,
          id: ""
        }));
        props.setLoginComplete(true);
        navigate("/");
      } else {
        throw new Error();
      }
    } catch (error) {
      setSignupState("failed");
      // console.log("Invalid Credentials!");
    }
  }

  async function checkUsername(key: string): Promise<void> {
    try {
      const response = await fetch(`https://backend-api-pms.onrender.com/api/user/checkforuser/${key}`);
      if (response.ok) {
        const result: string = await response.text();
        if (result.toLowerCase() === "false") {
          setValidUsername(1);
        } else {
          setValidUsername(0);
        }
      } else {
        throw new Error();
      }
    } catch (error) { }
  }

  function startUsernameCheck(username: string): void {
    if (checkerTimer !== undefined) {
      clearTimeout(checkerTimer);
    }
    setNewUser((prevState) => ({
      ...prevState,
      username: username
    }));
    if (username === "") {
      setValidUsername(-1);
    } else {
      setValidUsername(100);
      const timeOutId: NodeJS.Timeout = setTimeout(() => checkUsername(username), 350);
      setCheckerTimer(timeOutId);
    }
  }

  async function checkEmail(key: string): Promise<void> {
    try {
      const response = await fetch(`https://backend-api-pms.onrender.com/api/user/checkforuser/${key}`);
      if (response.ok) {
        const result: string = await response.text();
        if (result.toLowerCase() === "false") {
          setValidEmail(1);
        } else {
          setValidEmail(0);
        }
      } else {
        throw new Error();
      }
    } catch (error) { }
  }

  function startEmailCheck(email: string): void {
    if (checkerTimer !== undefined) {
      clearTimeout(checkerTimer);
    }
    setNewUser((prevState) => ({
      ...prevState,
      email: email
    }));
    if (email === "") {
      setValidEmail(-1);
    } else {
      setValidEmail(100);
      const timeOutId: NodeJS.Timeout = setTimeout(() => checkEmail(email), 350);
      setCheckerTimer(timeOutId);
    }
  }

  return (
    <div className="signUp_page">
      <Banner />
      <div className="signUp_container d-flex align-items-center justify-content-center">
        <form className="signUp_form" id="form_body" onSubmit={submitForm}>
          <div className="signUp_header">Create your account</div>
          <hr className="mb-4" />
          {/* <!-- name --> */}
          <div className="row align-items-center mb-2">
            <div className="col-4 ps-2 pe-2 pb-3">
              <label className="signUp_form_labels">
                People call me:
              </label>
            </div>
            <div className="col ps-2 pe-2 pb-3">
              <input
                id="first_name"
                className="form-control"
                type="text"
                placeholder="First Name"
                name="FIRST"
                required
                value={newUser.firstName}
                onInput={(e) => setNewUser({ ...newUser, firstName: e.currentTarget.value })}
              />
              {/* <label htmlFor="first_name" className="text-muted">
                First Name
              </label> */}
            </div>
            <div className="col ps-2 pe-2 pb-3">
              <input
                id="last_name"
                className="form-control"
                type="text"
                placeholder="Last Name"
                name="FIRST"
                required
                value={newUser.lastName}
                onInput={(e) => setNewUser({ ...newUser, lastName: e.currentTarget.value })}
              />
              {/* <label htmlFor="last_name" className="text-muted">
                Last Name
              </label> */}
            </div>
            <div className="col-1 ps-2 pe-2 pb-3">
              <Tooltip
                title={<div style={{ fontSize: "0.9vw" }}>Your Full Name</div>}
                arrow
                placement="right"
              >
                <AssignmentIndIcon style={{ color: "rgb(9, 77, 145)", fontSize: "150%" }} />
              </Tooltip>
            </div>
          </div>

          {/* <!-- username --> */}
          <div className="row align-items-center mb-2">
            <div className="col-4 ps-2 pe-2 pb-3">
              <label htmlFor="username" className="signUp_form_labels">
                My username will be:
              </label>
            </div>
            <div className="col-7 ps-2 pe-2 pb-3">
              <input
                id="username"
                className="form-control"
                type="text"
                placeholder="Username"
                name="USERNAME"
                required
                value={newUser.username}
                onInput={(e) => startUsernameCheck(e.currentTarget.value)}
              ></input>
            </div>
            <div className="col-1 ps-2 pe-2 pb-3">
              {validUsername === -1 ? (
                <Tooltip
                  title={<div style={{ fontSize: "0.9vw" }}>Your Username</div>}
                  arrow
                  placement="right"
                >
                  <CreateIcon style={{ color: "rgb(9, 77, 145)", fontSize: "150%" }} />
                </Tooltip>
              ) : (
                validUsername === 100 ? (
                  <CircularProgress size={22} style={{ color: "rgb(9, 77, 145)", marginLeft: "5px" }} />
                ) : (
                  validUsername === 1 ? (
                    <Tooltip
                      title={<div style={{ fontSize: "0.9vw" }}>Username is available</div>}
                      arrow
                      placement="right"
                    >
                      <CheckCircleIcon style={{ color: "green", fontSize: "150%" }} />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={<div style={{ fontSize: "0.9vw" }}>Username is not available</div>}
                      arrow
                      placement="right"
                    >
                      <CancelIcon style={{ color: "red", fontSize: "150%" }} />
                    </Tooltip>
                  )
                )
              )}
            </div>
          </div>

          {/* <!-- email --> */}
          <div className="row align-items-center mb-2">
            <div className="col-4 ps-2 pe-2 pb-3">
              <label htmlFor="email" className="signUp_form_labels">
                Drop a mail at:
              </label>
            </div>
            <div className="col-7 ps-2 pe-2 pb-3">
              <input
                type="email"
                name="EMAIL"
                id="email"
                className="form-control"
                placeholder="yourname@example.com"
                required
                value={newUser.email}
                onInput={(e) => startEmailCheck(e.currentTarget.value)}
              ></input>
            </div>
            <div className="col-1 ps-2 pe-2 pb-3">
              {validEmail === -1 ? (
                <Tooltip
                  title={<div style={{ fontSize: "0.9vw" }}>Your Email Id</div>}
                  arrow
                  placement="right"
                >
                  <EmailIcon style={{ color: "rgb(9, 77, 145)", fontSize: "150%" }} />
                </Tooltip>
              ) : (
                validEmail === 100 ? (
                  <CircularProgress size={22} style={{ color: "rgb(9, 77, 145)", marginLeft: "5px" }} />
                ) : (
                  validEmail === 1 ? (
                    <Tooltip
                      title={<div style={{ fontSize: "0.9vw" }}>Email Id is available</div>}
                      arrow
                      placement="right"
                    >
                      <CheckCircleIcon style={{ color: "green", fontSize: "150%" }} />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={<div style={{ fontSize: "0.9vw" }}>Email Id is not available</div>}
                      arrow
                      placement="right"
                    >
                      <CancelIcon style={{ color: "red", fontSize: "150%" }} />
                    </Tooltip>
                  )
                )
              )}
            </div>
          </div>

          {/* <!-- password --> */}
          <div className="row align-items-center mb-2">
            <div className="col-4 ps-2 pe-2 pb-3">
              <label htmlFor="password" className="signUp_form_labels">
                Password:
              </label>
            </div>
            <div className="col-7 ps-2 pe-2 pb-3">
              <input
                type="password"
                id="password"
                className="form-control"
                name="PASS"
                placeholder="enter your password"
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
                value={newUser.password}
                onInput={(e) => setNewUser({ ...newUser, password: e.currentTarget.value })}
              ></input>
            </div>
            <div className="col-1 ps-2 pe-2 pb-3">
              <Tooltip
                title={<div style={{ fontSize: "0.9vw" }}>Your account password</div>}
                arrow
                placement="right"
              >
                <VpnKeyIcon style={{ color: "rgb(9, 77, 145)", fontSize: "150%" }} />
              </Tooltip>
            </div>
          </div>

          <div className="row align-items-center mb-2">
            <div className="col-4 ps-2 pe-2 pb-3">
              <label htmlFor="confirm_password" className="signUp_form_labels">
                Confirm Password:
              </label>
            </div>
            <div className="col-7 ps-2 pe-2 pb-3">
              <input
                type="password"
                id="confirm_password"
                className="form-control"
                name="CONFIRM PASS"
                placeholder="confirm your password"
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
                value={confirmedPassword}
                onInput={(e) => setConfirmedPassword(e.currentTarget.value)}
              ></input>
            </div>
            <div className="col-1 ps-2 pe-2 pb-3">
              {confirmedPassword === "" ? (
                <Tooltip
                  title={<div style={{ fontSize: "0.9vw" }}>Verify your password</div>}
                  arrow
                  placement="right"
                >
                  <LockIcon style={{ color: "rgb(9, 77, 145)", fontSize: "150%" }} />
                </Tooltip>
              ) : (
                confirmedPassword === newUser.password ? (
                  <Tooltip
                    title={<div style={{ fontSize: "0.9vw" }}>Password verified</div>}
                    arrow
                    placement="right"
                  >
                    <CheckCircleIcon style={{ color: "green", fontSize: "150%" }} />
                  </Tooltip>
                ) : (
                  <Tooltip
                    title={<div style={{ fontSize: "0.9vw" }}>Passwords don't match</div>}
                    arrow
                    placement="right"
                  >
                    <CancelIcon style={{ color: "red", fontSize: "150%" }} />
                  </Tooltip>
                )
              )}
            </div>
          </div>

          <hr className="my-4" />

          <div className="mb-3 ps-2 pe-2">
            <input type="checkbox" className="signup_checkbox" id="agree_checkbox" required></input>
            <label htmlFor="agree_checkbox" className="signUp_form_labels ms-2">
              I agree to the terms and conditions
            </label>
            <div id="terms" className="login_option signUp_form_labels ps-2 pe-2">
              T&C
            </div>
          </div>
          <div className="logged_in ps-2 pe-2 pb-2">
            <span className="signUp_form_labels">Already have an account?</span>
            <Link
              to="/login"
              className="login_option signUp_form_labels ms-4"
            >
              Go to your account
            </Link>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button
              disabled={signupState === "initiated" ? true : false}
              className="submit_button_signup"
              type="submit"
              // style={{ height: "5.5vh", width: "18.3vw" }}
            >
              {signupState === "initiated" ? (
                <CircularProgress size={20} style={{ color: "black", marginTop: "8px" }} />
              ) : (
                "Create Account"
              )}
            </button>
          </div>
          <div className="signUp_message">
            {signupState === "failed" ? (
              <p style={{ marginTop: 5, marginBottom: -13 }}>Invalid Credentials! ❌</p>
            ) : (
              <p></p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
