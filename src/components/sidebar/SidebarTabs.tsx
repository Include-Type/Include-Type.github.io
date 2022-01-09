import React from "react";
import { Link } from "react-router-dom";
import { Tab } from "./Tab";
interface SidebarTabProps {
  key: string;
  sidetab: Tab;
  isExpanded: boolean;
}

export default function SidebarTabs(props: SidebarTabProps) {
  return (
      <Link to={props.sidetab.path} className="sidebar-item">
        <props.sidetab.icon_component
          sx={{ fontSize: 25 }}
          className="sidebar-icon"
        />
        {props.isExpanded === true ? (
          <span className="sidebar-text">{props.sidetab.name}</span>
        ) : (
          <span></span>
        )}
      </Link>
  );
}
