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

class SQLDataGeneration extends React.Component {
  render() {
    return (
      <div>
        <div className="left-sidebar">
          <TableDetail />
          <FieldDetail />
          <input type="submit" value="Generate" />
        </div>
        <div className="right-sidebar">
          Output
        </div>
      </div>
    )
  }
}

export default SQLDataGeneration