var React = require('react');

var WaitingRoom = React.createClass({

  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Please wait</div>
        <div className="panel-body">
          <p>The next available person will be matched with you.</p>
          <p>To chat with yourself, open this page again in another browser window.</p>
        </div>
      </div>
    )
  }

});

module.exports = WaitingRoom;