import React, { CSSProperties, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import { CircularProgress } from "@mui/material";
import { ProjectModel } from "../../../../models/ProjectModel";
import { User } from "../../../../models/User";

interface TerminateDialogProps {
  user: User;
  project: ProjectModel;
  setProject: React.Dispatch<React.SetStateAction<ProjectModel>>;
  open_dialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  updateOrCreateProject: (e: React.FormEvent, message: string) => Promise<void>;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const terminateCancelStyle: CSSProperties = {
  borderWidth: 2,
  fontWeight: "bold",
};

const terminateConfirmStyle: CSSProperties = {
  borderWidth: 2,
  fontWeight: "bold",
};

export default function TerminateProjectDialog(props: TerminateDialogProps) {
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`https://include-type.herokuapp.com/api/user/checkpassword/${props.user.username}-${userInput}`, {
        credentials: "include"
      });
      if (response.ok) {
        const isPasswordCorrect: string = await response.text();
        if (isPasswordCorrect.toLowerCase() === "true") {
          await props.updateOrCreateProject(e, "termination");
        } else {
          await props.updateOrCreateProject(e, "termination-password-missmatch");
          setLoading(false);
          setUserInput("");
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      await props.updateOrCreateProject(e, "termination-password-missmatch");
      setLoading(false);
      setUserInput("");
    }
  };

  return (
    <div>
      <Dialog
        open={props.open_dialog}
        TransitionComponent={Transition}
        onClose={() => props.setOpenDialog(false)}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>
          Termination of Project
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            All data related to this project will be erased permanently from our
            servers. Do you want to terminate this project? This action is irreversible!
          </DialogContentText>
          <TextField
            error
            autoFocus
            margin="dense"
            id="terminate_password"
            label="Enter your password to confirm."
            type="password"
            fullWidth
            variant="standard"
            value={userInput}
            onChange={(e) => setUserInput(e.currentTarget.value)}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            variant="outlined"
            style={terminateCancelStyle}
            onClick={() => props.setOpenDialog(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={loading ? true : false}
            variant="outlined"
            type="submit"
            color="error"
            style={terminateConfirmStyle}
            onClick={async (e) => await handleClose(e)}
          >
            {loading ? (
              <CircularProgress size={24.5} style={{ color: "red", marginLeft: "22px", marginRight: "22px" }} />
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
