require('../less/main.less');

'use strict';

import React from "react"
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

import ConvertCSVtoBootstrapTable from './convert-csv-to-bootstrap-table'
import BulkGeocoding from './bulk-geocoding'
import BCGMatrix from './bcg-matrix'
import SQLDataGeneration from './sql-data-generation'
import SQLSchemaComparison from './sql-schema-comparison'
import DateGeneration from './date-generation'

const {ipcRenderer} = require('electron')

// ipcRenderer.on('global-shortcut', (event, arg) => {
//     console.log(event)
//     console.log(arg)
// })

class App extends React.Component {
    render() {
        return (
            <div>
                <div className="flex">
                    <h1 className="title">
                        Dan's Tools
                    </h1>
                </div>
                <div className="flex">
                    <div className="nav">
                        <ul>
                            <li><Link to="/convert-csv" activeClassName="active">CSV to Bootstrap Table</Link></li>
                            <li><Link to="/bulk-geocode" activeClassName="active">Bulk Geocoding</Link></li>
                            <li><Link to="/bcg-matrix" activeClassName="active">"BCG Style" Matrix</Link></li>
                            <li><Link to="/sql-data-generation" activeClassName="active">SQL Data Generation</Link></li>
                            <li><Link to="/sql-schema-comparison" activeClassName="active">SQL Schema Comparison</Link></li>
                            <li><Link to="/date-generation" activeClassName="active">Date Generation</Link></li>
                        </ul>
                    </div>
                    {this.props.children}
                </div>
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
            <Route path="bcg-matrix" component={BCGMatrix} />
            <Route path="sql-data-generation" component={SQLDataGeneration} />
            <Route path="sql-schema-comparison" component={SQLSchemaComparison} />
            <Route path="date-generation" component={DateGeneration} />
        </Route>
    </Router>,
    document.getElementById('content')
);
