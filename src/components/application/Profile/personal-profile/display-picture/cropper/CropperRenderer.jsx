import React from "react";

import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { IconButton, makeStyles } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

import getCroppedImg, { generateDownload } from "../utils/cropImage";

import "./CropperRenderer.css";
import { SnackbarContext } from "../snackbar/Snackbar";
import { dataURLtoFile } from "../utils/dataURLtoFile";

const useStyles = makeStyles({
  IconButton: {
    float: "right",
  },
  CancelIcon: {
    backgroundColor: "white",
    color: "red",
    borderRadius: "50%",
  },
});

export default function CropperRenderer({ handleCropper }) {
  const classes = useStyles();

  const inputRef = React.useRef();

  const triggerFileSelectPopup = () => inputRef.current.click();

  const setStateSnackbarContext = React.useContext(SnackbarContext);

  const [image, setImage] = React.useState(null);
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  const onDownload = () => {
    generateDownload(image, croppedArea);
  };

  const onClear = () => {
    if (!image)
      return setStateSnackbarContext(true, "warning", "No image is selected!");

    setImage(null);
  };

  const onUpload = async () => {
    if (!image)
      return setStateSnackbarContext(
        true,
        "error",
        "No image is selected! Please select an image."
      );

    const canvas = await getCroppedImg(image, croppedArea);
    const canvasDataUrl = canvas.toDataURL("image/jpeg");
    const convertedUrlToFile = dataURLtoFile(
      canvasDataUrl,
      "cropped-image.jpeg"
    );
    console.log(convertedUrlToFile);
  };

  return (
    <div className="cropper_container">
      <div className="cropper_elements_container">
        <IconButton className={classes.IconButton} onClick={handleCropper}>
          <CancelIcon className={classes.CancelIcon} />
        </IconButton>
        <div className="container-crop-area">
          {image ? (
            <>
              <div className="cropper">
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>

              <div className="slider">
                <Slider
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </div>
            </>
          ) : null}
        </div>

        <div className="container-buttons">
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onSelectFile}
            style={{ display: "none" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => onClear()}
            style={{ marginRight: "10px" }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={triggerFileSelectPopup}
            style={{ marginRight: "10px" }}
          >
            Choose
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={onDownload}
            style={{ marginRight: "10px" }}
          >
            Download
          </Button>
          <Button variant="contained" color="secondary" onClick={onUpload}>
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}
