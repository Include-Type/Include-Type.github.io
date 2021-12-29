import React, { useState } from "react";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function CreateAssignTasks() {
  const [deadline, setDeadline] = React.useState<Date | null>(null);
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [task_priority, setTaskPriority] = useState("");
  const handleSelect = (event: SelectChangeEvent) => {
    setTaskPriority(event.target.value);
  };

  return (
    <div className="create_assign_tasks container">
      <div className="row">
        <div className="col-2">
          <label htmlFor="TaskTitle" className="form-label">
            Task :
          </label>
        </div>
        <div className="col">
          <input type="text" className="form-control" id="TaskTitle" required />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <label htmlFor="TaskDescription" className="form-label">
            Description :
          </label>
        </div>
        <div className="col">
          <textarea
            rows={8}
            className="form-control"
            id="TaskDescription"
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <label htmlFor="Assigned_Contributors" className="form-label">
            Assigned to :
          </label>
        </div>
        <div className="col-10">
          <FormControl className="form-control">
            <Select
              id="demo-multiple-checkbox"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name} className="list_item_text">
                  <Checkbox checked={personName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col-4">
              <label htmlFor="TaskPriority" className="form-label">
                Task Priority :
              </label>
            </div>
            <div className="col-4">
              {/* <select
                className="form-select"
                aria-label="Default select example"
                required
              >
                <option selected disabled>
                  Select Priority
                </option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select> */}
              <FormControl sx={{ minWidth: 100 }}>
                <Select
                  value={task_priority}
                  onChange={handleSelect}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="" disabled>
                    <em>Select Priority</em>
                  </MenuItem>
                  <MenuItem value="10">Ten</MenuItem>
                  <MenuItem value="20">Twenty</MenuItem>
                  <MenuItem value="30">Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="row justify-content-end">
            <div className="col-4">
              <label htmlFor="TaskDeadline" className="form-label">
                Task Deadline :
              </label>
            </div>
            <div className="col-6">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="DateTimePicker"
                  value={deadline}
                  onChange={(newValue) => {
                    setDeadline(newValue);
                  }}
                  renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Box sx={{ display: "flex", alignItems: "center"}}>
                      <input
                        ref={inputRef}
                        {...inputProps}
                        className="form-control"
                      />
                      {InputProps?.endAdornment}
                    </Box>
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
