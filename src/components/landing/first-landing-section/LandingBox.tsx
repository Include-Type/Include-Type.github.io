import React from "react";
import "../css/first-landing-section-css/LandingBox.css";

export default function LandingBox() {
  return (
    <div className="landing_box_container my-4 d-flex align-items-center justify-content-around">
      <div className="landing_text_container text-center">
        <p className="Line_1">
          Looking for a 1-step solution for managing your projects?
        </p>
        <p className="Line_2">
          #include&lt;TYPE&gt; enables you to "Track Your Projects Efficiently".
        </p>
        <p className="Line_3">
          We dedicate ourselves to provide you with the most user-friendly,
          efficient,
          <br />
          best-in-class yet a very simpler experience.
        </p>
        <p className="Line_4">
          Manage&emsp;|&emsp;Track&emsp;|&emsp;Customize&emsp;|&emsp;Prioritize
        </p>
      </div>
    </div>
  );
}
