import { Box } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as any;

  return (
    <Box
      width="300px"
      height="202px"
      position="absolute"
      top={0}
      bottom={0}
      left={0}
      right={0}
      margin="auto"
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
    </Box>
  );
}
