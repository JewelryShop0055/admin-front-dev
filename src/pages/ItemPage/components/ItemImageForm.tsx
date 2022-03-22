import {
  Button,
  Checkbox,
  createStyles,
  FormControlLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { FontSize } from "../../../styleTypes";
import DeleteIcon from "@material-ui/icons/Delete";

const ItemImageFormStyles = makeStyles(
  createStyles({
    root: {
      padding: "20px",

      "& > div:nth-child(n+1)": {
        marginBottom: "20px",
      },
    },
    header: {
      fontSize: FontSize.LARGE,
      fontWeight: "bold",

      display: "flex",

      "& > div:nth-child(1)": {
        flex: "1",
      },
    },

    inputImage: {
      display: "none",
    },

    thumbnailImagesContainer: {
      display: "flex",
      flex: "0.33 0.33 0.33",
    },
    thumbnailImage: {
      position: "relative",
      width: "250px",
      height: "250px",

      "&:hover > button": {
        display: "inline-flex",
      },
    },
    unvisibleDeleteBtn: {
      display: "none",
      left: "50%",
      top: "-100%",
    },
    visibleDeleteBtn: {
      left: "50%",
      top: "-100%",
    },
  })
);

interface imageSet {
  file: File;
  url: string;
}

interface RenderThumnailImgsProps {
  imageArray: Array<imageSet>;
}

function RenderThumnailImgs({ imageArray }: RenderThumnailImgsProps) {
  const classes = ItemImageFormStyles();

  return (
    <div className={classes.thumbnailImagesContainer}>
      {imageArray.map((image) => {
        return (
          <div className={classes.thumbnailImage}>
            <img src={image.url} alt={image.file.name} width="250px" />
            <Button
              variant="contained"
              color="secondary"
              className={classes.unvisibleDeleteBtn}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export function ItemImageForm() {
  const classes = ItemImageFormStyles();

  const [images, setImages] = useState<Array<imageSet>>([]);
  const imagesRef = useRef(images);
  imagesRef.current = images;

  const handleImageUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div>제품 이미지</div>
        <input
          accept="image/*"
          className={classes.inputImage}
          id="input-item-images"
          multiple
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="input-item-images">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
      </div>

      <RenderThumnailImgs imageArray={images} />
    </div>
  );
}

export default ItemImageForm;
