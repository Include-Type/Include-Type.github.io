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
}));

export const SnackbarContext = React.createContext({});

interface SnackbarState {
  open: boolean;
  severity: Color;
  message: String;
}

export default function ProfilePictureSnackbars({ children }: any) {
  const classes = useStyles();

  const [stateSnackbar, setStateSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "info",
    message: " ",
  });

  const { open, severity, message } = stateSnackbar;

  const setStateSnackbarContext = (
    open: boolean,
    severity: Color,
    message: string
  ) => setStateSnackbar({ ...stateSnackbar, open, severity, message });

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
