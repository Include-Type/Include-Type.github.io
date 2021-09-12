import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
// import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

export const BackdropContext = React.createContext({});

export default function SimpleBackdrop({ children }: any) {
  const classes = useStyles();
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
        className={classes.backdrop}
        open={open}
        onClick={backdropClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
    </BackdropContext.Provider>
  );
}
