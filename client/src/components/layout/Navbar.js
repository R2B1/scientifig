import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import LockIcon from '@material-ui/icons/Lock';
import AppsIcon from '@material-ui/icons/Apps';
import AddIcon from '@material-ui/icons/Add';
import Hidden from '@material-ui/core/Hidden';
// import withWidth from '@material-ui/core/withWidth';
import { logout } from "../../actions/auth";
import { clearFigures } from "../../actions/figure";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingBottom: theme.spacing(2),
  },
  iconButton: {
    color: "white",
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  link: {
    color: "white",
    textDecoration: "none"
  }
}));

const Navbar = ({ auth: { isAuthenticated, loading }, logout, clearFigures }) => {
  const classes = useStyles();
  const [toHome, setToHome] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    clearFigures();
    handleMenuClose();
    setToHome(true);
  };

  const authLinks = (
    <>
      <Button component={Link} to="/dashboard" startIcon={<AppsIcon />}>
        My Figures
      </Button>
      <Button component={Link} to="/editor/new" startIcon={<AddIcon />}>
        New Figure
      </Button>
      <Button onClick={handleLogout} startIcon={<LockIcon />}>Sign out</Button>
    </>
  );

  const authLinksMenu = (
    <Menu
      id="nav-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to="/dashboard" onClick={handleMenuClose}>
        <Button startIcon={<AppsIcon />}>
          My Figures
        </Button>
      </MenuItem>
      <MenuItem component={Link} to="/editor/new" onClick={handleMenuClose}>
        <Button startIcon={<AddIcon />}>
          New Figure
        </Button>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <Button startIcon={<LockIcon />}>Sign out</Button>
      </MenuItem>
    </Menu>
  );

  const guestLinks = (
    <>
      <Button component={Link} to="/editor/new" startIcon={<AddIcon />}>
        New Figure
      </Button>
      <RegisterModal buttonLabel="Register" />
      <LoginModal buttonLabel="Sign in" />
    </>
  );

  const guestLinksMenu = (
    <Menu
      id="nav-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to="/editor/new" onClick={handleMenuClose}>
        <Button startIcon={<AddIcon />}>
          New Figure
        </Button>
      </MenuItem>
      <MenuItem>
        <RegisterModal buttonLabel="Register" buttonOnClick={handleMenuClose} />
      </MenuItem>
      <MenuItem>
        <LoginModal buttonLabel="Sign in" buttonOnClick={handleMenuClose} />
      </MenuItem>
    </Menu>
  );

  if (toHome) {
    setToHome(false);
    return <Redirect to="/editor/example" />;
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="inherit">
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/editor/example">
              Scientifig
            </Link>
          </Typography>
          {!loading && (
            <>
              <Hidden xsDown>
                {isAuthenticated ? authLinks : guestLinks}
              </Hidden>
              <Hidden smUp>
                <IconButton
                  edge="start"
                  className={classes.iconButton}
                  aria-label="menu"
                  onClick={handleMenuClick}
                >
                  <MenuIcon />
                </IconButton>
                {isAuthenticated ? authLinksMenu : guestLinksMenu}
              </Hidden>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" />
    </div>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  clearFigures: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  figure: state.figure
});

export default connect(mapStateToProps, { logout, clearFigures })(Navbar);
