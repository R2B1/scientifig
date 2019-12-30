import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import pink from "@material-ui/core/colors/pink";
import Navbar from "./components/layout/Navbar";
import Routes from "./components/routing/Routes";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "rgba(236,64,122,1)",
      mainGradient: "linear-gradient(90deg, rgba(236,64,122,1) 10%, rgba(255,150,124,1) 90%)"
    },
    secondary: {
      main: "rgba(63,81,181,1)",
      mainGradient: "linear-gradient(90deg, rgba(63,81,181,1) 10%, rgba(33,150,243,1) 90%)"
    },
    background: {
      default: "#212121",
      paper: "#303030"
    }
  },
  props: {
    MuiButton: {
      color: "primary",
      size: "small",
    },
    MuiTextField: {
      fullWidth: true,
      margin: "none"
    }
  },
  overrides: {
    MuiButton: {
      root: {
        margin: "0 8px",
      },
      containedPrimary: {
        backgroundColor: pink[400],
        color: "white",
      },
      textPrimary: {
        color: "white",
      }
    },
  }
});

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Switch>
            <Route component={Routes} />
          </Switch>
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;
