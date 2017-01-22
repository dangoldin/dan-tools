require('../less/main.less');

'use strict';

import React from "react";
import ReactDOM from 'react-dom';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date(), clicks: 0};

        this.incrementClick = this.incrementClick.bind(this);
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

    incrementClick() {
        this.setState((prevState, props) => {
            clicks: prevState.clicks += 1
        });
    }

    render() {
        return (
            <div onClick={this.incrementClick}>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            <h3>Clicks: {this.state.clicks}</h3>
            </div>
        );
    }
}

function Welcome(props) {
  return (
      <div>
        <h1>Welcome to {props.name}</h1>
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
