import React from "react";
import { PrivacyProfile } from "../../models/PrivacyProfile";
import { ProfessionalProfile } from "../../models/ProfessionalProfile";
import { User } from "../../models/User";
import "./Application.css";
import ProfilePage from "./Profile/ProfilePage";


interface ApplicationProps {
  personalProfile: User,
  setPersonalProfile: React.Dispatch<React.SetStateAction<User>>,
  professionalProfile: ProfessionalProfile,
  setProfessionalProfile: React.Dispatch<React.SetStateAction<ProfessionalProfile>>,
  privacy: PrivacyProfile,
  setPrivacy: React.Dispatch<React.SetStateAction<PrivacyProfile>>
};

export default function Application(props: ApplicationProps) {
  return (
    <section id="Application_page">
      <section id="Status"></section>
      <section id="Main_area">
        <section id="Application_menu_area"></section>
        <section id="Application_content_area">
          <ProfilePage
            personalProfile={props.personalProfile}
            setPersonalProfile={props.setPersonalProfile}
            professionalProfile={props.professionalProfile}
            setProfessionalProfile={props.setProfessionalProfile}
            privacy={props.privacy}
            setPrivacy={props.setPrivacy}
          />

        </section>
      </section>
    </section>
  );
}
