import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'reactstrap';

const AuthLayout = ({ props, component: Component, ...rest }) => {
  return (
    <div className="app">
      <div className="app-body">
        <main className="main">
          <Container fluid>
            {Component}
          </Container>
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
};

const mapStateToProps = (state) => {
  return {
    location: state.app.location,
  };
};

export default connect(
  mapStateToProps, {
  },
)(AuthLayout);
