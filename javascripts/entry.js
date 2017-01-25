require('../less/main.less');

'use strict';

import React from "react";
import ReactDOM from 'react-dom';

const {ipcRenderer} = require('electron')

ipcRenderer.on('global-shortcut', (event, arg) => {
    console.log(event)
    console.log(arg)
})

class TableEntry extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange() {
        this.props.onUserInput(
            this.hasHeaderInput.checked,
            this.delimiterTypeInput.value,
            this.tableTextInput.value,
            false
        );
    }

    handleSubmit(event) {
        this.props.onUserInput(
            this.hasHeaderInput.checked,
            this.delimiterTypeInput.value,
            this.tableTextInput.value,
            true
        );
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p>
                    <input
                        type="checkbox"
                        checked={this.props.hasHeader}
                        ref={(input) => this.hasHeaderInput = input}
                        onChange={this.handleChange}
                    />
                    {' '}
                    Has header
                </p>
                <p>
                    <select
                        value={this.props.delimiterType}
                        ref={(input) => this.delimiterTypeInput = input}
                        onChange={this.handleChange}>
                        <option value="tab">Tab</option>
                        <option value="csv">CSV</option>
                        <option value="space">Space</option>
                    </select>
                </p>
                <p>
                    <textarea
                        value={this.props.tableText}
                        ref={(input) => this.tableTextInput = input}
                        onChange={this.handleChange}
                    />
                </p>
                <p>
                    <input
                        type="submit"
                        value="Submit"
                    />
                </p>
            </form>
        )
    };
}

class TableResult extends React.Component {
    constructor(props) {
        super(props);
    }

    // From http://stackoverflow.com/questions/1293147/javascript-code-to-parse-csv-data
    csvToArray(strData, strDelimiter) {
        if (!strData.length) {
            return [];
        }

        var objPattern = new RegExp(
            (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
            );

        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];

        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;

        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec( strData )){
            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[ 1 ];
            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter != strDelimiter)
            ){
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );
            }

            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]){
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );
            } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[ 3 ];
            }

            // Now that we have our value string, let's add
            // it to the data array.
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }

        // Return the parsed data.
        return( arrData );
    }

    getDelimiter() {
        return {
            'space': ' ',
            'tab': '\t',
            'csv': ','
        }[this.props.delimiterType];
    }

    getTableHTML(rows) {
        var table = '<table class="table">';
        var header = [];
        var idx = 0;
        if (this.props.hasHeader) {
            header = rows[0];
            idx = 1;
        }

        if (header.length) {
            table += '<thead><tr>';
            table += header.map(function(x) { return '<th>' + x.toString() + '</th>';}).join('');
            table += '</tr></thead>';
        }

        table += '<tbody>';
        table += rows.slice(idx).map(function(row) {
                return '<tr>' + row.map(function(x) {return '<td>' + x.toString() + '</td>';}).join('') + '</tr>';
            }).join('');
        table += '</tbody></table>';

        return table;
    }

    render() {
        var rows = [];
        var html = '';
        if (this.props.tableText.length) {
            try {
                rows = this.csvToArray(this.props.tableText, this.getDelimiter());
                html = this.getTableHTML(rows);
            } catch (e) {
                console.log("Failed to generate HTML table");
                console.log(e);
            }
        }

        return (
            <div>
                <p>
                    {html}
                </p>
            </div>
        )
    };
}

class ConvertCSVtoBootstrapTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasHeader: true,
            delimiterType: 'tab',
            tableText: '',
            tableOutText: ''
        };

        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(hasHeader, delimiterType, tableText, updateRight = false) {
        this.setState({
            hasHeader: hasHeader,
            delimiterType: delimiterType,
            tableText: tableText,
            tableOutText: updateRight ? tableText : ''
        });
    }

    render() {
        return (
            <div>
                <div className="left-sidebar">
                    <TableEntry
                        hasHeader={this.state.hasHeader}
                        delimiterType={this.state.delimiterType}
                        tableText={this.state.tableText}
                        onUserInput={this.handleUserInput}
                    />
                </div>
                <div className="right-sidebar">
                    <TableResult
                        tableText={this.state.tableOutText}
                        hasHeader={this.state.hasHeader}
                        delimiterType={this.state.delimiterType}
                    />
                </div>
            </div>
        );
    };
}

function App() {
  return (
    <div>
      <div>
        <h1>
            Welcome to Dan's Tools
        </h1>
      </div>
      <ConvertCSVtoBootstrapTable />
    </div>
  );
}

ReactDOM.render(
    <App />,
    document.getElementById('content')
);
