var ChatRandomDispatcher = require('../dispatcher/ChatRandomDispatcher');

module.exports = {

  onMessage: function(message) {
    ChatRandomDispatcher.dispatch({
      type: 'RECEIVE_MESSAGE',
      message: message
    })
  },

  onStart: function() {
    ChatRandomDispatcher.dispatch({
      type: 'CHAT_START'
    })
  },

  onWaiting: function() {
    ChatRandomDispatcher.dispatch({
      type: 'WAITING'
    })
  }

};