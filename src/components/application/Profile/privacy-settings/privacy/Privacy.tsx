import React from "react";

import { Privacies } from "../AllPrivacySettings";
import "./Privacy.css";

interface PrivacyProps {
  key: string;
  privacy: Privacies;
}

export default function Privacy(props: PrivacyProps) {
  return (
    <div className="row my-1 d-flex align-items-center">
      <div className="col d-flex align-items-center">
        <label htmlFor={props.privacy.label} className="form-label">
          {props.privacy.label}:
        </label>
      </div>
      <div className="col">
        <select
          defaultValue="public"
          className="form-select"
          aria-label={props.privacy.name}
          name={props.privacy.name}
        >
          <option value="public">Public</option>
          <option value="teams">Teams</option>
          <option value="private">Private</option>
        </select>
      </div>
    </div>
  );
}
