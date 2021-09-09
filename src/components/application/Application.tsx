import React from "react";
import "./Application.css";
import ProfilePage from "./Profile/ProfilePage";
// import DisplayPicture from "./Profile/personal-profile/display-picture/DisplayPicture";

export default function Application() {
  return (
    <section id="Application_page">
      <section id="Status"></section>
      <section id="Main_area">
        <section id="Application_menu_area"></section>
        <section id="Application_content_area">
          <ProfilePage />
        </section>
      </section>
    </section>
  );
}
