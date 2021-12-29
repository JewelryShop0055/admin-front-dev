import { Typography } from "@material-ui/core";

interface PaginationTextParams {
  headerText: string;
  mainText: string;
  subText?: string;
}

export default function PaginationTexts({
  headerText,
  mainText,
}: PaginationTextParams) {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        {headerText}
      </Typography>

      <Typography variant="subtitle1" gutterBottom color="textSecondary">
        {mainText}
      </Typography>
    </>
  );
}
