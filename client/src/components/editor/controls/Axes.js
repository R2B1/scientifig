import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ControlPanel } from "./ControlPanels";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  gridContainer: {
    margin: 0,
    padding: 0,
    width: "100%"
  }
}));

const Axes = ({ figState, updateFigState }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleMenuChange = panel => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function handleXAxisLabelChange(label) {
    updateFigState(draft => {
      draft.layout.xaxis.title.text = label;
    });
  }

  function handleYAxisLabelChange(label) {
    updateFigState(draft => {
      draft.layout.yaxis.title.text = label;
    });
  }

  function handleXMinChange(val) {
    updateFigState(draft => {
      draft.layout.xaxis.range[0] = val;
    });
  }

  function handleXMaxChange(val) {
    updateFigState(draft => {
      draft.layout.xaxis.range[1] = val;
    });
  }

  function handleYMinChange(val) {
    updateFigState(draft => {
      draft.layout.yaxis.range[0] = val;
    });
  }

  function handleYMaxChange(val) {
    updateFigState(draft => {
      draft.layout.yaxis.range[1] = val;
    });
  }

  return (
    <div className={classes.root}>
      <ControlPanel
        label="Labels"
        expanded={expanded}
        onMenuChange={handleMenuChange}
      >
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item xs={12}>
            <TextField
              id="x-axis-label"
              label="X-axis"
              onChange={e => handleXAxisLabelChange(e.target.value)}
              defaultValue={figState.layout.xaxis.title.text}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="y-axis-label"
              label="Y-axis"
              onChange={e => handleYAxisLabelChange(e.target.value)}
              defaultValue={figState.layout.yaxis.title.text}
            />
          </Grid>
        </Grid>
      </ControlPanel>

      <ControlPanel
        label="Ranges"
        expanded={expanded}
        onMenuChange={handleMenuChange}
      >
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item xs={6}>
            <TextField
              defaultValue={figState.layout.xaxis.range[0]}
              id="x-range-min"
              label="X min"
              onChange={e => handleXMinChange(e.target.value)}
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              defaultValue={figState.layout.xaxis.range[1]}
              id="x-range-max"
              label="X max"
              onChange={e => handleXMaxChange(e.target.value)}
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              defaultValue={figState.layout.yaxis.range[0]}
              id="y-range-min"
              label="Y min"
              onChange={e => handleYMinChange(e.target.value)}
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              defaultValue={figState.layout.yaxis.range[1]}
              id="y-range-max"
              label="Y max"
              onChange={e => handleYMaxChange(e.target.value)}
              type="number"
            />
          </Grid>
        </Grid>
      </ControlPanel>

      <ControlPanel
        label="Ticks"
        expanded={expanded}
        onMenuChange={handleMenuChange}
      >
        coming soon!
      </ControlPanel>
    </div>
  );
};

export default Axes;
