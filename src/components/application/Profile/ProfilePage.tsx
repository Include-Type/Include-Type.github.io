import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./ProfilePage.css";
import PersonalProfile from "./personal-profile/PersonalProfile";
import ProProfilePassword from "./pro-profile-password/ProProfilePassword";
import AllPrivacySettings from "./privacy-settings/AllPrivacySettings";
import { User } from "../../../models/User";
import { ProfessionalProfile } from "../../../models/ProfessionalProfile";
import { PrivacyProfile } from "../../../models/PrivacyProfile";

interface ProfileProps {
  personalProfile: User,
  setPersonalProfile: React.Dispatch<React.SetStateAction<User>>,
  professionalProfile: ProfessionalProfile,
  setProfessionalProfile: React.Dispatch<React.SetStateAction<ProfessionalProfile>>,
  privacy: PrivacyProfile,
  setPrivacy: React.Dispatch<React.SetStateAction<PrivacyProfile>>
};

export default function ProfilePage(props: ProfileProps) {
  return (
    <div id="Profile_Page">
      <Router>
        <Switch>
          <Route
            path="/ProProfilePassword"
            exact
            render={() => <ProProfilePassword
              personalProfile={props.personalProfile}
              setPersonalProfile={props.setPersonalProfile}
              professionalProfile={props.professionalProfile}
              setProfessionalProfile={props.setProfessionalProfile}
            />}
          />
          <Route
            path="/AllPrivacySettings"
            exact
            render={() => <AllPrivacySettings
              privacy={props.privacy}
              setPrivacy={props.setPrivacy}
            />}
          />
          <Route
            path="/"
            render={() => <PersonalProfile
              personalProfile={props.personalProfile}
              setPersonalProfile={props.setPersonalProfile}
            />}
          />
        </Switch>
      </Router>
    </div>
  );
}
