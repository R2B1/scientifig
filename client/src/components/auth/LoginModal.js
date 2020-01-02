import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import PersonIcon from '@material-ui/icons/Person';
import { login } from "../../actions/auth";

const useStyles = makeStyles(theme => ({
  dialogContent: {
    padding: theme.spacing(2)
  },
  paper: {
    margin: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    backgroundColor: "white",
    margin: theme.spacing(1)
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  link: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    textDecoration: "underline"
  },
}));

const LoginModal = ({ login, isAuthenticated, buttonLabel, buttonClasses, buttonOnClick }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [open, setOpen] = useState(false);
  const { email, password } = formData;
  const classes = useStyles();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Button
        className={buttonClasses}
        onClick={() => {
          setOpen(true);
          if (buttonOnClick) buttonOnClick();
        }}
        startIcon={<PersonIcon />}
        variant="contained"
      >
        {buttonLabel}
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent className={classes.dialogContent}>
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={e => handleSubmit(e)}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      onChange={e => handleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={e => handleChange(e)}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                  startIcon={<PersonIcon />}
                >
                  Sign in
                </Button>
                {/* <Grid container justify="flex-end">
                  <Grid item>
                    Don't have an account? <Link to="/register" className={classes.link}>Register</Link>
                  </Grid>
                </Grid> */}
              </form>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
};

LoginModal.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(LoginModal);
