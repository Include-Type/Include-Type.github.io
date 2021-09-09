import React from "react";
import "./DisplayPicture.css";
// import CropperRenderer from "./cropper/CropperRenderer";
import AvatarRenderer from "./avatar/AvatarRenderer";
import ProfilePictureSnackbars from "./snackbar/Snackbar";
import SimpleBackdrop from "./backdrop/BackdropLoading";

export default function DisplayPicture() {
  return (
    <ProfilePictureSnackbars>
      <SimpleBackdrop>
        <div className="display_picture">
          <AvatarRenderer />
        </div>
      </SimpleBackdrop>
    </ProfilePictureSnackbars>
  );
}
