var ChatRandomDispatcher = require('../dispatcher/ChatRandomDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _username;

var UsernameStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getUsername: function() {
    return _username;
  }

});

UsernameStore.dispatchToken = ChatRandomDispatcher.register(function(action) {

  switch(action.type) {
    case 'SET_USERNAME':
      _username = action.username;
      UsernameStore.emitChange();
      break;
    default:
    // nothing
  }

});

module.exports = UsernameStore;