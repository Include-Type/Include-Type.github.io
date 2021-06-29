import React from "react";
import "../css/first-landing-section-css/LandingImage.css";
import support_team from "../../../Resources/SVG Illustrations/support-team.svg";

export default function LandingImage() {
  // const support_team = require("../../../Resources/SVG Illustrations/support-team.svg");
  return (
    <div className="support-team-svg my-4 d-flex align-items-center justify-content-around">
      <img src={support_team} alt={"support team"} className="img-fluid" />
    </div>
  );
}
