import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function LogoButton() {
  return (
    <Link
      component={RouterLink}
      to="/"
      variant="h6"
      underline="none"
      color="inherit"
    >
      ScotchScore
    </Link>
  );
}

export default LogoButton;
