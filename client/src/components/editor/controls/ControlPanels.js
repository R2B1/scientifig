import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

const EPSummary = withStyles({
  root: {
    height: 42,
    minHeight: 42,
    "&$expanded": {
      height: 42,
      minHeight: 42
    }
  },
  expanded: {}
})(MuiExpansionPanelSummary);

const EPDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    paddingTop: 0
  }
}))(MuiExpansionPanelDetails);

const EPSummaryColored = withStyles(theme => ({
  root: {
    height: 42,
    minHeight: 42,
    "&$expanded": {
      background: theme.palette.primary.mainGradient,
      height: 42,
      minHeight: 42
    }
  },
  expanded: {}
}))(MuiExpansionPanelSummary);

const EPDetailsColored = withStyles(theme => ({
  root: {
    background: theme.palette.primary.mainGradient,
    padding: theme.spacing(1),
    paddingTop: 0
  }
}))(MuiExpansionPanelDetails);

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightBold
  }
}));

const ControlPanel = props => {
  const classes = useStyles();

  return (
    <ExpansionPanel
      expanded={props.expanded === `${props.label}`}
      onChange={props.onMenuChange(`${props.label}`)}
    >
      <EPSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${props.label}-content`}
        id={`${props.label}-header`}
      >
        <Typography className={classes.heading}>{props.label}</Typography>
      </EPSummary>
      <EPDetails>{props.children}</EPDetails>
    </ExpansionPanel>
  );
};

const ControlPanelBright = props => {
  const classes = useStyles();

  return (
    <ExpansionPanel
      expanded={props.expanded === `${props.label}`}
      onChange={props.onMenuChange(`${props.label}`)}
    >
      <EPSummaryColored
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${props.label}-content`}
        id={`${props.label}-header`}
      >
        <Typography className={classes.heading}>{props.label}</Typography>
      </EPSummaryColored>
      <EPDetailsColored>{props.children}</EPDetailsColored>
    </ExpansionPanel>
  );
};

export { ControlPanel, ControlPanelBright };
