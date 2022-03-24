import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { ImageValues } from "../pages/ItemPage/components/ItemImageForm";
import SingleLineImageList from "./SingleLineImageList";

const CropImageStyles = makeStyles((theme: Theme) =>
  createStyles({
    cropImageContainer: {
      marginTop: "10px",
      "& > *": {
        boxSizing: "border-box",
      },
    },
    rawImageLayer: {
      display: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(0%, 0%)",
    },
    cropAreaLayer: {
      display: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(0%, -100%)",
    },

    cropModeBtn: {
      display: "absolute",
      transform: "translate(-1280%, -3500%)",
    },
  })
);

interface CropImageProps {
  imageArray: Array<ImageValues>;
}

type Mode = "NONE" | "CROP";

const INITIAL_CROP_AREA = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

export default function CropImage({ imageArray }: CropImageProps) {
  const classes = CropImageStyles();

  const [selectedImg, setSelectedImage] = useState<ImageValues | undefined>();
  const [mode, setMode] = useState<Mode>("NONE");
  const [isMouseHold, setIsMouseHold] = useState<boolean>(false);

  const rawImageLayer = useRef<HTMLCanvasElement>(null);
  const cropAreaLayer = useRef<HTMLCanvasElement>(null);

  const [cropArea, setCropArea] = useState(INITIAL_CROP_AREA);

  const handleCropMode = () => {
    switch (mode) {
      case "NONE":
        setMode("CROP");
        break;

      case "CROP":
        setMode("NONE");
        break;

      default:
        break;
    }
  };

  const drawRawImageLayer = () => {
    setMode("NONE");
    if (selectedImg === undefined) return;

    const canvas = rawImageLayer.current;
    const context = canvas?.getContext("2d");
    context?.clearRect(0, 0, 800, 800);
    const img = new Image();
    img.src = selectedImg?.url;
    img.onload = () => {
      context?.drawImage(img, 0, 0, 800, 800);
    };
  };

  const drawCropAreaLayer = () => {
    if (mode === "CROP") {
      const canvas = cropAreaLayer.current;
      const context = canvas?.getContext("2d");
      if (canvas) context?.clearRect(0, 0, canvas.width, canvas.height);

      if (context) context.fillStyle = "rgba(240, 22, 22, 0.2)";
      context?.setLineDash([4, 2]);
      context?.strokeRect(
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height
      );
      context?.fillRect(
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height
      );
    }
    if (mode === "NONE") {
      const canvas = cropAreaLayer.current;
      const context = canvas?.getContext("2d");
      if (canvas) context?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleCropAreaLayerMouseDown = (
    evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (mode === "NONE") return;

    const canvasPosition =
      cropAreaLayer.current?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0);
    setCropArea({
      ...cropArea,
      x: evt.clientX - canvasPosition.x,
      y: evt.clientY - canvasPosition.y,
    });
    setIsMouseHold(true);
  };
  const handleCropAreaLayerMouseMove = (
    evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (mode === "NONE") return;
    if (!isMouseHold) return;
    const canvasPosition =
      cropAreaLayer.current?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0);
    setCropArea({
      ...cropArea,
      width: evt.clientX - cropArea.x - canvasPosition.x,
      height: evt.clientY - cropArea.y - canvasPosition.y,
    });
  };
  const handleCropAreaLayerMouseUp = (
    evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (mode === "NONE") return;
    if (!isMouseHold) return;

    setIsMouseHold(false);
  };

  useEffect(drawRawImageLayer, [selectedImg]);
  useEffect(drawCropAreaLayer, [cropArea, mode]);

  return (
    <>
      <SingleLineImageList
        imageArray={imageArray}
        setSelectedImage={setSelectedImage}
      />

      <div className={classes.cropImageContainer}>
        <canvas
          ref={rawImageLayer}
          className={classes.rawImageLayer}
          width={800}
          height={800}
        />
        <canvas
          ref={cropAreaLayer}
          className={classes.cropAreaLayer}
          width={800}
          height={800}
          onMouseDown={handleCropAreaLayerMouseDown}
          onMouseMove={handleCropAreaLayerMouseMove}
          onMouseUp={handleCropAreaLayerMouseUp}
        />
        <button
          className={classes.cropModeBtn}
          onClick={handleCropMode}
          disabled={selectedImg === undefined}
        >
          {mode === "NONE" ? "잘라내기" : "취소"}
        </button>
      </div>
    </>
  );
}
