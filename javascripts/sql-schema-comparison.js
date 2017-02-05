'use strict';

import React from "react";
import JsonDiffReact from 'jsondiffpatch-for-react';

class SQLEntry extends React.Component {
  render() {
    return (
      <div>
        <textarea
          name={this.props.name}
          className="small"
          value={this.props.sqlCode}
          onChange={this.props.changeFunction}
          placeholder={this.props.placeholder}
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

  getOrCreate(obj, key) {
    if (!(key in obj)) {
      obj[key] = {};
    }
    return obj[key];
  }

  tsvToJSON(tsvStr) {
    const that = this;
    var s = {};
    tsvStr.split("\n").forEach(function(el, idx) {
      // For now assume the order is schema, table, column
      var vals = el.split("\t"),
          schema = vals[0],
          table  = vals[1],
          column = vals[2];

      var sO = that.getOrCreate(s, schema);
      var tO = that.getOrCreate(sO, table);
      tO[column] = true; // Just set to a boolean
    });
    return s;
  }

  render() {
    const firstJSON = this.tsvToJSON(this.state.first)
    const secondJSON = this.tsvToJSON(this.state.second)

    return (
      <div className="flex">
        <div className="left-sidebar">
          <SQLEntry name='first' placeholder="first schema" sqlCode={this.state.first} changeFunction={this.updateSQL}/>
          <SQLEntry name='second' placeholder="second scehma" sqlCode={this.state.second} changeFunction={this.updateSQL}/>
        </div>
        <div className="right-sidebar">
          <JsonDiffReact
              right={firstJSON}
              left={secondJSON}
              show={true}
              annotated={true}
              tips=" "
          />
        </div>
      </div>
    )
  }
}

export default SQLSchemaComparison