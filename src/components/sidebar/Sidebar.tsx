import React, { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import PlaylistRemoveRoundedIcon from "@mui/icons-material/PlaylistRemoveRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
// import "./sidebar.css";
import "./sidebar_2.css";
import SidebarTabs from "./SidebarTabs";
import { Tab } from "./Tab";

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar(props: SidebarProps) {
  const tabs: Tab[] = [
    {
      icon_component: DashboardRoundedIcon,
      name: "Dashboard",
      path: "/user_dashboard",
    },
    {
      icon_component: SportsEsportsIcon,
      name: "Controls",
      path: "/dashboard",
    },
    {
      icon_component: AssignmentRoundedIcon,
      name: "Project List",
      path: "/project_list",
    },
    {
      icon_component: PlaylistAddCheckRoundedIcon,
      name: "Task List",
      path: "/task_list",
    },
    {
      icon_component: PlaylistRemoveRoundedIcon,
      name: "Issue List",
      path: "/issue_list",
    },
    {
      icon_component: AccountBoxRoundedIcon,
      name: "Profile",
      path: "/profile/personal",
    },
    {
      icon_component: AdminPanelSettingsRoundedIcon,
      name: "Admin",
      path: "/admin",
    },
  ];

  const handleToggler = () => {
    if (props.isExpanded) {
      props.setIsExpanded(false);
      return;
    }
    props.setIsExpanded(true);
  };
  return (
    <div
      className={props.isExpanded === true ? "sidebar" : "collapsed_sidebar"}
    >
      <div className="sidebar-header">
        {props.isExpanded === true ? (
          <ArrowBackIcon
            sx={{ fontSize: 35 }}
            onClick={handleToggler}
            className="sidebar-menutoggler-arrow"
          />
        ) : (
          <MenuRoundedIcon
            sx={{ fontSize: 35 }}
            onClick={handleToggler}
            className="sidebar-menutoggler-ham"
          />
        )}

        {props.isExpanded === true ? (
          <div className="sidebar-brand">Include-Type</div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="sidebar-items">
        {tabs.map((tab: Tab) => (
          <SidebarTabs
            key={tab.name}
            sidetab={tab}
            isExpanded={props.isExpanded}
          />
        ))}
      </div>
    </div>
  );
}
export default Sidebar;
