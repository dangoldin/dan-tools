require('../less/main.less');

'use strict';

import React from "react";
import ReactDOM from 'react-dom';
// import { Router, Route, Link, browserHistory } from 'react-router'

import ConvertCSVtoBootstrapTable from './convert-csv-to-bootstrap-table';
import BulkGeocoding from './bulk-geocoding';

const {ipcRenderer} = require('electron')

ipcRenderer.on('global-shortcut', (event, arg) => {
    console.log(event)
    console.log(arg)
})

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 'showCSV'
        }
    }

    render() {
        let Page
        switch (this.state.page) {
            case 'showCsv': Page = ConvertCSVtoBootstrapTable; break;
            case 'bulkGeocoding': Page = BulkGeocoding; break;
            default: Page = ConvertCSVtoBootstrapTable; break;
        }

        return (
            <div>
            <div>
                <h1>
                    Welcome to Dan's Tools
                </h1>
            </div>
            <div className="nav">
                <ul>
                    <li><a href="#">CSV to Bootstrap Table</a></li>
                    <li><a href="#">Bulk Geocoding</a></li>
                    <li><a href="#">"BCG Style" Matrix</a></li>
                    <li><a href="#">SQL Data Generation</a></li>
                    <li><a href="#">SQL Schema Comparison</a></li>
                    <li><a href="#">Date Generation</a></li>
                </ul>
            </div>
            <Page/>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('content')
);
