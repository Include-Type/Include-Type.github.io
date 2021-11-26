import React, { CSSProperties } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import Button from "@mui/material/Button";
// import { makeStyles, createStyles, Theme } from "@mui/material/styles";

const backdropStyle: CSSProperties = {
  zIndex: 1,
  color: "#fff"
};

export const BackdropContext = React.createContext({});

export default function SimpleBackdrop({ children }: any) {
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const backdropClose = () => {
    setOpen(false);
  };

  const backdropShow = () => {
    setOpen(!open);
  };

  return (
    <BackdropContext.Provider value={{ backdropClose, backdropShow }}>
      <Backdrop
        style={backdropStyle}
        // className={classes.backdrop}
        open={open}
        onClick={backdropClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
    </BackdropContext.Provider>
  );
}
