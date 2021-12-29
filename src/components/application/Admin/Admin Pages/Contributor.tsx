import React from "react";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import { ContributorType } from "./ContributorType";

interface ContributorProps {
  key: string;
  contributor: ContributorType;
}

export default function Contributor(props: ContributorProps) {
  return (
    <div className="row contributor">
      <div className="col">{props.contributor.name}</div>
      <div className="col-3">{props.contributor.role}</div>
      <div className="col-2">
        <IconButton aria-label="delete">
          <RemoveCircleRoundedIcon sx={{ color: red[600] }} />
        </IconButton>
      </div>
    </div>
  );
}
