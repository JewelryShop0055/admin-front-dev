import {
  Button,
  Checkbox,
  createStyles,
  Fade,
  FormControlLabel,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  makeStyles,
  Modal,
  TextField,
  Theme,
} from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { FontSize } from "../../../styleTypes";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";
import ItemImageCropModal from "./ItemImageCropModal";

const ItemImageFormStyles = makeStyles((theme: Theme) =>
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
      flexWrap: "wrap",

      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      height: 450,
    },
    thumbnailImageElement: {
      position: "relative",
      "&:hover button": {
        display: "inline-flex",
      },
    },
    deleteBtn: {
      display: "none",
      position: "absolute",
      left: "60%",
      top: "5%",
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  })
);

interface imageSet {
  file: File;
  url: string;
}

interface RenderThumnailImgsProps {
  imageArray: Array<imageSet>;
  handleUploadedImageDelete: (imageName: string) => void;
}

function RenderThumnailImgs({
  imageArray,
  handleUploadedImageDelete,
}: RenderThumnailImgsProps) {
  const classes = ItemImageFormStyles();

  return (
    <div className={classes.thumbnailImagesContainer}>
      <ImageList className={classes.imageList} rowHeight={180}>
        {imageArray.map((image, idx) => {
          return (
            <ImageListItem
              key={image.file.name + idx}
              cols={1}
              className={classes.thumbnailImageElement}
            >
              <img src={image.url} alt={image.file.name} />
              <Button
                variant="contained"
                color="secondary"
                className={classes.deleteBtn}
                startIcon={<DeleteIcon />}
                onClick={(evt) => {
                  evt.preventDefault();
                  handleUploadedImageDelete(image.file.name);
                }}
              >
                Delete
              </Button>
              <ImageListItemBar
                title={image.file.name}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${image.file.name}`}
                    className={classes.icon}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </div>
  );
}

export function ItemImageForm() {
  const classes = ItemImageFormStyles();

  const [images, setImages] = useState<Array<imageSet>>([]);
  const imagesRef = useRef(images);
  imagesRef.current = images;

  const handleUploadedImageDelete = (imageName: string) => {
    const nowImages = images.filter((img) => img.file.name !== imageName);
    setImages(nowImages);
  };
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

        {/* crop버튼은 업로드기능에 통합할 예정 */}
        <ItemImageCropModal />
        {/* 여기까지 모달 */}

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

      <RenderThumnailImgs
        imageArray={images}
        handleUploadedImageDelete={handleUploadedImageDelete}
      />
    </div>
  );
}

export default ItemImageForm;
