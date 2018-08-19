// Install `babel` hook for ES6
require('babel-polyfill');
// Run image require hooks
require('asset-require-hook')({
  // Must use the same option with webpack's configuration
  extensions: ['svg', 'gif', 'jpg', 'jpeg', 'png', 'webp'],
  publicPath: '/assets/',
  limit: 10240,
  name: '[name].[hash:8].[ext]'
});

// Run server
require('./main');

// something to show stack traces of async exceptions
process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});
