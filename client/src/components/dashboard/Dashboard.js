import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from "@material-ui/core/CircularProgress";
import { getFigures, clearFigures, deleteFigure } from "../../actions/figure";
import FigGridList from "./FigGridList";

const useStyles = makeStyles(theme => ({
  linkButton: {
    margin: theme.spacing(1)
  }
}));

const Dashboard = ({
  getFigures,
  clearFigures,
  deleteFigure,
  figure: { figures, loading }
}) => {
  useEffect(() => {
    clearFigures();
    getFigures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getFigures]);

  const classes = useStyles();

  return loading ? (
    <CircularProgress />
  ) : (
      <>
        <Button
          className={classes.linkButton}
          color="primary"
          component={Link}
          to="/editor/new"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Create New Figure
      </Button>
        {figures.length > 0 && (
          <>
            <FigGridList figures={figures} deleteFigure={deleteFigure} />
          </>
        )}
      </>
    );
};

const mapStateToProps = state => ({
  figure: state.figure
});

export default connect(mapStateToProps, {
  getFigures,
  clearFigures,
  deleteFigure
})(Dashboard);
