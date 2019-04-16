'use strict';

process.env.NODE_PATH = './';
require('module').Module._initPaths();

// Install `babel` hook for ES6
require('babel-register');
require("babel-polyfill");

// Start the server
require('./server.js');
