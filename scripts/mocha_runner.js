/* globals document */

require('@babel/register');
require('@babel/polyfill');

// Add jsdom support, which is required for enzyme.
var jsdom = require('jsdom');

var exposedProperties = [ 'window', 'navigator', 'document' ];

global.document = (new jsdom.JSDOM('', {
  url: "http://localhost"})).window.document;
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

process.on('unhandledRejection', function (error) {
  console.error('Unhandled Promise Rejection:');
  console.error(error && error.stack || error);
});
