import React, { CSSProperties } from "react";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps, AlertColor } from "@mui/lab/Alert";
// import { makeStyles, Theme } from "@mui/material/styles";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const rootStyle: CSSProperties = {
  width: "100%",
  marginTop: "16px"
};

export interface SnackbarState {
  open: boolean;
  severity: AlertColor;
  message: String;
};

export type SnackbarStateContext = (open: boolean, severity: AlertColor, message: string) => void;

export const SnackbarContext = React.createContext<SnackbarStateContext>(
  (open: boolean, severity: AlertColor, message: string): void => { }
);

export default function ProfilePictureSnackbars({ children }: any) {
  // const classes = useStyles();

  const [stateSnackbar, setStateSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "info",
    message: " ",
  });

  const { open, severity, message } = stateSnackbar;

  function setStateSnackbarContext(open: boolean, severity: AlertColor, message: string): void {
    setStateSnackbar((prevState) => ({ ...prevState, open, severity, message }));
  }

  const handleClose = () => setStateSnackbar({ ...stateSnackbar, open: false });

  return (
    <SnackbarContext.Provider value={setStateSnackbarContext}>
      <div style={rootStyle}>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </div>
      {children}
    </SnackbarContext.Provider>
  );
}
