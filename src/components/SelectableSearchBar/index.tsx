import { TextField } from "@material-ui/core";
import { ChangeEvent, useState } from "react";

export default function SelectableSearchBar() {
  const [inputText, setInputText] = useState<String>();

  const handleInputText = (
    evt: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputText(evt.target.value);
  };

  return (
    <>
      <TextField
        id="outlined-multiline-static"
        label="카테고리를 입력해주세요."
        variant="outlined"
        value={inputText}
        onChange={handleInputText}
      />
    </>
  );
}
