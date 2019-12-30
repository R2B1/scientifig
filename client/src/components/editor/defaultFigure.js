export const defaultFigure = {
  name: "New Figure",
  data: [],
  layout: {
    uirevision: true,
    title: {
      text: "",
      xref: "paper",
      yref: "container",
      x: 0.5,
      y: 0.95
    },
    margin: { l: 80, r: 40, t: 40, b: 60, pad: 0 },
    autosize: false,
    height: 360,
    width: 520,
    xaxis: {
      linecolor: "black",
      linewidth: 1,
      mirror: "ticks",
      range: [0, 1],
      showgrid: false,
      ticks: "inside",
      title: {
        standoff: 10,
        text: "x-axis label",
        font: {
          size: 16
        }
      }
    },
    yaxis: {
      linecolor: "black",
      linewidth: 1,
      mirror: "ticks",
      range: [0, 1],
      showgrid: false,
      ticks: "inside",
      title: {
        standoff: 4,
        text: "y-axis label",
        font: {
          size: 16
        }
      }
    },
    legend: {
      xanchor: "right",
      yanchor: "top",
      x: 0.98,
      y: 0.98,
    }
  },
  config: {
    staticPlot: true
    // autosizeable: true,
    // responsive: true
  },
  frames: [],
  revision: 0
  // style: { width: "100%", height: "100%" },
  // useResizeHandler: true
};

export const defaultTrace = {
  error_x: { visible: false },
  error_y: { visible: false },
  fill: "none",
  hoverinfo: "all",
  hoverlabel: {
    align: "auto",
    font: {
      family: "Arial, sans-serif",
      size: 14
    },
    namelength: 16
  },
  hoveron: "points",
  line: {
    color: "rgb(0,0,0)",
    dash: "solid",
    simplify: false,
    shape: "linear",
    width: 2
  },
  marker: {
    color: "rgb(0,0,0)",
    line: {
      color: "rgb(0,0,0)",
      width: 0
    },
    gradient: { type: "none" },
    maxdisplayed: 0,
    opacity: 1,
    size: 3,
    symbol: "circle"
  },
  mode: "lines",
  name: "",
  opacity: 1,
  showlegend: true,
  type: "scatter",
  visible: true,
  x: [],
  xaxis: "x",
  y: [],
  yaxis: "y"
};
