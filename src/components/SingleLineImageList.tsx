import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { ImageValues } from "../pages/ItemPage/components/ItemImageForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      flexWrap: "nowrap",
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)",
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
  })
);

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const itemData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

interface SingleLineImageListProps {
  imageArray: Array<ImageValues>;
  setSelectedImage: React.Dispatch<
    React.SetStateAction<ImageValues | undefined>
  >;
}

export default function SingleLineImageList({
  imageArray,
  setSelectedImage,
}: SingleLineImageListProps) {
  const classes = useStyles();

  const selectImg = (image: ImageValues) => {
    setSelectedImage(image);
  };

  return (
    <div className={classes.root}>
      <ImageList className={classes.imageList} cols={2.5}>
        {imageArray.map((image) => (
          <ImageListItem key={image.file.name}>
            <img
              src={image.url}
              alt={image.file.name}
              onClick={() => selectImg(image)}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
