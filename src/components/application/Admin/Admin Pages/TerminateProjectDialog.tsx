import React, { CSSProperties, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { red } from "@mui/material/colors";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";

interface TerminateDialogProps {
  open_dialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
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
  const handleClose = () => {
    props.setOpenDialog(false);
  };

  return (
    <div>
      <Dialog
        open={props.open_dialog}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>
          Termination of Project
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            All data related to this project will be erased permanently from our
            servers. Do you want to terminate this project?
          </DialogContentText>
          <TextField
            error
            autoFocus
            margin="dense"
            id="terminate_password"
            label="Admin Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            variant="outlined"
            style={terminateCancelStyle}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="error"
            style={terminateConfirmStyle}
            onClick={handleClose}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
