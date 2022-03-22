import { FormControl, Select } from "@material-ui/core";
import { useState } from "react";

export default function SuggestionList() {
  const [selectedValue, setSelectedValue] = useState<{
    category: string;
    craftshop: string;
  }>({
    category: "카테고리를 선택하세요",
    craftshop: "",
  });

  const handleChangeSelectedValue = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof selectedValue;
    setSelectedValue({
      ...selectedValue,
      [name]: event.target.value,
    });
  };

  return (
    <FormControl>
      <Select
        native
        value={selectedValue}
        onChange={handleChangeSelectedValue}
        inputProps={{
          //   name: targetName,
          id: "age-native-simple",
        }}
      >
        <option aria-label="공방을 선택하세요" value="">
          카테고리를 선택하세요
        </option>
        {/* 추후 option의 value는 해당 항목의 id값을 배정해야함 */}
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </Select>
    </FormControl>
  );
}
