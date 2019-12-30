import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "../layout/NotFound";
import PrivateRoute from "../routing/PrivateRoute";
import Editor from "../editor/Editor";

const Routes = props => {
  return (
    <Container maxWidth="lg">
      <Alert />
      <Switch>
        <Route exact path="/">
          <Redirect to="/editor/example" />
        </Route>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route
          exact
          path="/editor/new"
          render={props => <Editor {...props} isNew={true} isExample={false} isMine={false} />}
        />
        <Route
          exact
          path="/editor/example"
          render={props => <Editor {...props} isNew={false} isExample={true} isMine={false} />}
        />
        <Route
          exact
          path="/editor/:id"
          render={props => (
            <Editor {...props} isNew={false} isExample={false} isMine={true} />
          )}
        />
        <Route component={NotFound} />
      </Switch>
    </Container>
  );
};

Routes.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Routes);
