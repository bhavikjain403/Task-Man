import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/auth/authState';
import { logoutUser } from '../context/auth/authReducer';
import storageService from '../utils/localStorageHelpers';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
  Container,
} from '@material-ui/core';
import { useNavStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const NavBar = () => {
  const [{ user }, authDispatch] = useAuthContext();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useNavStyles();

  const handleLogout = () => {
    authDispatch(logoutUser());
    storageService.logoutUser();
  };

  const loggedUser = storageService.loadUser() || user;

  const menu = () => {
    return user ? (
      <>
        <Typography variant="body1" className={classes.user}>
          Hello, {user && user.displayName}
        </Typography>
        <Button
          color="inherit"
          startIcon={<PowerSettingsNewIcon />}
          onClick={handleLogout}
          className={classes.navButtons}>
          Logout
        </Button>
      </>
    ) : (
      <>
        <Button
          component={RouterLink}
          to="/register"
          color="inherit"
          className={classes.navButtons}
        >
          SIGN UP
        </Button>
        <Button
          component={RouterLink}
          to="/login"
          color="inherit"
          className={classes.navButtons}
        >
          LOG IN
        </Button>
      </>
    );
  };

  return (
    <Container disableGutters className={classes.navContainer}>
      <AppBar position="static" style={{paddingTop:"1%", paddingBottom:"1%", background:"black"}}>
        <Toolbar disableGutters={isMobile}>
          <div className={classes.topLeftButton}>
            {location.pathname === '/' || !loggedUser ? (
              <div className={classes.logoWrapper}>
                <Typography variant = 'h5' className={classes.logo}>
                  <ListAltRoundedIcon className={classes.logoIcon} />
                  TASK--MAN
                </Typography>
              </div>
            ) : (
              <Button
                component={RouterLink}
                to="/"
                color="inherit"
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
            )}
          </div>
          {menu()}
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default NavBar;