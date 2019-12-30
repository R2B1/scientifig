import React from "react";
import Papa from "papaparse";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: "none"
  }
}));

const FileUpload = ({ index, onDataUpdate }) => {
  let fileInput = React.createRef();
  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();
    const file = fileInput.current.files[0];
    if (file) {
      // Parse local CSV file and find new ranges
      Papa.parse(file, {
        complete: results => {
          let i;
          let x = [];
          let y = [];
          let xval, yval;
          let xmin = Number(results.data[0][0]);
          let xmax = Number(results.data[0][0]);
          let ymin = Number(results.data[0][1]);
          let ymax = Number(results.data[0][1]);
          for (i = 0; i < results.data.length - 1; i++) {
            xval = Number(results.data[i][0]);
            yval = Number(results.data[i][1]);
            if (xval < xmin) xmin = xval;
            if (xval > xmax) xmax = xval;
            if (yval < ymin) ymin = yval;
            if (yval > ymax) ymax = yval;
            x.push(xval);
            y.push(yval);
          }
          const ranges = [xmin, xmax, ymin, ymax];
          onDataUpdate({ x, y }, index, ranges);
        }
      });
    } else {
      console.log("no file selected");
    }
  };

  return (
    <div className={classes.root}>
      <input
        accept=".csv,.txt"
        className={classes.input}
        id={`trace-${index}-file-input`}
        type="file"
        ref={fileInput}
      />
      <label htmlFor={`trace-${index}-file-input`}>
        <Button variant="outlined" color="primary" component="span">
          Choose CSV file
        </Button>
      </label>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        startIcon={<CloudUploadIcon />}
      >
        Upload
      </Button>
    </div>
  );
};

export default FileUpload;
