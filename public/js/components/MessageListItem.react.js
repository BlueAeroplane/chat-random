var React = require('react');

var ReactPropTypes = React.PropTypes;

var MessageListItem = React.createClass({

  propTypes: {
    message: ReactPropTypes.object
  },

  render: function() {
    var message = this.props.message;
    return (
      <div className="message-list-item">
        <strong className="message-author-name">{message.username}</strong>:
        <p className="message-text"> {message.text}</p>
      </div>
    );
  }

});

module.exports = MessageListItem;