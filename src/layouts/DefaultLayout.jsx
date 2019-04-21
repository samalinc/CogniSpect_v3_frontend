import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import {
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
import { ToastContainer } from 'react-toastify';
import { Container } from 'reactstrap';
import {
  Header,
  Modals,
} from 'components';
import { mainNavigation } from 'utils/menu';
import { ITEM_PER_PAGE } from 'utils/constants';

class DefaultLayout extends Component {
  componentDidMount() {
   
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Header isAsideShow={false} />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={mainNavigation} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <Container>
              {this.props.children}
            </Container>
            <Modals />
          </main>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          style={{
            zIndex: 1999,
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.app.location,
    // user: state.auth.user,
  };
};

export default connect(
  mapStateToProps, {
  },
)(withRouter(DefaultLayout));
