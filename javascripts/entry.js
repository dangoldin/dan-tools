require('../less/main.less');

'use strict';

import React from "react";
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

import ConvertCSVtoBootstrapTable from './convert-csv-to-bootstrap-table';
import BulkGeocoding from './bulk-geocoding';

const {ipcRenderer} = require('electron')

ipcRenderer.on('global-shortcut', (event, arg) => {
    console.log(event)
    console.log(arg)
})

class App extends React.Component {
    render() {
        return (
            <div>
            <div>
                <h1>
                    Welcome to Dan's Tools
                </h1>
            </div>
            <div className="nav">
                <ul>
                    <li><Link to="/convert-csv">CSV to Bootstrap Table</Link></li>
                    <li><Link to="/bulk-geocode">Bulk Geocoding</Link></li>
                    <li><a href="#">"BCG Style" Matrix</a></li>
                    <li><a href="#">SQL Data Generation</a></li>
                    <li><a href="#">SQL Schema Comparison</a></li>
                    <li><a href="#">Date Generation</a></li>
                </ul>
            </div>
            {this.props.children}
            </div>
        );
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={ConvertCSVtoBootstrapTable} />
            <Route path="convert-csv" component={ConvertCSVtoBootstrapTable} />
            <Route path="bulk-geocode" component={BulkGeocoding} />
        </Route>
    </Router>,
    document.getElementById('content')
);
