import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Box, Container, Grid, Hidden } from '@mui/material';
import { Outlet } from 'react-router-dom';

import LoginButton from './LoginButton';
import LogoButton from './LogoButton';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

function Root() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
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
                <LoginButton onClick={loginWithRedirect} />
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

export default Root;
