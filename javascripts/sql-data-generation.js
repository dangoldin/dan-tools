'use strict';

import React from "react";

class TableDetail extends React.Component {
  handleChange() {
    this.props.updateTableName(this.tableNameInput.value)
    this.props.updateCount(this.countInput.value)
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="table name"
          value={this.props.tableName}
          ref={(input) => this.tableNameInput = input}
          onChange={this.handleChange.bind(this)}
          />
        <input
          type="text"
          placeholder="# of rows"
          value={this.props.count}
          ref={(input) => this.countInput = input}
          onChange={this.handleChange.bind(this)}
          />
      </div>
    )
  }
}

class FieldDetail extends React.Component {
  render() {
    return (
      <div>
        <input type="text" placeholder="field name" />
        <select>
          <option>Date</option>
          <option>Int</option>
          <option>Real</option>
          <option>String</option>
        </select>
      </div>
    )
  }
}

class SQLStatements extends React.Component {
  randomDate(start = new Date(now.getTime() - 10000000000), end = new Date()) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  randomInt(min = 1, max = 100) {
    return Math.floor(this.randomReal(min,max));
  }

  randomReal(min = 1, max = 100) {
    return Math.random() * (max - min) + min;
  }

  randomString(len = 10) {
    var all_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    var all_chars_length = all_chars.length;
    var out = '';
    for (var i = 0; i < len; i++) {
      out += all_chars.charAt(Math.floor(Math.random()*all_chars_length));
    }
    return out;
  }

  render() {
    const that = this

    const fields = this.props.fields.map(function(f) {
      return f.name
    })

    const Statements = []
    for (var i = 0; i < this.props.count; i++) {
      // Generate the random vals
      const vals = this.props.fields.map(function(f) {
        switch (f.type) {
          case 'int': return that.randomInt()
          case 'real': return that.randomReal()
          case 'date': return that.randomDate()
          case 'string': return that.randomString()
        }
      }).map(function(val) { // Surround with quotes
        return "'" + val + "'"
      })

      const statement = 'INSERT INTO ' + this.props.tableName + ' (' + fields.join(', ') + ') VALUES (' + vals.join(', ') + ') '
      Statements.push(
        <li key={i}>
          {statement}
        </li>
      )
    }

    return (
      <ul>
        {Statements}
      </ul>
    )
  }
}

class SQLDataGeneration extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tableName: 'table_name',
      fields: [
        {name: 'fieldA', type: 'int'},
        {name: 'fieldB', type: 'real'}
      ],
      count: 10
    }

    this.updateTableName = this.updateTableName.bind(this)
    this.updateCount = this.updateCount.bind(this)
  }

  updateTableName(tableName) {
    this.setState({tableName: tableName})
  }

  updateCount(count) {
    this.setState({count: parseInt(count, 10) || 0})
  }

  render() {
    return (
      <div>
        <div className="left-sidebar">
          <TableDetail
            tableName={this.state.tableName}
            count={this.state.count}
            updateTableName={this.updateTableName}
            updateCount={this.updateCount}
            />
          <FieldDetail />
          <input type="submit" value="Generate" />
        </div>
        <div className="right-sidebar">
          <SQLStatements
            tableName={this.state.tableName}
            fields={this.state.fields}
            count={this.state.count}
            />
        </div>
      </div>
    )
  }
}

export default SQLDataGeneration