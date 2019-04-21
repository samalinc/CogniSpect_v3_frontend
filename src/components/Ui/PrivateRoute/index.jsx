import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component, isAuthenticated, isLoading, ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          isAuthenticated && !isLoading
            ? <Component {...props} /> : <Redirect />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.user,
    isLoading: state.auth.isLoading,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
