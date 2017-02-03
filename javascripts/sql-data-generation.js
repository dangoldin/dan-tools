'use strict';

import React from "react";

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

class TableDetail extends React.Component {
  render() {
    return (
      <div>
        <input type="text" placeholder="table name" />
        <input type="text" placeholder="# of rows" />
      </div>
    )
  }
}

class SQLStatements extends React.Component {
  render() {
    return (
      <div></div>
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
  }

  render() {
    return (
      <div>
        <div className="left-sidebar">
          <TableDetail />
          <FieldDetail />
          <input type="submit" value="Generate" />
        </div>
        <div className="right-sidebar">
          <SQLStatements
            tableName={this.state.tableName}
            fields={this.state.fields}
            count={this.count}
            />
        </div>
      </div>
    )
  }
}

export default SQLDataGeneration