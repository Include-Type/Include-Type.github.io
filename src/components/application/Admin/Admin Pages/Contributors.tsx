import React, { useState } from "react";

export default function Contributors() {
  const [customRole, setCustomRole] = useState(false);
  const CustomOption = () => {
    // if (value === 4) {
    //   setCustomRole(true);
    // }
    setCustomRole(true);
  };
  return (
    <div className="contributors container">
      <div className="row">
        <div className="col-7">
          <div className="">Project Contributors</div>
        </div>
        <div className="col">
          <div className="">Add Contributor</div>
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
            <select
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
            </select>
          </div>
          {customRole === true ? (
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
