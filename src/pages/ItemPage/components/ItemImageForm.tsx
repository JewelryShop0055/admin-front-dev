import {
  Button,
  Checkbox,
  createStyles,
  FormControlLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
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
  file: File | null;
  url: string | null;
}

export function ItemImageForm() {
  const classes = ItemImageFormStyles();

  const [image, setImage] = useState<imageSet>({ file: null, url: null });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    let reader = new FileReader();
    let setFile = e.target.files[0];
    //이미지 등록과정 에러핸들링도 추후 추가해야함
    reader.onloadend = () => {
      console.log(typeof reader.result); //string
      setImage({
        file: setFile,
        url: reader.result!.toString(),
      });
    };
    reader.readAsDataURL(setFile);
  };

  useEffect(() => {
    console.log(image.url, typeof image.url);
  }, [image]);

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
        {image.file && image.url && (
          <img
            className={classes.thumbnailImage}
            src={image.url}
            alt={"asdf"}
          />
        )}
      </div>
    </div>
  );
}

export default ItemImageForm;
