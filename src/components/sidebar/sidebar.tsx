import React, { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import "./sidebar.css";
import SidebarTabs from "./SidebarTabs";
import { Tab } from "./Tab";

function Sidebar() {
  const tabs: Tab[] = [
    {
      icon_component: DashboardRoundedIcon,
      name: "Dashboard",
    },
    {
      icon_component: ChatBubbleRoundedIcon,
      name: "Chat",
    },
    {
      icon_component: GroupsRoundedIcon,
      name: "Teams",
    },
    {
      icon_component: AssignmentRoundedIcon,
      name: "Tasks",
    },
    {
      icon_component: InsightsRoundedIcon,
      name: "Analytics",
    },
  ];

  const [isExpanded, setIsExpanded] = useState(true);
  const handleToggler = () => {
    if (isExpanded) {
      setIsExpanded(false);
      return;
    }
    setIsExpanded(true);
  };
  return (
    <div className={isExpanded === true ? "sidebar" : "collapsed_sidebar"}>
      <div className="sidebar-header">
        {isExpanded === true ? (
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

        {isExpanded === true ? (
          <div className="sidebar-brand">Include-Type</div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="sidebar-items">
        {tabs.map((tab: Tab) => (
          <SidebarTabs key={tab.name} sidetab={tab} isExpanded={isExpanded} />
        ))}
      </div>
    </div>
  );
}
export default Sidebar;
