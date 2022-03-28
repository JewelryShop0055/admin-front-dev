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
type MousePosition =
  | "INNER"
  | "E_OUTER"
  | "W_OUTER"
  | "S_OUTER"
  | "N_OUTER"
  | "NE_OUTER"
  | "NW_OUTER"
  | "SE_OUTER"
  | "SW_OUTER"
  | false;

const DISABLED_CROP_AREA: CropArea = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  innerClickX: 0,
  innerClickY: 0,
};

const INITIAL_CROP_AREA: CropArea = {
  x: 50,
  y: 50,
  width: 300,
  height: 200,
  innerClickX: 0,
  innerClickY: 0,
};

enum IMAGE_LAYER_SIZE {
  WIDTH = 800,
  HEIGHT = 800,
}

export default function CropImage({ imageArray }: CropImageProps) {
  const classes = CropImageStyles();

  const [selectedImg, setSelectedImage] = useState<ImageValues | undefined>();
  const [mode, setMode] = useState<Mode>("NONE");

  const [isMouseHold, setIsMouseHold] = useState<MouseHold>(false);

  const rawImageLayer = useRef<HTMLCanvasElement>(null);
  const cropAreaLayer = useRef<HTMLCanvasElement>(null);

  const [cropArea, setCropArea] = useState<CropArea>(DISABLED_CROP_AREA);
  const [mousePosition, setMousePosition] = useState<MousePosition>(false);

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
      if (cropArea === DISABLED_CROP_AREA) {
        setCropArea(INITIAL_CROP_AREA);
      }

      const canvas = cropAreaLayer.current;
      const context = canvas?.getContext("2d");
      if (canvas) context?.clearRect(0, 0, canvas.width, canvas.height);

      if (context && canvas) {
        context.fillStyle = "rgba(104, 104, 104, 0.2)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        drawCropAreaBox(context, cropArea);
      }
    }
    if (mode === "NONE") {
      const canvas = cropAreaLayer.current;
      const context = canvas?.getContext("2d");
      if (canvas) context?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleCursor = () => {
    const bodyTag = document.body;

    switch (mousePosition) {
      case !mousePosition:
        bodyTag.style.cursor = "default";
        break;
      case "NW_OUTER":
        bodyTag.style.cursor = "nwse-resize";
        break;
      case "N_OUTER":
        bodyTag.style.cursor = "ns-resize";
        break;
      case "NE_OUTER":
        bodyTag.style.cursor = "nesw-resize";
        break;
      case "W_OUTER":
        bodyTag.style.cursor = "ew-resize";
        break;
      case "INNER":
        bodyTag.style.cursor = "move";
        break;
      case "E_OUTER":
        bodyTag.style.cursor = "ew-resize";
        break;
      case "SW_OUTER":
        bodyTag.style.cursor = "nesw-resize";
        break;
      case "S_OUTER":
        bodyTag.style.cursor = "ns-resize";
        break;
      case "SE_OUTER":
        bodyTag.style.cursor = "nwse-resize";
        break;
      default:
        bodyTag.style.cursor = "default";
        break;
    }
  };

  const handleCropAreaLayerMouseDown = (
    evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (mode === "NONE") return;

    const canvasPosition =
      cropAreaLayer.current?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0);

    const HOLD_POSITION = isMouseInCropArea(cropArea, {
      x: evt.clientX - canvasPosition.x,
      y: evt.clientY - canvasPosition.y,
    });

    switch (HOLD_POSITION) {
      case "INNER_HOLD":
        console.log("이동");
        setIsMouseHold("INNER_HOLD");
        setCropArea({
          ...cropArea,
          innerClickX: evt.clientX - canvasPosition.x - cropArea.x,
          innerClickY: evt.clientY - canvasPosition.y - cropArea.y,
        });
        break;

      case "OUTER_HOLD":
        setIsMouseHold("OUTER_HOLD");
        break;

      default:
        break;
    }
  };
  const handleCropAreaLayerMouseMove = (
    evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const canvasPosition =
      cropAreaLayer.current?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0);
    const MOUSE_POSITION = mousePositionInCropArea(cropArea, {
      x: evt.clientX - canvasPosition.x,
      y: evt.clientY - canvasPosition.y,
    });

    setMousePosition(MOUSE_POSITION);

    if (mode === "NONE") return;
    if (!isMouseHold) return;

    if (isMouseHold === "INNER_HOLD") {
      setCropArea({
        ...cropArea,
        x: evt.clientX - canvasPosition.x - cropArea.innerClickX,
        y: evt.clientY - canvasPosition.y - cropArea.innerClickY,
      });
    }

    if (isMouseHold === "OUTER_HOLD") {
      console.log("크기조절움직임");
      setCropArea({
        ...cropArea,
        width: evt.clientX - canvasPosition.x,
        height: evt.clientY - canvasPosition.y,
      });
    }
  };

  const handleCropAreaLayerMouseOut = (
    evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (isMouseHold) {
      // 크기조절시 밖으로 나가게되면 멈추게핸들링
      //   setIsMouseHold(false);
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
  useEffect(handleCursor, [mousePosition]);

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
          width={IMAGE_LAYER_SIZE.WIDTH}
          height={IMAGE_LAYER_SIZE.HEIGHT}
        />
        <canvas
          ref={cropAreaLayer}
          className={classes.cropAreaLayer}
          width={IMAGE_LAYER_SIZE.WIDTH}
          height={IMAGE_LAYER_SIZE.HEIGHT}
          onMouseDown={handleCropAreaLayerMouseDown}
          onMouseMove={handleCropAreaLayerMouseMove}
          onMouseOut={handleCropAreaLayerMouseOut}
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

interface CropAreaCoordinates {
  X_OUTER_LEFT: number;
  X_INNER_LEFT: number;
  X_INNER_RIGHT: number;
  X_OUTER_RIGHT: number;
  Y_OUTER_TOP: number;
  Y_INNER_TOP: number;
  Y_INNER_BOTTOM: number;
  Y_OUTER_BOTTOM: number;
}

const mousePositionInCropArea = (
  cropArea: CropArea,
  mouseCoordinate: MouseCoordinate
): MousePosition => {
  const OUTER_MARGIN = 20;

  const COORDINATES: CropAreaCoordinates = {
    X_OUTER_LEFT: cropArea.x - OUTER_MARGIN,
    X_INNER_LEFT:
      cropArea.x + (cropArea.width + OUTER_MARGIN * 2) * 0.2 - OUTER_MARGIN,
    X_INNER_RIGHT:
      cropArea.x + (cropArea.width + OUTER_MARGIN * 2) * 0.8 - OUTER_MARGIN,
    X_OUTER_RIGHT: cropArea.x + cropArea.width + OUTER_MARGIN,
    Y_OUTER_TOP: cropArea.y - OUTER_MARGIN,
    Y_INNER_TOP:
      cropArea.y + (cropArea.height + OUTER_MARGIN * 2) * 0.2 - OUTER_MARGIN,
    Y_INNER_BOTTOM:
      cropArea.y + (cropArea.height + OUTER_MARGIN * 2) * 0.8 - OUTER_MARGIN,
    Y_OUTER_BOTTOM: cropArea.y + cropArea.height + OUTER_MARGIN,
  };

  if (
    mouseCoordinate.x < COORDINATES.X_OUTER_LEFT ||
    mouseCoordinate.x >= COORDINATES.X_OUTER_RIGHT ||
    mouseCoordinate.y < COORDINATES.Y_OUTER_TOP ||
    mouseCoordinate.y >= COORDINATES.Y_OUTER_BOTTOM
  )
    return false;

  if (
    mouseCoordinate.x >= COORDINATES.X_OUTER_LEFT &&
    mouseCoordinate.x < COORDINATES.X_INNER_LEFT &&
    mouseCoordinate.y >= COORDINATES.Y_OUTER_TOP &&
    mouseCoordinate.y < COORDINATES.Y_INNER_TOP
  )
    return "NW_OUTER";

  if (
    mouseCoordinate.x >= COORDINATES.X_INNER_LEFT &&
    mouseCoordinate.x < COORDINATES.X_INNER_RIGHT &&
    mouseCoordinate.y >= COORDINATES.Y_OUTER_TOP &&
    mouseCoordinate.y < COORDINATES.Y_INNER_TOP
  )
    return "N_OUTER";

  if (
    mouseCoordinate.x >= COORDINATES.X_INNER_RIGHT &&
    mouseCoordinate.x < COORDINATES.X_OUTER_RIGHT &&
    mouseCoordinate.y >= COORDINATES.Y_OUTER_TOP &&
    mouseCoordinate.y < COORDINATES.Y_INNER_TOP
  )
    return "NE_OUTER";
  if (
    mouseCoordinate.x >= COORDINATES.X_OUTER_LEFT &&
    mouseCoordinate.x < COORDINATES.X_INNER_LEFT &&
    mouseCoordinate.y >= COORDINATES.Y_INNER_TOP &&
    mouseCoordinate.y < COORDINATES.Y_INNER_BOTTOM
  )
    return "W_OUTER";
  if (
    mouseCoordinate.x >= COORDINATES.X_INNER_LEFT &&
    mouseCoordinate.x < COORDINATES.X_INNER_RIGHT &&
    mouseCoordinate.y >= COORDINATES.Y_INNER_TOP &&
    mouseCoordinate.y < COORDINATES.Y_INNER_BOTTOM
  )
    return "INNER";
  if (
    mouseCoordinate.x >= COORDINATES.X_INNER_RIGHT &&
    mouseCoordinate.x < COORDINATES.X_OUTER_RIGHT &&
    mouseCoordinate.y >= COORDINATES.Y_INNER_TOP &&
    mouseCoordinate.y < COORDINATES.Y_INNER_BOTTOM
  )
    return "E_OUTER";
  if (
    mouseCoordinate.x >= COORDINATES.X_OUTER_LEFT &&
    mouseCoordinate.x < COORDINATES.X_INNER_LEFT &&
    mouseCoordinate.y >= COORDINATES.Y_INNER_BOTTOM &&
    mouseCoordinate.y < COORDINATES.Y_OUTER_BOTTOM
  )
    return "SW_OUTER";
  if (
    mouseCoordinate.x >= COORDINATES.X_INNER_LEFT &&
    mouseCoordinate.x < COORDINATES.X_INNER_RIGHT &&
    mouseCoordinate.y >= COORDINATES.Y_INNER_BOTTOM &&
    mouseCoordinate.y < COORDINATES.Y_OUTER_BOTTOM
  )
    return "S_OUTER";
  if (
    mouseCoordinate.x >= COORDINATES.X_INNER_RIGHT &&
    mouseCoordinate.x < COORDINATES.X_OUTER_RIGHT &&
    mouseCoordinate.y >= COORDINATES.Y_INNER_BOTTOM &&
    mouseCoordinate.y < COORDINATES.Y_OUTER_BOTTOM
  )
    return "SE_OUTER";

  return false;
};

const isMouseInCropArea = (
  cropArea: CropArea,
  mouseCoordinate: MouseCoordinate
): MouseHold => {
  if (
    mouseCoordinate.x > cropArea.x + 20 &&
    mouseCoordinate.x < cropArea.x + cropArea.width - 20 &&
    mouseCoordinate.y > cropArea.y + 20 &&
    mouseCoordinate.y < cropArea.y + cropArea.height - 20
  )
    return "INNER_HOLD";

  if (
    mouseCoordinate.x > cropArea.x &&
    mouseCoordinate.x < cropArea.x + cropArea.width &&
    mouseCoordinate.y > cropArea.y &&
    mouseCoordinate.y < cropArea.y + cropArea.height
  )
    return "OUTER_HOLD";

  return false;
};

const drawCropAreaBox = (
  ctx: CanvasRenderingContext2D,
  cropArea: CropArea
): void => {
  const cropHandlerBoxWidth = 16;

  ctx.setLineDash([4, 2]);
  ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);
  ctx.clearRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

  ctx.setLineDash([]);
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.strokeRect(
    cropArea.x - cropHandlerBoxWidth / 2,
    cropArea.y - cropHandlerBoxWidth / 2,
    cropHandlerBoxWidth,
    cropHandlerBoxWidth
  );
  ctx.fillRect(
    cropArea.x - cropHandlerBoxWidth / 2,
    cropArea.y - cropHandlerBoxWidth / 2,
    cropHandlerBoxWidth,
    cropHandlerBoxWidth
  );

  ctx.strokeRect(
    cropArea.x + cropArea.width - cropHandlerBoxWidth / 2,
    cropArea.y - cropHandlerBoxWidth / 2,
    cropHandlerBoxWidth,
    cropHandlerBoxWidth
  );
  ctx.fillRect(
    cropArea.x + cropArea.width - cropHandlerBoxWidth / 2,
    cropArea.y - cropHandlerBoxWidth / 2,
    cropHandlerBoxWidth,
    cropHandlerBoxWidth
  );

  ctx.strokeRect(
    cropArea.x - cropHandlerBoxWidth / 2,
    cropArea.y + cropArea.height - cropHandlerBoxWidth / 2,
    cropHandlerBoxWidth,
    cropHandlerBoxWidth
  );
  ctx.fillRect(
    cropArea.x - cropHandlerBoxWidth / 2,
    cropArea.y + cropArea.height - cropHandlerBoxWidth / 2,
    cropHandlerBoxWidth,
    cropHandlerBoxWidth
  );

  ctx.strokeRect(
    cropArea.x + cropArea.width - cropHandlerBoxWidth / 2,
    cropArea.y + cropArea.height - cropHandlerBoxWidth / 2,
    cropHandlerBoxWidth,
    cropHandlerBoxWidth
  );
  ctx.fillRect(
    cropArea.x + cropArea.width - cropHandlerBoxWidth / 2,
    cropArea.y + cropArea.height - cropHandlerBoxWidth / 2,
    cropHandlerBoxWidth,
    cropHandlerBoxWidth
  );
};
