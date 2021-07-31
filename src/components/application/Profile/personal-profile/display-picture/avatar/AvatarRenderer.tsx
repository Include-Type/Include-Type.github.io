import React from "react";
import { useState, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

import CropperRenderer from "../cropper/CropperRenderer";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import "./AvatarRenderer.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    cameraIconButton: {
      height: "2.5vw",
      width: "2.5vw",
      position: "absolute",
      backgroundColor: "white",
      bottom: "0",
      right: "5%",

      "&:hover": {
        backgroundColor: "white",
      },
    },
    cameraIcon: {
      fontSize: "1.7vw",
    },
    menuList: {
      marginTop: "5%",
    },
  })
);

export default function AvatarRenderer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const [showCropper, setShowCropper] = useState(false);

  const handleCropper = () => setShowCropper((prevValue) => !prevValue);

  return (
    <div className="avatar_editor">
      <div className="avatar_container">
        <div className="avatar">
          <img src="" alt="" className="avatar_image" />
        </div>
        <IconButton
          className={classes.cameraIconButton}
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <CameraAltIcon className={classes.cameraIcon} />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal={false}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    className={classes.menuList}
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>View</MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        handleCropper();
                        handleClose(e);
                      }}
                    >
                      Change
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Remove</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      {showCropper && <CropperRenderer handleCropper={handleCropper} />}
    </div>
  );
}
