import React from "react";
import "./Application.css";
import Tasklist from "./Tasklist/Tasklist";

export default function Application() {
  return (
    <section id="Application_page">
      <section id="Status"></section>
      <section id="Main_area">
        <section id="Application_menu_area"></section>
        <section id="Application_content_area">
          <Tasklist />
        </section>
      </section>
    </section>
  );
}
