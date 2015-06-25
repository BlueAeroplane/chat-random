var ChatRandomDispatcher = require('../dispatcher/ChatRandomDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _messages = [];

function _addMessage(message) {
  _messages.push(message);
}

var MessageStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAll: function() {
    return _messages;
  }

});

MessageStore.dispatchToken = ChatRandomDispatcher.register(function(action) {

  switch(action.type) {
    case 'CREATE_MESSAGE':
      _addMessage(action.message);
      MessageStore.emitChange();
      break;
    case 'RECEIVE_MESSAGE':
      _addMessage(action.message);
      MessageStore.emitChange();
      break;
    default:
      // nothing
  }

});

module.exports = MessageStore;