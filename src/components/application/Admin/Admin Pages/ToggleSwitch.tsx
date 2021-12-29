import React, { SetStateAction, Dispatch } from "react";
import "./ToggleSwitch.css";

interface LabelProps {
    label: string;
    checkbox_state: boolean; 
    set_checkbox_state: Dispatch<SetStateAction<boolean>>;
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
