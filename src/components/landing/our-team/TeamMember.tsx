import React from "react";
import "../css/our-team-css/TeamMember.css";
import { Member } from "./Member";

interface TeamMemberProps {
  key: string,
  member: Member
};

export default function TeamMember(props: TeamMemberProps) {
  return (
    <div className="member_container">
      <div className="member_picture mb-5">
        <img src={props.member.picture} alt="member" />
      </div>
      <div className="member_details">
        <div className="member_name mb-1">{props.member.name}</div>
        <div>{props.member.role}</div>
        <div>{props.member.email}</div>
      </div>
    </div>
  );
}
