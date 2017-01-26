require('../less/main.less');

'use strict';

import React from "react";
import ReactDOM from 'react-dom';

import ConvertCSVtoBootstrapTable from './convert-csv-to-bootstrap-table';

const {ipcRenderer} = require('electron')

ipcRenderer.on('global-shortcut', (event, arg) => {
    console.log(event)
    console.log(arg)
})

function App() {
  return (
    <div>
      <div>
        <h1>
            Welcome to Dan's Tools
        </h1>
      </div>
      <ul>
        <li>CSV to Bootstrap Table</li>
        <li>Bulk Geocoding</li>
        <li>"BCG Style" Matrix</li>
        <li>SQL Data Generation</li>
        <li>SQL Schema Comparison</li>
        <li>Date Generation</li>
      </ul>
      <ConvertCSVtoBootstrapTable />
    </div>
  );
}

ReactDOM.render(
    <App />,
    document.getElementById('content')
);
