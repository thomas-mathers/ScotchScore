import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

function LoginButton() {
  const { loginWithPopup } = useAuth0();

  return (
    <Button variant="text" color="inherit" onClick={() => loginWithPopup()}>
      Login
    </Button>
  );
}

export default LoginButton;
