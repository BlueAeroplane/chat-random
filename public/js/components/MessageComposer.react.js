var MessageActions = require('../actions/MessageActions');
var UsernameStore = require('../stores/UsernameStore');

var React = require('react');

var ENTER_KEY_CODE = 13;

var MessageComposer = React.createClass({

  getInitialState: function() {
    return {
      text: '',
      username: UsernameStore.getUsername()
    };
  },

  render: function() {
    return (
      <div>
        <input
          className="message-composer form-control"
          name="message"
          value={this.state.text}
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}
          />
      </div>
    );
  },

  _onChange: function(event) {
    this.setState({text: event.target.value});
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      var text = this.state.text.trim();
      if (text) {
        MessageActions.createMessage(this.state.username, text);
      }
      this.setState({text: ''});
    }
  }

});

module.exports = MessageComposer;