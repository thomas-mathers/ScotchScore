import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Box, Container, Grid, Hidden } from '@mui/material';
import { Outlet } from 'react-router-dom';

import LoginButton from './components/LoginButton';
import LogoButton from './components/LogoButton';
import SearchBar from './components/SearchBar';
import UserMenu from './components/UserMenu';

function App() {
  const { user, isAuthenticated, loginWithPopup, logout } = useAuth0();
  return (
    <Container maxWidth="lg">
      <AppBar>
        <Grid container spacing={1} padding={2} alignItems="center">
          <Hidden smDown>
            <Grid item sm={3} lg={4}>
              <LogoButton />
            </Grid>
          </Hidden>
          <Grid item xs sm={6} lg={4}>
            <SearchBar />
          </Grid>
          <Grid item xs="auto" sm={3} lg={4}>
            <Box display="flex" justifyContent="flex-end">
              {isAuthenticated ? (
                <UserMenu userName={user?.name} onClickLogout={logout} />
              ) : (
                <LoginButton onClick={loginWithPopup} />
              )}
            </Box>
          </Grid>
        </Grid>
      </AppBar>
      <Box
        sx={{
          height: (theme) => ({ xs: theme.spacing(14), sm: theme.spacing(9) }),
        }}
      />
      <Outlet />
    </Container>
  );
}

export default App;
