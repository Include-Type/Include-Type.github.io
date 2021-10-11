import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { UserDto } from "../../dtos/UserDto";
import { User } from "../../models/User";
import Banner from "./banner/Banner";
import "./Login.css";
import { CircularProgress } from "@material-ui/core";

interface LoginPageProps {
  setUser: React.Dispatch<React.SetStateAction<User>>,
  setLoginComplete: React.Dispatch<React.SetStateAction<boolean>>
};

export default function LoginPage(props: LoginPageProps) {
  const [userDto, setUserDto] = useState<UserDto>({
    key: "",
    password: ""
  });
  const [loginState, setLoginState] = useState<string>("");
  const history = useHistory();

  async function submitForm(e: React.FormEvent): Promise<void> {
    setLoginState("initiated");
    // console.clear();
    e.preventDefault();
    // console.log(userDto);
    try {
      const response = await fetch("https://include-type.herokuapp.com/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(userDto)
      });
      if (response.ok) {
        // console.log("User Login Successfull");
        props.setUser((prevUser) => ({
          ...prevUser,
          id: ""
        }));
        props.setLoginComplete(true);
        history.push("/");
      } else {
        throw new Error();
      }
    } catch (error) {
      setLoginState("failed");
      // console.log("Invalid Credentials!");
    }
  }

  return (
    <div className="login_page">
      <Banner />
      <div className="login_container d-flex align-items-center justify-content-center">
        <Form className="login_form" onSubmit={submitForm}>
          <div className="mb-3 login_header">Welcome</div>
          <hr className="mb-4" />
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address / Username
            </label>
            <input
              required
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={userDto.key}
              onInput={(e) => setUserDto({ ...userDto, key: e.currentTarget.value })}
            />
            <div id="emailHelp" className="form-text text-muted">
              {/* We'll never share your email with anyone else. */}
            </div>
          </div>
          <div className="mb-4 pb-2">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              required
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={userDto.password}
              onInput={(e) => setUserDto({ ...userDto, password: e.currentTarget.value })}
            />
          </div>
          <div className="mb-2 pb-4 d-flex align-items-center justify-content-between font-weight-bold">
            <div>Not Registered yet? &nbsp;&nbsp;&nbsp;</div>
            <Link to="/SignUpPage" className="create_account">
              Create an Account
            </Link>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button
              disabled={loginState === "initiated" ? true : false}
              type="submit"
              className="submit_button"
              style={{ height: "4.2vh", width: "6vw" }}
            >
              {loginState === "initiated" ? (
                <CircularProgress size={21} style={{ color: "black", marginTop: "8px" }} />
              ) : (
                "Login"
              )}
            </button>
          </div>
          <div className="login_message">
            {loginState === "failed" ? (
              <p style={{ marginTop: 18, marginBottom: -26 }}>Invalid Credentials! ❌</p>
            ) : (
              <p></p>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}
