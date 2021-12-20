import React from "react";
import { Route, Routes } from "react-router-dom";
import { PrivacyProfile } from "../../models/PrivacyProfile";
import { ProfessionalProfile } from "../../models/ProfessionalProfile";
import { User } from "../../models/User";
import Dashboard from "../dashboard/Dashboard";
import "./Application.css";
import Issuelist from "./Issuelist/Issuelist";
import PersonalProfile from "./Profile/personal-profile/PersonalProfile";
import AllPrivacySettings from "./Profile/privacy-settings/AllPrivacySettings";
import ProProfilePassword from "./Profile/pro-profile-password/ProProfilePassword";
import Projectlist from "./Projectlist/Projectlist";
import Tasklist from "./Tasklist/Tasklist";

interface ApplicationProps {
  personalProfile: User,
  setPersonalProfile: React.Dispatch<React.SetStateAction<User>>,
  professionalProfile: ProfessionalProfile,
  setProfessionalProfile: React.Dispatch<React.SetStateAction<ProfessionalProfile>>,
  privacy: PrivacyProfile,
  setPrivacy: React.Dispatch<React.SetStateAction<PrivacyProfile>>
  setLoginComplete: React.Dispatch<React.SetStateAction<boolean>>
};

export default function Application(props: ApplicationProps) {
  return (
    <section id="Application_page">
      <section id="Status"></section>
      <section id="Main_area">
        <section id="Application_menu_area"></section>
        <section id="Application_content_area">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  personalProfile={props.personalProfile}
                  setPersonalProfile={props.setPersonalProfile}
                  professionalProfile={props.professionalProfile}
                  setProfessionalProfile={props.setProfessionalProfile}
                  privacy={props.privacy}
                  setPrivacy={props.setPrivacy}
                  setLoginComplete={props.setLoginComplete}
                />
              }
            />
            <Route path="/profile">
              <Route
                path="personal"
                element={
                  <PersonalProfile
                    personalProfile={props.personalProfile}
                    setPersonalProfile={props.setPersonalProfile}
                  />
                }
              />
              <Route
                path="pro-pass"
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
                path="privacy"
                element={
                  <AllPrivacySettings
                    privacy={props.privacy}
                    setPrivacy={props.setPrivacy}
                  />
                }
              />
            </Route>
            <Route
              path="/project-tasks"
              element={
                <Tasklist
                  user={props.personalProfile}
                />
              }
            />
            <Route
              path="/project-issues"
              element={
                <Issuelist
                  user={props.personalProfile}
                />
              }
            />
            <Route
              path="/projects"
              element={
                <Projectlist
                  user={props.personalProfile}
                />
              }
            />
          </Routes>
        </section>
      </section>
    </section>
  );
}
