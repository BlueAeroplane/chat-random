var MessageSection = require('./MessageSection.react');
var WaitingRoom = require('./WaitingRoom.react');
var StatusStore = require('../stores/StatusStore');
var React = require('react');

function getStateFromStores() {
  return {
    waiting: StatusStore.isWaiting()
  };
}

var Lobby = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    StatusStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    StatusStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var component;
    if (this.state.waiting) {
      component = <WaitingRoom />;
    } else {
      component = <MessageSection />;
    }
    return (
      component
    )
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = Lobby;