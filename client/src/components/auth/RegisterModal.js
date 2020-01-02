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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

const useStyles = makeStyles(theme => ({
  dialogContent: {
    padding: theme.spacing(2)
  },
  paper: {
    margin: 0,
    padding: 0,
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

const RegisterModal = ({
  setAlert,
  register,
  isAuthenticated,
  buttonLabel,
  buttonOnClick
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: ""
  });
  const [open, setOpen] = useState(false);
  const { email, password, password2 } = formData;
  const classes = useStyles();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
          if (buttonOnClick) buttonOnClick();
        }}
        startIcon={<PersonAddIcon />}
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
                <PersonAddIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
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
                      autoComplete="off"
                      value={email}
                      onChange={e => handleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="off"
                      required
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      value={password}
                      onChange={e => handleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      name="password2"
                      label="Confirm Password"
                      type="password"
                      id="password2"
                      autoComplete="off"
                      value={password2}
                      onChange={e => handleChange(e)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                  startIcon={<PersonAddIcon />}
                >
                  Register
                </Button>
                {/* <Grid container justify="flex-end">
                  <Grid item>
                    Already have an account? <Link to="/login" className={classes.link}>Sign in</Link>
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

RegisterModal.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(RegisterModal);
