import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import cookieStorage from 'utils/cookie';
import { connect } from 'react-redux';
import { setPage } from 'redux/actions/app';
import PrivateRoute from 'components/HOC/PrivateRoute';
import {
  Users,
  Surveys,
  PollCreate,
} from 'containers';
import Login from 'containers/Login';
import NotFound from 'containers/NotFound';
import AuthLayout from '../layouts/AuthLayout';
import DefaultLayout from '../layouts/DefaultLayout';
import ConferenceLayout from '../layouts/ConferenceLayout';

import './App.scss';

class App extends Component {
  componentDidMount() {
    const {
      history,
      setPage,
    } = this.props;

    this.unlisten = history.listen((location) => {
      setPage(location);
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const isAuth = cookieStorage().getItem('authToken');
    return (
      <Switch>
        <Route
          path="/login"
          exact
          component={(() => {
            return (
              <AuthLayout
                component={<Login {...this.props} />}
              />
            );
          })}
        />
        <PrivateRoute
          path="/users"
          exact
          isAuth={isAuth}
          component={(
            <DefaultLayout>
              <Users {...this.props} />
            </DefaultLayout>
          )}
        />
        <PrivateRoute
          path="/questions/new"
          exact
          isAuth={isAuth}
          component={(
            <DefaultLayout>
              <PollCreate {...this.props} />
            </DefaultLayout>
          )}
        />
        <PrivateRoute
          path="/surveys"
          exact
          isAuth={isAuth}
          component={(
            <DefaultLayout>
              <Surveys {...this.props} />
            </DefaultLayout>
          )}
        />
        {/* <PrivateRoute
          path="/questions/:page"
          exact
          isAuth={isAuth}
          component={(
            <DefaultLayout>
              <Surveys {...this.props} />
            </DefaultLayout>
          )}
        /> */}
        <PrivateRoute
          path="*"
          exact
          isAuth={isAuth}
          component={(
            <DefaultLayout>
              <NotFound {...this.props} />
            </DefaultLayout>
          )}
        />
      </Switch>
    );
  }
}

App.propsTypes = {
  history: PropTypes.string,
};

App.defaulProps = {
  history: {},
};

export default withRouter(connect((state) => {
  return {

  };
}, {
  setPage,
})(App));

