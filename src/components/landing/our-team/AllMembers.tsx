import React from "react";
import my_image from "../../../Resources/Images/our_team_images/dummy.png";
import "../css/our-team-css/AllMembers.css";
import TeamMember from "./TeamMember";
import { Member } from "./Member";

export default function AllMembers() {
  const members: Member[] = [
    {
      name: "Monosij Nayek",
      role: "Front-end Developer",
      email: "monosijnayek@gmail.com",
      picture: my_image,
    },
    {
      name: "Srijita Chakrabarty",
      role: "Front-end Developer",
      email: "srijitachakrabarty007@gmail.com",
      picture: my_image,
    },
    {
      name: "Rishab Sengupta",
      role: "Front-end Developer",
      email: "rishabsengupta09062000@gmail.com",
      picture: my_image,
    },
    {
      name: "Rohan Halder",
      role: "Front-end Designer",
      email: "rohanhalder13@gmail.com",
      picture: my_image,
    },
    {
      name: "Subham Karmakar",
      role: "Back-end Developer",
      email: "subhamkarmakar090@gmail.com",
      picture: my_image,
    },
    {
      name: "Debayan De",
      role: "Back-end Developer",
      email: "debayan.pog@gmail.com",
      picture: my_image,
    },
  ];

  return (
    <div className="all_members d-flex justify-content-around">
      {members.map((person: Member) => (
        <TeamMember key={person.email} member={person} />
      ))}
    </div>
  );
}
