import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ControlPanel } from "./ControlPanels";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  gridContainer: {
    margin: 0,
    padding: 0,
    width: "100%"
  },
  subheading: {
    fontWeight: theme.typography.fontWeightBold
  }
}));

const Layout = ({ figState, updateFigState }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleMenuChange = panel => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const toggleShowLegend = () => {
    updateFigState(draft => {
      draft.layout.showlegend = !figState.layout.showlegend;
    });
  }

  function handleTitleChange(val) {
    updateFigState(draft => {
      draft.layout.title.text = val;
    });
  }

  function handleTitleFontSizeChange(val) {
    updateFigState(draft => {
      draft.layout.title.font.size = val;
    });
  }

  function handleWidthChange(val) {
    updateFigState(draft => {
      draft.layout.width = val;
    });
  }

  function handleHeightChange(val) {
    updateFigState(draft => {
      draft.layout.height = val;
    });
  }

  function handleMarginChange(val, pos) {
    updateFigState(draft => {
      switch (pos) {
        case 'L':
          draft.layout.margin.l = val;
          break;
        case 'R':
          draft.layout.margin.r = val;
          break;
        case 'T':
          draft.layout.margin.t = val;
          break;
        case 'B':
          draft.layout.margin.b = val;
          break;
        default:
      }
    });
  }

  return (
    <div className={classes.root}>

      <ControlPanel
        label="Size"
        expanded={expanded}
        onMenuChange={handleMenuChange}
      >
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item xs={6}>
            <TextField
              defaultValue={figState.layout.width}
              id="figure-width"
              label="Width"
              onChange={e => handleWidthChange(e.target.value)}
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              defaultValue={figState.layout.height}
              id="figure-height"
              label="Height"
              onChange={e => handleHeightChange(e.target.value)}
              type="number"
            />
          </Grid>
        </Grid>
      </ControlPanel>

      <ControlPanel
        label="Title"
        expanded={expanded}
        onMenuChange={handleMenuChange}
      >
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item xs={12}>
            <TextField
              id="figure-title-text"
              label="Text"
              onChange={e => handleTitleChange(e.target.value)}
              defaultValue={figState.layout.title.text}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="figure-title-font-size"
              label="Font size"
              onChange={e => handleTitleFontSizeChange(e.target.value)}
              defaultValue={figState.layout.title.font.size}
              type="number"
            />
          </Grid>
        </Grid>
      </ControlPanel>

      <ControlPanel
        label="Legend"
        expanded={expanded}
        onMenuChange={handleMenuChange}
      >
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item xs={12}>
            <Switch
              checked={figState.layout.showlegend}
              onChange={toggleShowLegend}
              color="primary"
            />
            Show Legend
          </Grid>
        </Grid>
      </ControlPanel>

      <ControlPanel
        label="Margins"
        expanded={expanded}
        onMenuChange={handleMenuChange}
      >
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item xs={6}>
            <TextField
              defaultValue={figState.layout.margin.l}
              id="margin-left"
              label="Left"
              onChange={e => handleMarginChange(e.target.value, "L")}
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              defaultValue={figState.layout.margin.r}
              id="margin-right"
              label="Right"
              onChange={e => handleMarginChange(e.target.value, "R")}
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              defaultValue={figState.layout.margin.t}
              id="margin-top"
              label="Top"
              onChange={e => handleMarginChange(e.target.value, "T")}
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              defaultValue={figState.layout.margin.b}
              id="margin-bottom"
              label="Bottom"
              onChange={e => handleMarginChange(e.target.value, "B")}
              type="number"
            />
          </Grid>
        </Grid>
      </ControlPanel>
    </div>
  );
};

export default Layout;
