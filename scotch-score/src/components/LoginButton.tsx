import { Button } from '@mui/material';

interface LoginButtonProps {
  onClick?: () => void;
}

function LoginButton({ onClick }: LoginButtonProps) {
  return (
    <Button variant="text" color="inherit" onClick={onClick}>
      Login
    </Button>
  );
}

export default LoginButton;
export type { LoginButtonProps };
