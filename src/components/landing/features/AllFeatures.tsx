import React from "react";
import "../css/features-css/AllFeatures.css";
import { Feature } from "./Feature";

import Group_170 from "../../../Resources/Images/feature illustrations/Group_170.svg";
import Group_171 from "../../../Resources/Images/feature illustrations/Group_171.svg";
import Group_172 from "../../../Resources/Images/feature illustrations/Group_172.svg";
import Group_173 from "../../../Resources/Images/feature illustrations/Group_173.svg";
import Group_174 from "../../../Resources/Images/feature illustrations/Group_174.svg";
import Group_175 from "../../../Resources/Images/feature illustrations/Group_175.svg";

import OddFeature from "./OddFeature";
import EvenFeature from "./EvenFeature";

export default function AllFeatures() {
  const features: Feature[] = [
    {
      title: "DASHBOARD REPORTS",
      description_1:
        "Keep yourself updated with our best built in database and easy to understand dashboards.",
      description_2:
        "Track your works, as well as your members’ with perfect statistics.",
      image: Group_170,
    },
    {
      title: "SMART AUTOMATIONS",
      description_1: "Modern problems need modern solutions.",
      description_2:
        "With our efficient automations, you can easily automate the tickets and rest yourself from repetitive assignments.",
      image: Group_171,
    },
    {
      title: "CUSTOMIZATION",
      description_1:
        "Customize your day to day work with your schedule, keeping the goals unaltered.",
      description_2: "",
      image: Group_172,
    },
    {
      title: "CUSTOMER SUPPORT PORTAL",
      description_1:
        "Respond and interact with your customers in the easiest way possible.",
      description_2:
        "Keep a happy relationship with your customer with automated answer to their queries.",
      image: Group_173,
    },
    {
      title: "SECURITY",
      description_1: "Even James Bond would trust us.",
      description_2:
        "Keeping in mind your privacy and our responsibilities, we provide you with strict security towards your data and your work.",
      image: Group_174,
    },
    {
      title: "MANAGE TICKETS",
      description_1:
        "Prioritize your work, give importance to your special customers, satisfy your boss with a perfect service just from your desk.",
      description_2: "",
      image: Group_175,
    },
  ];

  return (
    <>
      <div className="feature_set_even">
        <EvenFeature feature={features[0]} />
        <OddFeature feature={features[1]} />
      </div>
      <div className="feature_set_odd">
        <EvenFeature feature={features[2]} />
        <OddFeature feature={features[3]} />
      </div>
      <div className="feature_set_even">
        <EvenFeature feature={features[4]} />
        <OddFeature feature={features[5]} />
      </div>
    </>
  );
}
