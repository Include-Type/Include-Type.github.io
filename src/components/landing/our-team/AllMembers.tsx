import debayan from "../../../Resources/Images/our_team_images/Debayan.png";
import monosij from "../../../Resources/Images/our_team_images/Monosij.png";
import rishab from "../../../Resources/Images/our_team_images/Rishab.png";
import rohan from "../../../Resources/Images/our_team_images/Rohan.png";
import srijita from "../../../Resources/Images/our_team_images/Srijita.png";
import subham from "../../../Resources/Images/our_team_images/Subham.png";

import "../css/our-team-css/AllMembers.css";
import TeamMember from "./TeamMember";
import { Member } from "./Member";

export default function AllMembers() {
  const members: Member[] = [
    {
      name: "Monosij Nayek",
      role: "Front-end Developer",
      email: "monosijnayek@gmail.com",
      picture: monosij,
    },
    {
      name: "Srijita Chakrabarty",
      role: "Front-end Developer",
      email: "srijitachakrabarty007@gmail.com",
      picture: srijita,
    },
    {
      name: "Rishab Sengupta",
      role: "Front-end Developer",
      email: "rishabsengupta09062000@gmail.com",
      picture: rishab,
    },
    {
      name: "Rohan Halder",
      role: "Front-end Designer",
      email: "rohanhalder13@gmail.com",
      picture: rohan,
    },
    {
      name: "Subham Karmakar",
      role: "Front-end & Back-end Developer",
      email: "subhamkarmakar090@gmail.com",
      picture: subham,
    },
    {
      name: "Debayan De",
      role: "Back-end Developer",
      email: "debayan.pog@gmail.com",
      picture: debayan,
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
