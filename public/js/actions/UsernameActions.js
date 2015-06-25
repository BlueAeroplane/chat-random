var ChatRandomDispatcher = require('../dispatcher/ChatRandomDispatcher');

module.exports = {
  setUsername: function(username) {
    ChatRandomDispatcher.dispatch({
      type: 'SET_USERNAME',
      username: username
    });
  }
};