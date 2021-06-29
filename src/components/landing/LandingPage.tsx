import React from "react";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Introduction from "./introduction/Introduction";
import LoginPage from "../login/LoginPage";
import SignUp from "../signup/SignUp";

export default function LandingPage() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Introduction} />
          <Route path="/LoginPage" component={LoginPage} />
          <Route path="/SignUpPage" component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
}
