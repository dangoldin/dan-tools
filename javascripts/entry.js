require('../less/main.less');

'use strict';

import React from "react";
import ReactDOM from 'react-dom';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

function Welcome(props) {
  return (
      <div>
        <h1>Hello, {props.name}</h1>
        <Clock />
      </div>
  );
}

function App() {
  return (
    <div>
      <Welcome name="Dan's Tools" />
    </div>
  );
}

ReactDOM.render(
    <App />,
    document.getElementById('content')
);
