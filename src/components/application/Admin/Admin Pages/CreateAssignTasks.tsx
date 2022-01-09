import React, { useState } from "react";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { User } from "../../../../models/User";
import { ProjectMember } from "../../../../models/ProjectMember";
import { ProjectTask } from "../../../../models/ProjectTask";

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

interface CreateAssignTasksProps {
  user: User,
  projMembers: ProjectMember[],
  task: ProjectTask,
  setTask: React.Dispatch<React.SetStateAction<ProjectTask>>
};

export default function CreateAssignTasks(props: CreateAssignTasksProps) {
  const [assignedNames, setAssignedNames] = useState<string[]>([]);

  const updateAssignedNames = (e: SelectChangeEvent<string[]>) => {
    let names: string[] = assignedNames;

    if (typeof e.target.value === "string") {
      setAssignedNames(e.target.value.split(", "));
      names = e.target.value.split(", ");
    } else {
      setAssignedNames(e.target.value);
      names = e.target.value;
    }

    props.setTask({ ...props.task, assigned: names.join(", ") });
  };

  return (
    <div className="create_assign_tasks">
      <div className="row">
        <div className="col-2">
          <label htmlFor="TaskTitle" className="form-label">
            Task :
          </label>
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            id="TaskTitle"
            required
            value={props.task.title}
            onInput={(e) => props.setTask({ ...props.task, title: e.currentTarget.value })}
          />
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
            rows={6}
            className="form-control textarea"
            id="TaskDescription"
            required
            value={props.task.details}
            onInput={(e) => props.setTask({ ...props.task, details: e.currentTarget.value })}
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
          <FormControl sx={{ width: "100%", backgroundColor: "white", borderRadius: "5px" }}>
            <Select
              id="demo-multiple-checkbox"
              multiple
              value={assignedNames}
              onChange={(e) => updateAssignedNames(e)}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {props.projMembers.map((member: ProjectMember) => (
                <MenuItem key={member.username} value={member.username} className="list_item_text">
                  <Checkbox checked={assignedNames.indexOf(member.username) > -1} />
                  <ListItemText primary={`${member.name} (@${member.username})`} />
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
              <FormControl sx={{ minWidth: 100, backgroundColor: "white", borderRadius: "5px" }}>
                <Select
                  value={props.task.priority}
                  onChange={(e) => props.setTask({ ...props.task, priority: e.target.value })}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="" disabled>
                    <em>Select Priority</em>
                  </MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
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
                  value={props.task.deadline}
                  onChange={(newValue) => props.setTask({ ...props.task, deadline: newValue as string })}
                  renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
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
