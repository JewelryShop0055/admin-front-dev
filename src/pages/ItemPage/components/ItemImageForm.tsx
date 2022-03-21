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
    thumbnailImage: {
      width: "100px",
      height: "100px",
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
    <>
      {imageArray.map((image) => {
        return (
          <img
            className={classes.thumbnailImage}
            src={image.url}
            alt={"asdf"}
          />
        );
      })}
    </>
  );
}

export function ItemImageForm() {
  const classes = ItemImageFormStyles();

  const [images, setImages] = useState<Array<imageSet>>([]);
  const imagesRef = useRef(images);
  imagesRef.current = images;

  const handleImageUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) return;

    console.log(evt.target.files);

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

    console.log(images);
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

      <div>
        <RenderThumnailImgs imageArray={images} />
      </div>
    </div>
  );
}

export default ItemImageForm;
