var ChatRandom = require('./components/ChatRandom.react');
var ChatSocketUtils = require('./utils/ChatSocketUtils');
var React = require('react');
window.React = React; // for http://fb.me/react-devtools

React.render(
  <ChatRandom />,
  document.getElementById('react')
);