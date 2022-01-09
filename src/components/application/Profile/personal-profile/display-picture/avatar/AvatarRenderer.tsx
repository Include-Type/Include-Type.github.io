import React, { CSSProperties } from "react";
import { useState } from "react";
import { IconButton } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import CropperRenderer from "../cropper/CropperRenderer";

// import { makeStyles, createStyles, Theme } from "@mui/material/styles";

import "./AvatarRenderer.css";

// const rootStyle = {
//   display: "flex"
// };

// const paperStyle = {
//   marginRight: "16px"
// };

const cameraIconButtonStyle: CSSProperties = {
  height: "2.5vw",
  width: "2.5vw",
  position: "absolute",
  backgroundColor: "white",
  bottom: "0",
  right: "5%",
};

const cameraIconStyle: CSSProperties = {
  fontSize: "1.7vw",
};

const menuListStyle: CSSProperties = {
  marginTop: "5%",
};

export default function AvatarRenderer() {
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (
    event: MouseEvent | TouchEvent | React.MouseEvent<EventTarget>
  ) => {
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
          <img src=""alt="" className="avatar_image" />
        </div>
        <IconButton
          style={cameraIconButtonStyle}
          // className={classes.cameraIconButton}
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <CameraAltIcon style={cameraIconStyle} />
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
                    style={menuListStyle}
                    // className={classes.menuList}
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
