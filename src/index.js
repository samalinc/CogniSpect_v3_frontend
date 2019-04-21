import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { REQUEST_AUTH } from 'redux/actions/actionTypes';
import store from './redux/store';
import App from './containers/App';
import { register } from './registerServiceWorker';



ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

if (process.env.NODE_ENV === 'production') {
  register();
}

