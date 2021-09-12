import React, { ReactElement, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Introduction from "./introduction/Introduction";
import LoginPage from "../login/LoginPage";
import SignUp from "../signup/SignUp";
import { User } from "../../models/User";
import Dashboard from "../dashboard/Dashboard";
import { LoadingSpinnerLarge } from "../spinners/Spinners";

export default function LandingPage(): ReactElement {
  const [user, setUser] = useState<User>({
    userId: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
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
          const jsonUser: User = await response.json();
          // console.log(jsonUser);
          setUser(jsonUser);
          setLoginComplete(true);
        } else {
          throw new Error();
        }
      } catch (error) {
        setUser((prevUser) => ({
          ...prevUser,
          userId: "-1"
        }));
        // console.log("Invalid Token or Currently Not Logged In!");
      }
    }

    getAuthenticatedUser();
  }, [loginComplete]);

  return (
    <div>
      {user.userId === "-1" ? (
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              component={Introduction}
            />
            <Route
              path="/LoginPage"
              exact
              component={
                () => <LoginPage
                  setUser={setUser}
                  setLoginComplete={setLoginComplete}
                />
              }
            />
            <Route
              path="/SignUpPage"
              exact
              component={
                () => <SignUp
                  setUser={setUser}
                  setLoginComplete={setLoginComplete}
                />
              }
            />
          </Switch>
        </Router>
      ) : (
        user.userId === "" ? (
          <LoadingSpinnerLarge />
        ) : (
          <Dashboard
            user={user}
            setUser={setUser}
            setLoginComplete={setLoginComplete}
          />
        )
      )}
    </div>
  );
}
