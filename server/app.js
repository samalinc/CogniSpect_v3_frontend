require('dotenv').config();
require('ignore-styles');

const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
  // Babel plugin for dynamic import for code splitting
    '@babel/plugin-syntax-dynamic-import',
    'dynamic-import-node',
  ],
});

// routes
const universalLoader = require('./universal');

const app = express();

app.use(cors());

app.use(compression());
app.use(express.static('build'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('^/$', universalLoader);
app.use(morgan('combined'));

app.use('/', universalLoader);

module.exports = app;
