import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./SignUp.css";
import Banner from "../login/banner/Banner";
import {
  LoadingSpinnerSmall,
  LoadingSpinnerMedium,
} from "../spinners/Spinners";
import { User } from "../../models/User";
import { UserDto } from "../../dtos/UserDto";

interface SignUpProps {
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setLoginComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignUp(props: SignUpProps) {
  const [newUser, setNewUser] = useState<User>({
    userId: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [signupState, setSignupState] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [validUsername, setValidUsername] = useState<number>(-1);
  const [validEmail, setValidEmail] = useState<number>(-1);
  const [checkerTimer, setCheckerTimer] = useState<NodeJS.Timeout>();
  const history = useHistory();

  async function submitForm(e: React.FormEvent): Promise<void> {
    setSignupState("initiated");
    e.preventDefault();
    try {
      const response = await fetch(
        "https://include-type.herokuapp.com/api/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(newUser),
        }
      );
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
      password: password,
    };
    // console.log(userDto);
    try {
      const response = await fetch(
        "https://include-type.herokuapp.com/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userDto),
        }
      );
      if (response.ok) {
        // console.log("User Login Successfull");
        props.setUser((prevUser) => ({
          ...prevUser,
          userId: "",
        }));
        props.setLoginComplete(true);
        history.push("/");
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
      const response = await fetch(
        `https://include-type.herokuapp.com/api/user/checkforuser/${key}`
      );
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
    } catch (error) {}
  }

  function startUsernameCheck(username: string): void {
    if (checkerTimer !== undefined) {
      clearTimeout(checkerTimer);
    }
    setNewUser((prevState) => ({
      ...prevState,
      username: username,
    }));
    if (username === "") {
      setValidUsername(-1);
    } else {
      setValidUsername(100);
      const timeOutId: NodeJS.Timeout = setTimeout(
        () => checkUsername(username),
        350
      );
      setCheckerTimer(timeOutId);
    }
  }

  async function checkEmail(key: string): Promise<void> {
    try {
      const response = await fetch(
        `https://include-type.herokuapp.com/api/user/checkforuser/${key}`
      );
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
    } catch (error) {}
  }

  function startEmailCheck(email: string): void {
    if (checkerTimer !== undefined) {
      clearTimeout(checkerTimer);
    }
    setNewUser((prevState) => ({
      ...prevState,
      email: email,
    }));
    if (email === "") {
      setValidEmail(-1);
    } else {
      setValidEmail(100);
      const timeOutId: NodeJS.Timeout = setTimeout(
        () => checkEmail(email),
        350
      );
      setCheckerTimer(timeOutId);
    }
  }

  return (
    <div className="signUp_page">
      <Banner />
      <div className="signUp_container d-flex align-items-center justify-content-center">
        <Form className="signUp_form" id="form_body" onSubmit={submitForm}>
          <div className="signUp_header">Create your account</div>
          <hr className="mb-4" />
          {/* <!-- name --> */}
          <div className="row align-items-center mb-1">
            <div className="col">
              <label className="signUp_form_labels mb-3">People call me:</label>
            </div>
            <div className="col">
              <input
                id="first_name"
                className="form-control"
                type="text"
                placeholder="First Name"
                name="FIRST"
                required
                value={newUser.firstName}
                onInput={(e) =>
                  setNewUser({ ...newUser, firstName: e.currentTarget.value })
                }
              />
              {/* <label htmlFor="first_name" className="text-muted">
                First Name
              </label> */}
            </div>
            <div className="col">
              <input
                id="last_name"
                className="form-control"
                type="text"
                placeholder="Last Name"
                name="FIRST"
                required
                value={newUser.lastName}
                onInput={(e) =>
                  setNewUser({ ...newUser, lastName: e.currentTarget.value })
                }
              />
              {/* <label htmlFor="last_name" className="text-muted">
                Last Name
              </label> */}
            </div>
          </div>

          {/* <!-- username --> */}
          <div className="row align-items-center mb-1">
            <div className="col-4">
              <label htmlFor="username" className="signUp_form_labels">
                My username will be:
              </label>
            </div>
            <div className="col-8">
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
              {validUsername === -1 ? (
                <p></p>
              ) : validUsername === 100 ? (
                <div className="signUp_message">
                  <LoadingSpinnerSmall />
                </div>
              ) : validUsername === 1 ? (
                <div className="signUp_message">
                  <p className="valid_message">
                    {newUser.username} is available. ✅
                  </p>
                </div>
              ) : (
                <div className="signUp_message">
                  <p className="invalid_message">
                    {newUser.username} is not available. ❌
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* <!-- email --> */}
          <div className="row align-items-center mb-1">
            <div className="col-4">
              <label htmlFor="email" className="signUp_form_labels">
                Drop a mail at:
              </label>
            </div>
            <div className="col-8">
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
              {validEmail === -1 ? (
                <p></p>
              ) : validEmail === 100 ? (
                <div className="signUp_message">
                  <LoadingSpinnerSmall />
                </div>
              ) : validEmail === 1 ? (
                <div className="signUp_message">
                  <p className="valid_message">
                    {newUser.email} is available. ✅
                  </p>
                </div>
              ) : (
                <div className="signUp_message">
                  <p className="invalid_message">
                    {newUser.email} is not available. ❌
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* <!-- password --> */}
          <div className="row align-items-center mb-1">
            <div className="col-4">
              <label htmlFor="password" className="signUp_form_labels">
                Password:
              </label>
            </div>
            <div className="col-8">
              <input
                type="password"
                id="password"
                className="form-control"
                name="PASS"
                placeholder="enter your password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
                value={newUser.password}
                onInput={(e) =>
                  setNewUser({ ...newUser, password: e.currentTarget.value })
                }
              ></input>
              <div className="signUp_message"></div>
            </div>
          </div>

          <div className="row align-items-center mb-1">
            <div className="col-4">
              <label htmlFor="confirm_password" className="signUp_form_labels">
                Confirm Password:
              </label>
            </div>
            <div className="col-8">
              <input
                type="password"
                id="confirm_password"
                className="form-control"
                name="CONFIRM PASS"
                placeholder="confirm your password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
                value={confirmedPassword}
                onInput={(e) => setConfirmedPassword(e.currentTarget.value)}
              ></input>
              {confirmedPassword === newUser.password ||
              confirmedPassword === "" ? (
                <p></p>
              ) : (
                <div className="signUp_message">
                  <p className="invalid_message">Passwords don't match! ❌</p>
                </div>
              )}
            </div>
          </div>

          <hr className="my-4" />

          <div>
            <input type="checkbox" name="" id="agree_checkbox" required></input>
            <label htmlFor="agree_checkbox" className="signUp_form_labels ml-2">
              I agree to the terms and conditions
            </label>
            <div id="terms" className="signUp_form_labels">
              T&C
            </div>
          </div>
          <div className="logged_in">
            <span className="signUp_form_labels">Already have an account?</span>
            <Link
              to="/LoginPage"
              className="login_option signUp_form_labels ml-4"
            >
              Go to your account
            </Link>
          </div>
          <div className="signUp_message">
            {signupState === "initiated" ? (
              <LoadingSpinnerMedium />
            ) : signupState === "failed" ? (
              <p>Invalid Credentials! ❌</p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button className="submit_button" type="submit">
              Create Account
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
