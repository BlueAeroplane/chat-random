var MessageListItem = require('./MessageListItem.react');
var MessageComposer = require('./MessageComposer.react');
var MessageStore = require('../stores/MessageStore');
var StatusStore = require('../stores/StatusStore');
var crypto = require('crypto');
var React = require('react');

function getStateFromStores() {
  return {
    messages: MessageStore.getAll()
  };
}

function getMessageListItem(message, i) {
  return (
    <MessageListItem
      key={i}
      message={message}
    />
  );
}

var MessageSection = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    this._scrollToBottom();
    MessageStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var messageListItems = this.state.messages.map(function(message, i) {
      return getMessageListItem(message, i);
    });
    return (
      <div className="message-section full-width layout-flex-column">
        <div className="message-list flex" ref="messageList">
          {messageListItems}
        </div>
        <MessageComposer />
      </div>
    )
  },

  componentDidUpdate: function() {
    this._scrollToBottom();
  },

  _scrollToBottom: function() {
    var ul = this.refs.messageList.getDOMNode();
    ul.scrollTop = ul.scrollHeight;
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = MessageSection;