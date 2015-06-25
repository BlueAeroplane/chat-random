var ChatRandomDispatcher = require('../dispatcher/ChatRandomDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _waiting = true;

var StatusStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isWaiting: function() {
    return _waiting;
  }

});

StatusStore.dispatchToken = ChatRandomDispatcher.register(function(action) {

  switch(action.type) {
    case 'WAITING':
      _waiting = true;
      StatusStore.emitChange();
      break;
    case 'CHAT_START':
      _waiting = false;
      StatusStore.emitChange();
      break;
    default:
    // nothing
  }

});

module.exports = StatusStore;