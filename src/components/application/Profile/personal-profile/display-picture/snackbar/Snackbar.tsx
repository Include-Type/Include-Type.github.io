import React from "react";
import { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps, Color } from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core/styles";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}), { index: 1 });

export interface SnackbarState {
  open: boolean;
  severity: Color;
  message: String;
};

export type SnackbarStateContext = (open: boolean, severity: Color, message: string) => void;

export const SnackbarContext = React.createContext<SnackbarStateContext>(
  (open: boolean, severity: Color, message: string): void => { }
);

export default function ProfilePictureSnackbars({ children }: any) {
  const classes = useStyles();

  const [stateSnackbar, setStateSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "info",
    message: " ",
  });

  const { open, severity, message } = stateSnackbar;

  function setStateSnackbarContext(open: boolean, severity: Color, message: string): void {
    setStateSnackbar((prevState) => ({ ...prevState, open, severity, message }));
  }

  const handleClose = () => setStateSnackbar({ ...stateSnackbar, open: false });

  return (
    <SnackbarContext.Provider value={setStateSnackbarContext}>
      <div className={classes.root}>
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
