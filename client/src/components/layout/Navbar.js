import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import LockIcon from '@material-ui/icons/Lock';
import AppsIcon from '@material-ui/icons/Apps';
import AddIcon from '@material-ui/icons/Add';
import { logout } from "../../actions/auth";
import { clearFigures } from "../../actions/figure";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingBottom: theme.spacing(2)
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

  const handleLogout = () => {
    logout();
    clearFigures();
    setToHome(true);
  };

  const authLinks = (
    <div>
      <Button component={Link} to="/dashboard" startIcon={<AppsIcon />}>
        My Figures
      </Button>
      <Button component={Link} to="/editor/new" startIcon={<AddIcon />}>
        New Figure
      </Button>
      <Button onClick={handleLogout} startIcon={<LockIcon />}>Sign out</Button>
    </div>
  );

  const guestLinks = (
    <div>
      <Button component={Link} to="/editor/new" startIcon={<AddIcon />}>
        New Figure
      </Button>
      <RegisterModal buttonLabel="Register" />
      <LoginModal buttonLabel="Sign in" />
    </div>
  );

  if (toHome) {
    setToHome(false);
    return <Redirect to="/editor/example" />;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.iconButton}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/editor/example">
              Scientifig
            </Link>
          </Typography>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </Toolbar>
      </AppBar>
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
