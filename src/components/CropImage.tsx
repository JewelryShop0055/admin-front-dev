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
      border: "1px solid black",
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
    mouseXY: {
      display: "absolute",
      transform: "translate(0%, -3800%)",
    },
  })
);

interface CropImageProps {
  imageArray: Array<ImageValues>;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
  innerClickX: number;
  innerClickY: number;
}

interface MouseCoordinate {
  x: number;
  y: number;
}

type Mode = "NONE" | "CROP";
type MouseHold = "INNER_HOLD" | "OUTER_HOLD" | false;

const INITIAL_CROP_AREA: CropArea = {
  x: 50,
  y: 50,
  width: 300,
  height: 200,
  innerClickX: 0,
  innerClickY: 0,
};

export default function CropImage({ imageArray }: CropImageProps) {
  const classes = CropImageStyles();

  const [selectedImg, setSelectedImage] = useState<ImageValues | undefined>();
  const [mode, setMode] = useState<Mode>("NONE");
  const [isMouseHold, setIsMouseHold] = useState<MouseHold>(false);

  const rawImageLayer = useRef<HTMLCanvasElement>(null);
  const cropAreaLayer = useRef<HTMLCanvasElement>(null);

  const [cropArea, setCropArea] = useState<CropArea>(INITIAL_CROP_AREA);

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

      if (context && canvas) {
        context.fillStyle = "rgba(104, 104, 104, 0.2)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.setLineDash([4, 2]);
        context.strokeRect(
          cropArea.x,
          cropArea.y,
          cropArea.width,
          cropArea.height
        );
        context.clearRect(
          cropArea.x,
          cropArea.y,
          cropArea.width,
          cropArea.height
        );
      }
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

    if (
      isMouseInCropArea(cropArea, {
        x: evt.clientX - canvasPosition.x,
        y: evt.clientY - canvasPosition.y,
      })
    ) {
      setIsMouseHold("INNER_HOLD");
      setCropArea({
        ...cropArea,
        innerClickX: evt.clientX - canvasPosition.x - cropArea.x,
        innerClickY: evt.clientY - canvasPosition.y - cropArea.y,
      });
      return;
    }

    setIsMouseHold("OUTER_HOLD");
  };
  const handleCropAreaLayerMouseMove = (
    evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (mode === "NONE") return;
    if (!isMouseHold) return;
    const canvasPosition =
      cropAreaLayer.current?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0);

    if (isMouseHold === "INNER_HOLD") {
      setCropArea({
        ...cropArea,
        x: evt.clientX - canvasPosition.x - cropArea.innerClickX,
        y: evt.clientY - canvasPosition.y - cropArea.innerClickY,
      });
    }
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

const isMouseInCropArea = (
  cropArea: CropArea,
  mouseCoordinate: MouseCoordinate
): boolean => {
  if (mouseCoordinate.x < cropArea.x) return false;
  if (mouseCoordinate.x > cropArea.x + cropArea.width) return false;
  if (mouseCoordinate.y < cropArea.y) return false;
  if (mouseCoordinate.y > cropArea.y + cropArea.height) return false;

  return true;
};
