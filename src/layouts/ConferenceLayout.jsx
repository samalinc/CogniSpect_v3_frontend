import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router';
import {
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
  AppAside,
} from '@coreui/react';

import className from 'classnames';

import { ToastContainer } from 'react-toastify';
import {
  Header,
  Modals,
} from 'components';

import { navigation } from 'utils/menu';

import { ITEM_PER_PAGE } from 'utils/constants';

class ConferenceLayout extends Component {
  componentDidMount() {

  }

  render() {
    const {
    } = this.props;

    return (
      <div className="app">
        <AppHeader fixed>
          <Header
            isAsideShow
            selection
          />
        </AppHeader>
        <div className="app-body">
              <AppSidebar fixed display="lg">
                <AppSidebarHeader />
                <AppSidebarForm />
                <AppSidebarNav navConfig={nav} />
                <AppSidebarFooter />
                <AppSidebarMinimizer />
              </AppSidebar>
          <main className={className({
            main: true,
          })}
          >
            {this.props.children}
            <Modals />
          </main>
          <AppAside fixed>
          </AppAside>
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
   
  };
};

export default connect(
  mapStateToProps, {
   
  },
)(withRouter(ConferenceLayout));
