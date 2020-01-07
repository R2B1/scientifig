import React, { useState, useEffect } from "react";
import { SketchPicker } from 'react-color';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FileUpload from "./FileUpload";

const useStyles = makeStyles(theme => ({
  gridContainer: {
    margin: 0,
    padding: 0,
    width: "100%"
  },
  formControl: {
    margin: 0,
    width: "100%"
  },
  lineColor: {
    height: "24px",
    width: "48px",
    borderRadius: '2px',
    background: props => props.lineColor,
  },
  markerColor: {
    height: "24px",
    width: "48px",
    borderRadius: '2px',
    background: props => props.markerColor,
  },
  swatch: {
    padding: '4px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer',
  },
  popover: {
    position: 'absolute',
    zIndex: '2',
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  }
}));

const Trace = ({ index, figState, updateFigState }) => {

  useEffect(() => {
    handleModeChange(figState.data[index].mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [linesMode, setLinesMode] = useState(true);
  const [markersMode, setMarkersMode] = useState(false);
  const [showLineColorPicker, setShowLineColorPicker] = useState(false);
  const [showMarkerColorPicker, setShowMarkerColorPicker] = useState(false);

  const classes = useStyles({
    lineColor: figState.data[index].line.color,
    markerColor: figState.data[index].marker.color
  });

  const handleAddData = (trace, index, ranges) => {
    updateFigState(draft => {
      draft.data[index].x = trace.x;
      draft.data[index].y = trace.y;
      draft.layout.xaxis.range[0] = ranges[0];
      draft.layout.xaxis.range[1] = ranges[1];
      draft.layout.yaxis.range[0] = ranges[2];
      draft.layout.yaxis.range[1] = ranges[3];
    });
  };

  function handleNameChange(name) {
    updateFigState(draft => {
      draft.data[index].name = name;
    });
  }

  function handleModeChange(mode) {
    if (figState.data[index].mode !== mode) {
      updateFigState(draft => {
        draft.data[index].mode = mode;
      });
    }
    if (mode === "lines") {
      setLinesMode(true);
      setMarkersMode(false);
    } else if (mode === "markers") {
      setLinesMode(false);
      setMarkersMode(true);
    } else if (mode === "lines+markers") {
      setLinesMode(true);
      setMarkersMode(true);
    }
  }

  function handleLineDashChange(dash) {
    updateFigState(draft => {
      draft.data[index].line.dash = dash;
    });
  }

  function handleLineWidthChange(width) {
    updateFigState(draft => {
      draft.data[index].line.width = width;
    });
  }

  function handleMarkerSizeChange(size) {
    updateFigState(draft => {
      draft.data[index].marker.size = size;
    });
  }

  const handleLineColorChange = (color) => {
    updateFigState(draft => {
      draft.data[index].line.color = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
    });
  };

  const handleMarkerColorChange = (color) => {
    updateFigState(draft => {
      draft.data[index].marker.color = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
    });
  };

  function getRGB(str) {
    let vals = str.substring(str.indexOf('(') + 1, str.length - 1).split(', ');
    return {
      'r': Number(vals[0]),
      'g': Number(vals[1]),
      'b': Number(vals[2]),
      'a': 1
    };
  }

  return (
    <Grid container spacing={2} className={classes.gridContainer}>
      <Grid item xs={12}>
        <FileUpload index={index} onDataUpdate={handleAddData} />
      </Grid>

      <Grid item xs={12}>
        <TextField
          defaultValue={figState.data[index].name}
          id={`trace-${index}-name`}
          label="Name"
          onChange={e => handleNameChange(e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id={`trace-${index}-mode-label`}>Mode</InputLabel>
          <Select
            labelId={`trace-${index}-mode-label`}
            id={`trace-${index}-mode`}
            value={figState.data[index].mode}
            onChange={e => handleModeChange(e.target.value)}
          >
            <MenuItem value="lines">line</MenuItem>
            <MenuItem value="markers">points</MenuItem>
            <MenuItem value="lines+markers">line with points</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {linesMode && (
        <>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id={`trace-${index}-line-type-label`}>
                Line type
              </InputLabel>
              <Select
                labelId={`trace-${index}-line-type-label`}
                id={`trace-${index}-line-type`}
                value={figState.data[index].line.dash}
                onChange={e => handleLineDashChange(e.target.value)}
              >
                <MenuItem value="solid">solid</MenuItem>
                <MenuItem value="dot">dot</MenuItem>
                <MenuItem value="dash">dash</MenuItem>
                <MenuItem value="longdash">long dash</MenuItem>
                <MenuItem value="dashdot">dash - dot</MenuItem>
                <MenuItem value="longdashdot">long dash - dot</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              defaultValue={figState.data[index].line.width}
              id={`trace-${index}-line-width`}
              label="Line width"
              onChange={e => handleLineWidthChange(e.target.value)}
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <div
              className={classes.swatch}
              onClick={() => setShowLineColorPicker(!showLineColorPicker)}
            >
              <div className={classes.lineColor} />
            </div>
            {showLineColorPicker ? <div className={classes.popover}>
              <div
                className={classes.cover}
                onClick={() => setShowLineColorPicker(false)}
              />
              <SketchPicker
                color={getRGB(figState.data[index].line.color)}
                onChange={handleLineColorChange}
              />
            </div> : null}
          </Grid>
        </>
      )}
      {markersMode && (
        <>
          <Grid item xs={12}>
            <TextField
              defaultValue={figState.data[index].marker.size}
              id={`trace-${index}-marker-size`}
              label="Point size"
              onChange={e => handleMarkerSizeChange(e.target.value)}
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <div
              className={classes.swatch}
              onClick={() => setShowMarkerColorPicker(!showMarkerColorPicker)}
            >
              <div className={classes.markerColor} />
            </div>
            {showMarkerColorPicker ? <div className={classes.popover}>
              <div
                className={classes.cover}
                onClick={() => setShowMarkerColorPicker(false)}
              />
              <SketchPicker
                color={getRGB(figState.data[index].marker.color)}
                onChange={handleMarkerColorChange}
              />
            </div> : null}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Trace;
