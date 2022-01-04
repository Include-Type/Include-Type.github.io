import IconButton from "@mui/material/IconButton";
import { red, grey } from "@mui/material/colors";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import { ProjectMember } from "../../../../models/ProjectMember";
import { Tooltip } from "@mui/material";
import { User } from "../../../../models/User";

interface ContributorProps {
  user: User;
  key: string;
  contributor: ProjectMember;
  deleteMember: (username: string) => void;
}

export default function Contributor(props: ContributorProps) {
  return (
    <div className="row contributor">
      <div className="col">{props.contributor.name}</div>
      <div className="col-3">{props.contributor.role}</div>
      <div className="col-2">
        <Tooltip
          title={
            <div style={{ fontSize: "0.9vw" }}>
              {props.contributor.username === props.user.username ? (
                "You can't remove yourself"
              ) : (
                "Delete member"
              )}
            </div>
          }
          arrow
          placement="right"
        >
          <IconButton
            sx={{ color: red[600] }}
            size="medium"
            aria-label="delete"
            onClick={() => props.deleteMember(props.contributor.username)}
          >
            {props.contributor.username === props.user.username ? (
              <RemoveCircleRoundedIcon sx={{ color: grey[600] }} fontSize="medium" />
            ) : (
              <RemoveCircleRoundedIcon sx={{ color: red[600] }} fontSize="medium" />
            )}
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
