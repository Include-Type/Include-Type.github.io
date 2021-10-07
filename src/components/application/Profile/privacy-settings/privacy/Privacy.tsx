import React from "react";

import { Privacies } from "../AllPrivacySettings";
import "./Privacy.css";

interface PrivacyProps {
  key: string;
  privacy: Privacies;
  privacies: Privacies[];
  setPrivacies: React.Dispatch<React.SetStateAction<Privacies[]>>;
}

export default function Privacy(props: PrivacyProps) {
  function changePrivacy(value: string, idx: number) {
    props.privacies[idx].value = value;
    props.setPrivacies(props.privacies);
  }

  return (
    <div className="row my-1 d-flex align-items-center">
      <div className="col d-flex align-items-center">
        <label htmlFor={props.privacy.label} className="form-label">
          {props.privacy.label}:
        </label>
      </div>
      <div className="col">
        <select
          defaultValue={props.privacy.value}
          onChange={(e) => changePrivacy(e.target.value, props.privacy.id)}
          className="form-select"
          aria-label={props.privacy.name}
          name={props.privacy.name}
        >
          <option value="Public">Public</option>
          <option value="Teams">Teams</option>
          <option value="Private">Private</option>
        </select>
      </div>
    </div>
  );
}
