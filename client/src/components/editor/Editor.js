import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useImmer } from "use-immer";
import { setAutoFreeze } from "immer";
import { connect } from "react-redux";
import Plotly from "plotly.js";
import Plot from "react-plotly.js";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import SaveIcon from '@material-ui/icons/Save';
import GetAppIcon from '@material-ui/icons/GetApp';
import { ControlPanelBright } from "./controls/ControlPanels";
import { StaticBannerAlert } from "../layout/Alert";
import LoginModal from "../auth/LoginModal";
import { defaultFigure } from "./defaultFigure";
import Axes from "./controls/Axes";
import Data from "./controls/Data";
import Layout from "./controls/Layout";
import {
  createFigure,
  updateFigure,
  getFigure,
  getPublicFigure,
  clearFigures,
  stopLoading
} from "../../actions/figure";
const uuidv4 = require("uuid/v4");

const useStyles = makeStyles(theme => ({
  gridContainer: {
    margin: 0,
    padding: 0,
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(2)
  },
  gridContainerButtons: {
    flexGrow: 1,
    margin: 0,
    padding: 0,
    width: "100%"
  },
  gridItemPlot: {
    padding: 0,
    order: 1,
    [theme.breakpoints.up("md")]: {
      order: 2
    }
  },
  gridItemControls: {
    order: 2,
    [theme.breakpoints.up("md")]: {
      order: 1
    }
  },
  paper: {
    padding: 0,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textAlign: "center"
  },
  card: {
    marginTop: theme.spacing(2),
    width: "100%",
    padding: theme.spacing(1)
  },
  button: {
    margin: 0,
    width: "100%"
  },
  progress: {
    padding: "64px 0",
    textAlign: "center"
  },
  link: {
    color: "white",
    fontWeight: "bold",
    textDecoration: "underline"
  },
  alertP: {
    fontSize: "1rem",
    margin: theme.spacing(1.5)
  },
}));

const Editor = ({
  auth: { isAuthenticated },
  createFigure,
  updateFigure,
  getFigure,
  getPublicFigure,
  clearFigures,
  stopLoading,
  figure: { figure, loading },
  isNew,
  isExample,
  isMine,
  match,
}) => {

  useEffect(() => {
    clearFigures();
    setStateUpdated(false);
    setControlsKey(uuidv4());  // re-render controls to reset default form values
    if (isNew) {
      updateFigState(draft => {
        draft.data = defaultFigure.data;
        draft.layout = defaultFigure.layout;
        draft.frames = defaultFigure.frames;
        draft.config = defaultFigure.config;
        draft.revision = defaultFigure.revision;
      });
      setStateUpdated(true);
      stopLoading();
    } else if (isExample) {
      getPublicFigure("5e145c0bc13a2d3ce1568fad");
    } else if (isMine) {
      getFigure(match.params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew, isExample, isMine]);

  const classes = useStyles();
  // Need to disable state freezing by immer because plotly unfortunately
  // cleans/mutates the state during plotting...
  setAutoFreeze(false);
  // useImmer to easily handle updates of deeply nested figState object
  const [figState, updateFigState] = useImmer(defaultFigure);
  const [stateUpdated, setStateUpdated] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [toDashboard, setToDashboard] = useState(false);
  const [controlsKey, setControlsKey] = useState(uuidv4());

  // Load figure after it is downloaded from the database
  if (!isNew && !loading && !stateUpdated && figure !== null) {
    const loadedFigState = JSON.parse(figure.figureJSON);
    updateFigState(draft => {
      // It seems we can copy by reference to the draft and immer updates
      // nested objects properly in the final state
      draft.name = loadedFigState.name;
      draft.data = loadedFigState.data;
      draft.layout = loadedFigState.layout;
      draft.frames = loadedFigState.frames;
      draft.config = loadedFigState.config;
      draft.revision = loadedFigState.revision;
    });
    setStateUpdated(true);
  }

  const handleMenuChange = panel => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function handleNameChange(name) {
    updateFigState(draft => {
      draft.name = name;
    });
  }

  const handleSave = () => {
    updateFigure(match.params.id, figState);
  };

  const handleSaveAs = () => {
    createFigure(figState);
    setToDashboard(true);
  };

  const handleDownloadSVG = () => {
    const plotDiv = document.querySelector(".js-plotly-plot");
    Plotly.downloadImage(plotDiv, {
      format: "svg",
      width: figState.layout.width,
      height: figState.layout.height,
      filename: "plot-save-test-svg"
    });
  };

  if (toDashboard) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      {isExample ? (
        <StaticBannerAlert
          role="alertdialog"
          type="info"
          msg={
            <div>
              <p className={classes.alertP}>
                {"Welcome to Scientifig, a simple app for creating static figures for publications, reports, presentations, etc."}
              </p>
              <p className={classes.alertP}>
                {"Feel free to edit this example figure or"}{" "}
                <Link to="/editor/new" className={classes.link}>
                  {"create a new figure"}
                </Link>{" "}
                {"from scratch. When you're finished, download a high-quality vector (SVG) image for free or save your figure for future editing."}
              </p>
              <p className={classes.alertP}>{"Happy plotting!"}</p>
            </div>
          }
        />
      ) : <div></div>}

      {loading ? (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      ) : (
          <Grid container spacing={2} className={classes.gridContainer}>
            <Grid key={controlsKey} item xs={12} md={4} className={classes.gridItemControls}>
              <ControlPanelBright
                label="Data"
                expanded={expanded}
                onMenuChange={handleMenuChange}
              >
                <Data figState={figState} updateFigState={updateFigState} />
              </ControlPanelBright>

              <ControlPanelBright
                label="Axes"
                expanded={expanded}
                onMenuChange={handleMenuChange}
              >
                <Axes figState={figState} updateFigState={updateFigState} />
              </ControlPanelBright>

              <ControlPanelBright
                label="Layout"
                expanded={expanded}
                onMenuChange={handleMenuChange}
              >
                <Layout figState={figState} updateFigState={updateFigState} />
              </ControlPanelBright>

              <Card className={classes.card}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justify='space-between'
                  className={classes.gridContainerButtons}
                >
                  <Grid item xs={12}>
                    <TextField
                      id="figure-name"
                      label="Figure Name"
                      defaultValue={figState.name}
                      onChange={e => handleNameChange(e.target.value)}
                    />
                  </Grid>

                  {isAuthenticated && isMine && (
                    <Grid item xs={4}>
                      <Button
                        className={classes.button}
                        onClick={handleSave}
                        startIcon={<SaveIcon />}
                        variant="contained"
                      >
                        Save
                      </Button>
                    </Grid>
                  )}

                  {isAuthenticated && (
                    <Grid item xs={isMine ? 4 : 6}>
                      <Button
                        className={classes.button}
                        onClick={handleSaveAs}
                        startIcon={<SaveIcon />}
                        variant="contained"
                      >
                        {isMine ? 'Clone' : 'Save'}
                      </Button>
                    </Grid>
                  )}

                  {!isAuthenticated && (
                    <Grid item xs={6}>
                      <LoginModal buttonLabel="Save" buttonClasses={classes.button} />
                    </Grid>
                  )}

                  <Grid item xs={isMine ? 4 : 6}>
                    <Button
                      className={classes.button}
                      onClick={handleDownloadSVG}
                      startIcon={<GetAppIcon />}
                      variant="contained"
                    >
                      SVG
                    </Button>
                  </Grid>

                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} md={8} className={classes.gridItemPlot}>
              <Paper className={classes.paper}>
                <Plot
                  data={figState.data}
                  layout={figState.layout}
                  config={figState.config}
                  revision={figState.revision}
                />
              </Paper>
            </Grid>
          </Grid>
        )}
    </>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  figure: state.figure
});

export default connect(mapStateToProps, {
  createFigure,
  updateFigure,
  getFigure,
  getPublicFigure,
  clearFigures,
  stopLoading
})(Editor);
