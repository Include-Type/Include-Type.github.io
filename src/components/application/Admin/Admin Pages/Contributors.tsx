import React, { useState } from "react";
import { ContributorType } from "./ContributorType";
import Contributor from "./Contributor";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function Contributors() {
  const [role, setRole] = useState("");
  const handleSelect = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const contributors = [
    {
      name: "Monosij Nayek",
      role: "Admin",
    },
    {
      name: "Subham Karmakar",
      role: "Admin",
    },
    {
      name: "Rohan Halder",
      role: "Designer",
    },
    {
      name: "Rishab Sengupta",
      role: "Developer",
    },
    {
      name: "Srijita Chakrabarty",
      role: "Developer",
    },
    {
      name: "Debayan De",
      role: "Developer",
    },
    {
      name: "Monosij Nayek",
      role: "Admin",
    },
    {
      name: "Subham Karmakar",
      role: "Admin",
    },
    {
      name: "Rohan Halder",
      role: "Designer",
    },
    {
      name: "Rishab Sengupta",
      role: "Developer",
    },
    {
      name: "Srijita Chakrabarty",
      role: "Developer",
    },
    {
      name: "Debayan De",
      role: "Developer",
    },
  ];

  return (
    <div className="contributors">
      <div className="row">
        <div className="col-7 contributors_list">
          <div className="contributor_heading ps-3">Project Contributors</div>
          <div className="container contributors_container py-1">
            {contributors.map((contributor: ContributorType) => (
              <Contributor key={contributor.name} contributor={contributor} />
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
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="developer">Developer</MenuItem>
                <MenuItem value="designer">Designer</MenuItem>
                <MenuItem value="custom">Custom</MenuItem>
              </Select>
            </FormControl>
          </div>
          {role === "custom" ? (
            <div className="row m-0 p-0 mb-3">
              <label htmlFor="Contributor_Custom_Role" className="form-label">
                Custom Role:
              </label>
              <input
                type="text"
                className="form-control"
                id="Contributor_Custom_Role"
                required
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
