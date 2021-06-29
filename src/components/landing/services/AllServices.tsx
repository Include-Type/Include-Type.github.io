import React from "react";
import "../css/services-css/AllServices.css";

import service_image_1 from "../../../Resources/Images/services images/freelance.svg";
import service_image_2 from "../../../Resources/Images/services images/small_business.svg";
import service_image_3 from "../../../Resources/Images/services images/large_teams.svg";
import service_image_4 from "../../../Resources/Images/services images/enterprises.svg";

import background_image_1 from "../../../Resources/Images/services images/Red_pinned_note.svg";
import background_image_2 from "../../../Resources/Images/services images/Blue_pinned_note.svg";
import background_image_3 from "../../../Resources/Images/services images/Green_pinned_note.svg";
import background_image_4 from "../../../Resources/Images/services images/Red_clipped_note.svg";

import OddService from "./OddService";
import EvenService from "./EvenService";

export default function AllServices() {
  const services = [
    {
      title: "FREELANCERS & START-UPS",
      description_1: "Today’s start-ups are tomorrow’s MNCs.",
      description_2: "We stand by to the people who dare to stand by for them.",
      description_3:
        "Thus, we have the lowest pocket friendly package for these young Entrepreneurs.",
      image: service_image_1,
      background: background_image_1,
    },
    {
      title: "SMALL BUSINESS",
      description_1: "Growth requires adaptation to an extensive environment.",
      description_2:
        "Make your small dreams to a large reality with the help of our package designed only for you.",
      description_3: "",
      image: service_image_2,
      background: background_image_2,
    },
    {
      title: "LARGE TEAMS",
      description_1: "The sky is not the limit.",
      description_2:
        "Fly higher, gain more, be the leader of tomorrow with our best package deals to track your projects and handle them easily.",
      description_3: "",
      image: service_image_3,
      background: background_image_3,
    },
    {
      title: "ENTERPRISES",
      description_1:
        "“It is not the strongest of the species that survives, not the most intelligent thatsurvives. It is the one that is the most adaptable to change.”",
      description_2:
        "You are the boss of the market, and we have the most exclusive package for you.",
      description_3: "",
      image: service_image_4,
      background: background_image_4,
    },
  ];

  return (
    <>
      <div className="service_set_even">
        <EvenService service={services[0]} />
        <OddService service={services[1]} />
      </div>
      <div className="service_set_odd">
      <EvenService service={services[2]} />
        <OddService service={services[3]} />
      </div>
    </>
  );
}
