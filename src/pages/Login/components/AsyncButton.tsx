import { useAsyncCallback } from "react-async-hook";
import Button from "@material-ui/core/Button";
import { signinEvent } from "./signinEvent";

interface appButtonParams {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  loadingMessage?: string;
}

export const SigninButton = ({ onClick, children }: appButtonParams) => {
  const asyncOnClick = useAsyncCallback(onClick);
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={asyncOnClick.execute}
      disabled={asyncOnClick.loading}
    >
      {asyncOnClick.loading ? "로그인 중" : children}
    </Button>
  );
};

export const AsyncButton = ({
  onClick,
  children,
  loadingMessage,
}: appButtonParams) => {
  const asyncOnClick = useAsyncCallback(onClick);
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      onClick={asyncOnClick.execute}
      disabled={asyncOnClick.loading}
    >
      {asyncOnClick.loading ? loadingMessage : children}
    </Button>
  );
};
