import React, { ChangeEvent, CSSProperties, MouseEventHandler } from "react";

import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
// import { makeStyles } from '@mui/material/styles'
import CancelIcon from "@mui/icons-material/Cancel";

import getCroppedImg, { generateDownload } from "../utils/cropImage";

import "./CropperRenderer.css";
import { SnackbarContext, SnackbarStateContext } from "../snackbar/Snackbar";
import { dataURLtoFile } from "../utils/dataURLtoFile";

const IconButtonStyle: CSSProperties = {
  float: "right"
};

const CancelIconStyle: CSSProperties = {
  backgroundColor: "white",
  color: "red",
  borderRadius: "50%"
};

interface CropperRendererProps {
  handleCropper: MouseEventHandler<HTMLButtonElement>
};

interface Crop {
  x: number,
  y: number
};

export default function CropperRenderer({ handleCropper }: CropperRendererProps) {
  // const classes = useStyles();

  const inputRef = React.useRef<any>();

  const triggerFileSelectPopup = () => inputRef.current.click();

  const setStateSnackbarContext = React.useContext<SnackbarStateContext>(SnackbarContext);

  const [image, setImage] = React.useState<string | ArrayBuffer | null | HTMLImageElement>(null);
  const [croppedArea, setCroppedArea] = React.useState<any>(null);
  const [crop, setCrop] = React.useState<Crop>({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState<any>(1);

  const onCropComplete = (croppedAreaPercentage: any, croppedAreaPixels: any) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  const onDownload = () => {
    if (!image)
      return setStateSnackbarContext(
        true,
        "error",
        "No image is uploaded! Nothing to download."
      )

    generateDownload(image, croppedArea);
  };

  const onClear = () => {
    if (!image)
      return setStateSnackbarContext(
        true,
        "warning",
        "No image is selected!"
      );

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
    const canvasDataUrl = canvas.toDataURL("image/jpg");
    const convertedUrlToFile = dataURLtoFile(
      canvasDataUrl,
      "cropped-image.jpg"
    );
    console.log(convertedUrlToFile);
  };

  return (
    <div className="cropper_container">
      <div className="cropper_elements_container">
        <IconButton style={IconButtonStyle} onClick={handleCropper}>
          <CancelIcon style={CancelIconStyle} />
        </IconButton>
        <div className="container-crop-area">
          {image ? (
            <>
              <div className="cropper">
                <Cropper
                  image={image.toString()}
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
