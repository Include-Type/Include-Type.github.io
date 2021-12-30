import React, { useState } from "react";
import "./CalendarForm.css";

let formElements = [
  {
    label: "Agenda",
    key: "agenda",
  },
];

export default function CalendarForm() {
  const [formData, setFormData] = useState({} as any);

  const handleChange = (value: string, key: string) => {
    setFormData({ ...formData, ...{ [key]: value } });
  };

  const submit = () => {
    if (isFormInValid()) {
      return;
    }
    alert(JSON.stringify(formData));
  };

  const isFormInValid = () => {
    let returnValue = false;
    formElements.forEach((formElement) => {
      if (formData[formElement.key] === undefined) {
        alert(formElement.label + " is missing");
        returnValue = true;
      }
    });

    return returnValue;
  };

  return (
    <div className="calendar_form">
      <form>
        <div className="event">Enter Your Event</div>
        {formElements.map((formElement) => {
          return (
            <div>
              {formElement.label}
              <input
                value={formData[formElement.key]}
                onChange={(e) => {
                  handleChange(e.target.value, formElement.key);
                }}
              />
            </div>
          );
        })}
        <button onClick={submit}>Submit</button>
      </form>
    </div>
  );
}
