'use strict';

import React from "react";

class SQLEntry extends React.Component {
  render() {
    return (
      <div>
        <textarea
          className="small"
          value={this.props.sqlCode}>
        </textarea>
      </div>
    )
  }
}

class SQLSchemaComparison extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      first: '',
      second: ''
    }
  }

  render() {
    return (
      <div>
        <div className="left-sidebar">
          <SQLEntry sqlCode={this.state.first} />
          <SQLEntry sqlCode={this.state.second} />
        </div>
        <div className="right-sidebar">
          OUT
        </div>
      </div>
    )
  }
}

export default SQLSchemaComparison