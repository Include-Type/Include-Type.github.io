import React from "react";
import { Routes, Route } from "react-router-dom";
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
      <Routes>
        <Route
          path="/ProProfilePassword"
          element={
            <ProProfilePassword
              personalProfile={props.personalProfile}
              setPersonalProfile={props.setPersonalProfile}
              professionalProfile={props.professionalProfile}
              setProfessionalProfile={props.setProfessionalProfile}
            />
          }
        />
        <Route
          path="/AllPrivacySettings"
          element={
            <AllPrivacySettings
              privacy={props.privacy}
              setPrivacy={props.setPrivacy}
            />
          }
        />
        <Route
          path="/"
          element={
            <PersonalProfile
              personalProfile={props.personalProfile}
              setPersonalProfile={props.setPersonalProfile}
            />
          }
        />
      </Routes>
    </div>
  );
}
