require('../less/main.less');

'use strict';

import React from "react";
import ReactDOM from 'react-dom';

function Welcome(props) {
  return (
      <div>
        <h1>Hello, {props.name}</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
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
