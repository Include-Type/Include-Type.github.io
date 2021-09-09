import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./ProfilePage.css";
import PersonalProfile from "./personal-profile/PersonalProfile";
import ProProfilePassword from "./pro-profile-password/ProProfilePassword";
import AllPrivacySettings from "./privacy-settings/AllPrivacySettings";

export default function ProfilePage() {
  return (
    <div id="Profile_Page">
      <Router>
        <Switch>
          <Route
            path="/ProProfilePassword"
            exact
            component={ProProfilePassword}
          />
          <Route
            path="/AllPrivacySettings"
            exact
            component={AllPrivacySettings}
          />
          <Route path="/" component={PersonalProfile} />
        </Switch>
      </Router>
    </div>
  );
}
