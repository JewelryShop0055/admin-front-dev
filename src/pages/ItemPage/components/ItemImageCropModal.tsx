import { useEffect, useRef, useState } from "react";

import {
  Button,
  createStyles,
  Fade,
  makeStyles,
  Modal,
  Theme,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";

interface imageSet {
  file: File;
  url: string;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ItemImageCropModalStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputImage: {
      display: "none",
    },
    modal: {
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      boxSizing: "border-box",
      width: 600,
      height: 800,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: "relative",
    },

    rawImageLayer: {
      boxSizing: "border-box",
      display: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    dragCropArea: {
      boxSizing: "border-box",
      display: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  })
);

export default function ItemImageCropModal() {
  const classes = ItemImageCropModalStyles();
  const [images, setImages] = useState<Array<imageSet>>([]);
  const imagesRef = useRef(images);
  imagesRef.current = images;

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImages([]);
  };
  const handleImageUploadForCrop = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!evt.target.files) return;

    let imageFilesArray = Array.from(evt.target.files);

    imageFilesArray.map((imageFile) => {
      let fileReader = new FileReader();

      try {
        fileReader.readAsDataURL(imageFile);

        fileReader.onerror = () => {
          throw new Error("can't read file");
        };

        fileReader.onload = () => {
          if (fileReader.result === null) {
            throw new Error("can't read file");
          }
          const imageURL = fileReader.result.toString();

          const newImages = [
            ...imagesRef.current,
            {
              file: imageFile,
              url: imageURL,
            },
          ];

          setImages(newImages);

          //
          const canvas = rawImageLayer.current;
          const context = canvas?.getContext("2d");
          const img = new Image();
          img.src = imageURL;
          img.onload = () => {
            context?.drawImage(img, 0, 0, 800, 800);
          };
        };
      } catch (err) {
        console.log("ERROR:", fileReader.error);
      }
    });

    setOpen(true);
  };

  //====
  const rawImageLayer = useRef<HTMLCanvasElement>(null);
  const dragLayer = useRef<HTMLCanvasElement>(null);
  const croptedImageLayer = useRef<HTMLCanvasElement>(null);

  const INITIAL_CROP_AREA = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  const [cropArea, setCropArea] = useState(INITIAL_CROP_AREA);
  const [isDrag, setIsDrag] = useState(false);

  useEffect(() => {
    const canvas = dragLayer.current;
    const context = canvas?.getContext("2d");
    if (canvas) context?.clearRect(0, 0, canvas.width, canvas.height);
    if (context) context.fillStyle = "rgba(240, 22, 22, 0.2)";
    context?.fillRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);
  }, [cropArea]);

  return (
    <>
      <input
        accept="image/*"
        className={classes.inputImage}
        id="cropImage"
        multiple
        type="file"
        onChange={handleImageUploadForCrop}
      />
      <label htmlFor="cropImage">
        <Button
          variant="contained"
          color="primary"
          component="span"
          // onClick={handleOpen}
        >
          upload&crop
        </Button>
      </label>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {images.map((image) => {
              return (
                <>
                  {/* <img src={image.url} alt={image.file.name} width="400px" /> */}
                  <canvas
                    ref={rawImageLayer}
                    className={classes.rawImageLayer}
                    width={500}
                    height={500}
                  />
                  <canvas
                    ref={dragLayer}
                    className={classes.dragCropArea}
                    width={500}
                    height={500}
                    onMouseDown={(evt) => {
                      setIsDrag(true);
                      // console.log(evt.)
                      const canvasPosition =
                        dragLayer.current?.getBoundingClientRect() ??
                        new DOMRect(0, 0, 0, 0);
                      setCropArea({
                        ...cropArea,
                        x: evt.clientX - canvasPosition.x,
                        y: evt.clientY - canvasPosition.y,
                      });
                    }}
                    onMouseMove={(evt) => {
                      if (isDrag) {
                        console.log(cropArea);
                        const canvasPosition =
                          dragLayer.current?.getBoundingClientRect() ??
                          new DOMRect(0, 0, 0, 0);
                        setCropArea({
                          ...cropArea,
                          width: evt.clientX - cropArea.x - canvasPosition.x,
                          height: evt.clientY - cropArea.y - canvasPosition.y,
                        });
                      }
                    }}
                    onMouseUp={(evt) => {
                      setIsDrag(false);
                      console.log(cropArea);
                      setCropArea(INITIAL_CROP_AREA);
                    }}
                  />
                </>
              );
            })}
          </div>
        </Fade>
      </Modal>
    </>
  );
}
