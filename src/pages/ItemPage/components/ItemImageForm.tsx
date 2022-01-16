import {
  Button,
  Checkbox,
  createStyles,
  FormControlLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
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
    },

    inputImage: {
      display: "none",
    },
  })
);

export function ItemImageForm() {
  const classes = ItemImageFormStyles();

  const [images, setImages] = useState([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const formData = new FormData();

    if (!files) return;

    for (const file of files) {
      formData.append("asd[]", file);
    }

    // imgs.map(img => formData.append('file', img))

    console.log(formData);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>제품 이미지</div>
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
  );
}

export default ItemImageForm;
