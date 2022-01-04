import React, { CSSProperties, useState } from "react";
import Contributor from "./Contributor";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ProjectMember } from "../../../../models/ProjectMember";
import Button from "@mui/material/Button";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { CircularProgress } from "@mui/material";
import { User } from "../../../../models/User";

const addButtonStyle: CSSProperties = {
  backgroundColor: "purple",
  fontWeight: "bold",
  letterSpacing: 1,
  marginTop: "5px"
};

interface ContributorsProps {
  user: User,
  projMembers: ProjectMember[],
  setProjMembers: React.Dispatch<React.SetStateAction<ProjectMember[]>>,
  addProjMember: (userKey: string, userRole: string) => Promise<void>
};

export default function Contributors(props: ContributorsProps) {
  const [userKey, setUserKey] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [customRole, setCustomRole] = useState<string>("");
  const [fuse, setFuse] = useState<number>(1);
  const [addLoad, setAddLoad] = useState<boolean>(false);

  const handleSelect = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  function deleteMember(username: string): void {
    if (username !== props.user.username) {
      let index = props.projMembers.findIndex(m => m.username === username);
      props.projMembers.splice(index, 1);
      props.setProjMembers(props.projMembers);
      setFuse((prev) => prev + 1);
    }
  }

  async function addMember(e: React.FormEvent): Promise<void> {
    setAddLoad(true);
    e.preventDefault();
    let userRole: string = role;
    if (customRole !== "" && role !== customRole) {
      userRole = customRole;
    }
    await props.addProjMember(userKey, userRole);
    setUserKey("");
    setRole("");
    setCustomRole("");
    setAddLoad(false);
  }

  return (
    <div className="contributors">
      <div className="row">
        <div className="col-7 contributors_list">
          <div className="contributor_heading ps-3">Project Contributors</div>
          <div className="container contributors_container py-1">
            {fuse > 0 && props.projMembers.map((member: ProjectMember) => (
              <Contributor
                user={props.user}
                key={member.username}
                contributor={member}
                deleteMember={deleteMember}
              />
            ))}
          </div>
        </div>
        <div className="col ms-4 px-3 add_contributor">
          <div className="contributor_heading my-2">Add Contributor</div>
          <div className="row m-0 p-0 mb-3">
            <label htmlFor="Contributor_Email_Username" className="form-label">
              Email / Username:
            </label>
            <input
              type="text"
              className="form-control"
              id="Contributor_Email_Username"
              required
              value={userKey}
              onInput={(e) => setUserKey(e.currentTarget.value)}
            />
          </div>
          <div className="row m-0 p-0 mb-3">
            <label htmlFor="Contributor_Role" className="form-label">
              Contributor Role:
            </label>
            {/* <select
              className="form-select"
              aria-label="Default select example"
              onChange={CustomOption}
              required
            >
              <option selected disabled>
                Select Role
              </option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="4">Other</option>
            </select> */}
            <FormControl sx={{ minWidth: 100, backgroundColor: "white", borderRadius: "5px" }}>
              <Select
                value={role}
                onChange={handleSelect}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="" disabled>
                  <em>Select Role</em>
                </MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
                <MenuItem value="Designer">Designer</MenuItem>
                <MenuItem value="Custom">Custom</MenuItem>
              </Select>
            </FormControl>
          </div>
          {role === "Custom" ? (
            <div className="row m-0 p-0 mb-3">
              <label htmlFor="Contributor_Custom_Role" className="form-label">
                Custom Role:
              </label>
              <input
                type="text"
                className="form-control"
                id="Contributor_Custom_Role"
                required
                value={customRole}
                onInput={(e) => setCustomRole(e.currentTarget.value)}
              />
            </div>
          ) : (
            <div></div>
          )}
          <Button
            disabled={addLoad || userKey === "" || role === "" ? true : false}
            variant="contained"
            style={addButtonStyle}
            onClick={async (e) => await addMember(e)}
            startIcon={addLoad ? <></> : <PersonAddIcon />}
          >
            {addLoad ? (
              <CircularProgress size={26} style={{ color: "white", marginLeft: "50px", marginRight: "50px" }} />
            ) : (
              "Add Member"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
