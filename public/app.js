var socket;
var username;

/*
* UI Elements
* */
var loginPage = document.querySelector('#login-page');
var chatPage = document.querySelector('#chat-page');
var waitingPage = document.querySelector('#waiting-page');
var inputUsername = document.querySelector('#username');
var submitUsername = document.querySelector('#submit-username');
var submitButton = document.querySelector('#submit-message');
var inputMessage = document.querySelector('#input');
var messageBox = document.querySelector('#message-box');


/*
* Event Listeners
* */
submitUsername.addEventListener('click', function() {
  username = inputUsername.value;
  loginPage.style.display = 'none';
  connect();
});
submitButton.addEventListener('click', function() {
  sendMessage();
});
window.addEventListener('keydown', function(e) {
  if (!(event.ctrlKey || event.metaKey || event.altKey)) {
    inputMessage.focus();
  }
  if (event.keyCode === 13) {
    sendMessage();
  }
});

/*
* Submit a message
* */
function sendMessage() {
  var message = {
    text: inputMessage.value,
    username: username
  };
  addMessage(message);
  socket.emit('message', message);
  inputMessage.value = '';
}

/*
* Display a message
* */
function addMessage(message) {
  messageBox.innerHTML += message.username + ': ' + message.text + '<br/>';
  messageBox.scrollTop = messageBox.scrollHeight;
}

/*
* Start the socket
* */
function connect() {
  socket = io();

  socket.on('waiting', function(){
    console.log('waiting');
    waitingPage.style.display = 'block';
    loginPage.style.display = 'none';
    chatPage.style.display = 'none';
  });

  socket.on('start', function(){
    console.log('chat started');
    loginPage.style.display = 'none';
    waitingPage.style.display = 'none';
    chatPage.style.display = 'block';
  });

  socket.on('message', function(message){
    console.log('message', message);
    addMessage(message);
  });
}




