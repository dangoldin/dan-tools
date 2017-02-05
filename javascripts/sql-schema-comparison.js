'use strict';

import React from "react";

class SQLEntry extends React.Component {
  render() {
    return (
      <div>
        <textarea
          name={this.props.name}
          className="small"
          value={this.props.sqlCode}
          onChange={this.props.changeFunction}
          >
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

    this.updateSQL = this.updateSQL.bind(this)
  }

  updateSQL(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <div>
        <div className="left-sidebar">
          <SQLEntry name='first' sqlCode={this.state.first} changeFunction={this.updateSQL}/>
          <SQLEntry name='second' sqlCode={this.state.second} changeFunction={this.updateSQL}/>
        </div>
        <div className="right-sidebar">
          OUT
        </div>
      </div>
    )
  }
}

export default SQLSchemaComparison