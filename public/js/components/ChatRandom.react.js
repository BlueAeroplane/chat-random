var Lobby = require('./Lobby.react');
var Login = require('./Login.react');
var React = require('react');
var UsernameStore = require('../stores/UsernameStore');

function getStateFromStores() {
  return {
    username: UsernameStore.getUsername()
  };
}

var ChatRandom = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    UsernameStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UsernameStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var component;
    var username = this.state.username;
    if (username) {
      component = <Lobby />;
    } else {
      component = <Login />;
    }
    return (
      component
    );
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = ChatRandom;
