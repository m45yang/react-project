import React from "react";

export default React.createClass({
  render: function() {
    return (
      <div className="hello">
        Hello, {this.props.name}!
      </div>
    );
  },
});