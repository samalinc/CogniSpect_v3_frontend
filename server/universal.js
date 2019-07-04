require('dotenv').config();

const React = require('react');
const { Provider } = require('react-redux');
const { default: Helmet } = require('react-helmet');
const ReactDOM = require('react-dom/server');

const { StaticRouter, matchPath } = require('react-router-dom');

const { default: store } = require('../src/redux/store');
const { default: App } = require('../src/containers/App');

module.exports = function universalLoader(req, res) {
  let promises = [];
  promises = routes.reduce((acc, route) => {
    if (matchPath(req.url, route) && route.component && route.component.initialAction) {
      acc.push(Promise.resolve(store.dispatch(route.component.initialAction(req.url))));
    }
    return acc;
  }, []);

  Promise.all(promises)
    .then(() => {
      const context = {};
      const markup = ReactDOM.renderToString(
        <Provider store={store}>
          <StaticRouter
            location={req.url}
            context={context}
          >
            <App />
          </StaticRouter>
        </Provider>,
      );

      const helmet = Helmet.renderStatic();

      const html = `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()} lang="en">
        <head>
          <meta charset="utf-8">
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="apple-mobile-web-app-capable" content="yes">
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0">
          <meta property="og:type" content="website">  
          <meta name="referrer" content="always">
          <meta name="theme-color" content="#ffffff">
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffbf02">
          <link rel="shortcut icon" href="/favicon.ico">
          <link rel="manifest" href="/manifest.json">
          <link href="/static/css/styles.css" rel="stylesheet">
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
        </head>
        <body ${helmet.bodyAttributes.toString()}>
          <noscript>
            Please enable javascript for this page
          </noscript>
          <div id="root">
              ${markup}
          </div>
          <script src="/static/js/build.js"></script>
        </body>
    </html>
`;

      if (context.url) {
        res.redirect(301, context.url);
      } else {
        res.send(html);
      }
    }).catch((err) => { return console.log(err); });
};
