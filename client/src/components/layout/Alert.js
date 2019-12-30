import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { amber, green, red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
    color: "white"
  },
  error: {
    backgroundColor: red[500],
    color: "white"
  },
  info: {
    background: theme.palette.secondary.mainGradient,
    color: "white"
  },
  warning: {
    backgroundColor: amber[700],
    color: "white"
  },
  icon: {
    fontSize: 24
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  messageBanner: {
    width: "92%"
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

const Alert = ({ alerts }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (e, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <>
      {
        alerts !== null && alerts.length > 0 && alerts.map(alert => {
          const Icon = variantIcon[alert.type];
          return (
            <Snackbar
              key={alert.id}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={open}
              // autoHideDuration={3000}
              onClose={handleClose}
            >
              <SnackbarContent
                className={clsx(classes[alert.type], classes.margin)}
                aria-describedby="client-snackbar"
                message={
                  <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {alert.msg}
                  </span>
                }
                action={[
                  <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                  >
                    <CloseIcon className={classes.icon} />
                  </IconButton>
                ]}
              />
            </Snackbar>
          );
        })
      }
    </>
  );
};

// This alert renders in the document flow and remains until user closes
const StaticBannerAlert = props => {
  const classes = useStyles();
  const Icon = variantIcon[props.type];

  const handleClose = () => {
    const el = document.getElementById("vismask");
    el.style.display = "none";
  };

  return (
    <div id="vismask">
      <SnackbarContent
        className={clsx(classes[props.type], classes.margin)}
        classes={{ message: classes.messageBanner }}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {props.msg}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
      />
    </div>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);

export { StaticBannerAlert };
