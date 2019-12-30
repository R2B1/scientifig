import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TimelineIcon from "@material-ui/icons/Timeline";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  gridList: {
    // width: 500,
    // height: 450
  },
  imgIcon: {
    width: "100%",
    height: "100%"
  },
  figButtons: {
    display: "flex"
  }
}));


const FigGridList = ({ figures, deleteFigure }) => {

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <GridList
        className={classes.gridList}
        cellHeight={180}
        cols={2}
        spacing={8}
      >
        {figures.map(fig => (
          <GridListTile key={fig._id}>
            <TimelineIcon className={classes.imgIcon} color="secondary" />
            <GridListTileBar
              title={fig.name}
              subtitle={
                <Moment format="YYYY/MM/DD">{moment.utc(fig.date)}</Moment>
              }
              actionIcon={
                <div className={classes.figButtons}>
                  <IconButton
                    aria-label="edit"
                    component={Link}
                    to={`/editor/${fig._id}`}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteFigure(fig._id)}
                  >
                    <DeleteIcon color="primary" />
                  </IconButton>
                </div>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </Paper>
  );
}

export default FigGridList;