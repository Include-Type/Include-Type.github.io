import React, { useState } from "react";
import "./CalendarForm.css";

interface CalendarFormProps {
  setDateAndAgenda: (agenda: string) => void;
}

let formElements = [
  {
    label: "Agenda",
    key: "agenda",
  },
];

export default function CalendarForm(props: CalendarFormProps) {
  const [formData, setFormData] = useState({} as any);

  const handleChange = (value: string, key: string) => {
    setFormData({ ...formData, ...{ [key]: value } });
  };

  const submit = () => {
    if (isFormInValid()) {
      return;
    }

    props.setDateAndAgenda(formData.agenda);
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
            <div key={formElement.key}>
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
