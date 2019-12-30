import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ControlPanel } from "./ControlPanels";
import Trace from "./Trace";
import { defaultTrace } from "../defaultFigure";
const uuidv4 = require("uuid/v4");

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  addTraceButton: {
    marginTop: theme.spacing(1),
    background: "white",
    color: theme.palette.primary.main
  }
}));

const Data = ({ figState, updateFigState }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleMenuChange = panel => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleAddTrace = () => {
    // Quick and dirty deep clone with serialize/deserialize
    let newTrace = JSON.parse(JSON.stringify(defaultTrace));
    newTrace._id = uuidv4();
    updateFigState(draft => {
      draft.data.push(newTrace);
    });
  };

  return (
    <div className={classes.root}>
      {figState.data.map((trace, index) => (
        <ControlPanel
          key={trace._id}
          label={`Trace ${index}`}
          expanded={expanded}
          onMenuChange={handleMenuChange}
        >
          <Trace
            index={index}
            figState={figState}
            updateFigState={updateFigState}
          />
        </ControlPanel>
      ))}
      <div>
        <Button
          onClick={handleAddTrace}
          variant="contained"
          className={classes.addTraceButton}
        >
          Add new trace
        </Button>
      </div>
    </div>
  );
};

export default Data;
