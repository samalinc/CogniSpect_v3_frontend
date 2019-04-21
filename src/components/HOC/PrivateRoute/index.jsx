import React, { Fragment } from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

import { connect } from 'react-redux';

const PrivateRoute = ({
  component, user, isAuth, ...rest
}) => {
  return (
    <Route
      {...rest}
      render={() => {
        return (
          isAuth
            // ? user.role === 'moderator'
            //   ? (
            //     <Fragment>
            //       <Redirect to={{
            //         pathname: `/${user.meetingId}/questions-answers`,
            //         search: `?next=${rest.location.pathname}`,
            //       }}
            //       />
            //       {component}
            //     </Fragment>
            //   )
            ? component
            : (
              <Redirect to={{
                pathname: '/login',
                search: `?next=${rest.location.pathname}`,
              }}
              />
            )
        );
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(PrivateRoute);

