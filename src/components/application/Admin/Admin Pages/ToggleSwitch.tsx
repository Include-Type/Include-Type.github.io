import React from "react";
import "./ToggleSwitch.css";

interface LabelProps {
  label: string;
  checkbox_state: boolean;
  set_checkbox_state: (check: boolean) => void;
};

export default function ToggleSwitch(props: LabelProps) {

  return (
    <div className="container">
      {props.label}{" "}
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="checkbox"
          name={props.label}
          id={props.label}
          checked={props.checkbox_state}
          onChange={(e) => props.set_checkbox_state(e.target.checked)}
        />
        <label className="label" htmlFor={props.label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
}
