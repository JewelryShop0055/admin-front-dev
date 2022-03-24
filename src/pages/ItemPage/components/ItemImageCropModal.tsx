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
import CropImage from "../../../components/CropImage";

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
      width: 1000,
      height: 1200,
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
      transform: "translate(0%, 0%)",
    },
    dragCropArea: {
      boxSizing: "border-box",
      display: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(0%, -100%)",
    },
    cropModeBtn: {
      display: "absolute",
      transform: "translate(0%, -2000%)",
    },
    cropSaveBtn: {
      display: "absolute",
      transform: "translate(20%, -1910%)",
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
        };
      } catch (err) {
        console.log("ERROR:", fileReader.error);
      }
    });

    setOpen(true);
  };

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
        <Button variant="contained" color="primary" component="span">
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
            <CropImage imageArray={images} />
          </div>
        </Fade>
      </Modal>
    </>
  );
}
