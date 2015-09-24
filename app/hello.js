import React from "react";
import Desc from "./description"

export default React.createClass({
  render: function() {
    return (
      <div className="hello">
        Hello, {this.props.name}!
        <Desc/>
      </div>
    );
  },
});