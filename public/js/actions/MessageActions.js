var ChatRandomDispatcher = require('../dispatcher/ChatRandomDispatcher');
var ChatSocketUtils = require('../utils/ChatSocketUtils');

module.exports = {
  createMessage: function(username, text) {
    var message = {
      text: text,
      username: username
    };
    ChatRandomDispatcher.dispatch({
      type: 'CREATE_MESSAGE',
      message: message
    });
    ChatSocketUtils.send(message);
  }
};