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
  handleChange() {
    this.props.updateField(this.props.id, this.nameInput.value, this.typeInput.value)
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="field name"
          value={this.props.name}
          ref={(input) => this.nameInput = input}
          onChange={this.handleChange.bind(this)}
          />
        <select
          value={this.props.type}
          ref={(input) => this.typeInput = input}
          onChange={this.handleChange.bind(this)}
          >
          <option>Date</option>
          <option>Int</option>
          <option>Real</option>
          <option>String</option>
        </select>
        <button
          onClick={() => this.props.deleteField(this.props.id)}>X</button>
      </div>
    )
  }
}

class SQLStatements extends React.Component {
  randomDate(start = new Date((new Date()).getTime() - 10000000000), end = new Date()) {
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
          case 'Int': return that.randomInt()
          case 'Real': return that.randomReal()
          case 'Date': return that.randomDate()
          case 'String': return that.randomString()
        }
      }).map(function(val) { // Surround with quotes
        return "'" + val + "'"
      })

      // Make sure the fields are complete
      if (fields.length > 0 && vals.length > 0 && !fields.some((v) => v === '' )) {
        const statement = 'INSERT INTO ' + this.props.tableName + ' (' + fields.join(', ') + ') VALUES (' + vals.join(', ') + ') '
        Statements.push(
          <li key={i}>
            {statement}
          </li>
        )
      }
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
      fields: [],
      count: 10
    }

    this.updateTableName = this.updateTableName.bind(this)
    this.updateCount = this.updateCount.bind(this)
    this.updateField = this.updateField.bind(this)
    this.deleteField = this.deleteField.bind(this)
    this.newField = this.newField.bind(this)
  }

  updateTableName(tableName) {
    this.setState({tableName: tableName})
  }

  updateCount(count) {
    this.setState({count: parseInt(count, 10) || 0})
  }

  updateField(idx, name, type) {
    var fields = this.state.fields

    fields[idx] = {
      name: name,
      type: type
    }

    this.setState({ fields: fields })
  }

  deleteField(idx) {
    var fields = this.state.fields
    fields.splice(idx, 1)
    this.setState({ fields: fields })
  }

  newField() {
    var fields = this.state.fields
    fields.push({type: '', name: ''})
    this.setState({ fields: fields })
  }

  render() {
    const that = this;

    const FieldDetails = this.state.fields.map(function(f, idx) {
      return <FieldDetail
        name={f.name}
        type={f.type}
        key={idx}
        id={idx}
        updateField={that.updateField}
        deleteField={that.deleteField}/>
    })

    return (
      <div>
        <div className="left-sidebar">
          <TableDetail
            tableName={this.state.tableName}
            count={this.state.count}
            updateTableName={this.updateTableName}
            updateCount={this.updateCount}
            />
          <div>
            {FieldDetails}
          </div>
          <button
          onClick={this.newField}>Add field</button>
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