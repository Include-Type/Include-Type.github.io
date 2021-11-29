import React, { ReactElement, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Introduction from "./introduction/Introduction";
import LoginPage from "../login/LoginPage";
import SignUp from "../signup/SignUp";
import { User } from "../../models/User";
//import Dashboard from "../dashboard/Dashboard";
import { CompleteUserDto } from "../../dtos/CompleteUserDto";
import { ProfessionalProfile } from "../../models/ProfessionalProfile";
import { PrivacyProfile } from "../../models/PrivacyProfile";
import { CircularProgress } from "@mui/material";
import "../spinners/Spinners.css";

export default function LandingPage(): ReactElement {
  const [user, setUser] = useState<User>({
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
    picture: ""
  });

  const [professionalProfile, setProfessionalProfile] = useState<ProfessionalProfile>({
    userId: "",
    education: "",
    companies: "",
    skills: "",
    experienceYears: 0,
    experienceMonths: 0,
    projects: ""
  });

  const [privacy, setPrivacy] = useState<PrivacyProfile>({
    userId: "",
    name: "",
    bio: "",
    picture: "",
    email: "",
    contact: "",
    address: "",
    education: "",
    companies: "",
    skills: "",
    experience: "",
    projects: ""
  });

  const [loginComplete, setLoginComplete] = useState<boolean>(false);

  useEffect(() => {
    async function getAuthenticatedUser(): Promise<void> {
      try {
        const response = await fetch("https://include-type.herokuapp.com/api/user/authenticateduser/", {
          credentials: "include"
        });
        if (response.ok) {
          // console.log("Authenticated User Received");
          const jsonUser: CompleteUserDto = await response.json();
          jsonUser.user.password = "";
          // console.log(jsonUser);
          setUser(jsonUser.user);
          setProfessionalProfile(jsonUser.professionalProfile);
          setPrivacy(jsonUser.privacy);
          setLoginComplete(true);
        } else {
          throw new Error();
        }
      } catch (error) {
        setUser((prevUser) => ({
          ...prevUser,
          id: "-1"
        }));
        // console.log("Invalid Token or Currently Not Logged In!");
      }
    }

    getAuthenticatedUser();
  }, [loginComplete]);

  return (
    <div>
      {user.id === "-1" ? (
        <Routes>
          <Route
            path="/"
            element={<Introduction />}
          />
          <Route
            path="/LoginPage"
            element={
              <LoginPage
                setUser={setUser}
                setLoginComplete={setLoginComplete}
              />
            }
          />
          <Route
            path="/SignUpPage"
            element={
              <SignUp
                setUser={setUser}
                setLoginComplete={setLoginComplete}
              />
            }
          />
        </Routes>
      ) : (
        user.id === "" ? (
          <div className="login_page spinner-div-large">
            <CircularProgress size={60} style={{ color: "rgb(9, 77, 145)" }} />
          </div>
        ) : (
          // <Dashboard
          //   personalProfile={user}
          //   setPersonalProfile={setUser}
          //   professionalProfile={professionalProfile}
          //   setProfessionalProfile={setProfessionalProfile}
          //   privacy={privacy}
          //   setPrivacy={setPrivacy}
          //   setLoginComplete={setLoginComplete}
          // />
          <div></div>
        )
      )}
    </div>
  );
}
