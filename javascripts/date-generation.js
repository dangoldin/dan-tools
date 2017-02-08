'use strict';

import React from "react";

class DateEntry extends React.Component {
  render() {
    return (
      <form>
        <div className="option-group">
          <input type="text" placeholder="start date" />
          <input type="text" placeholder="end date" />
        </div>
        <div className="option-group">
          <select>
            <option>Minute</option>
            <option>Hour</option>
            <option>Day</option>
          </select>
          <input type="text" placeholder="step value"/>
        </div>
        <div className="option-group">
          <input type="text" placeholder="date format"/>
        </div>
      </form>
    )
  }
}

class DateResults extends React.Component {
  render() {
    return (
      <div>
        OUT
      </div>
    )
  }
}

class DateGeneration extends React.Component {
  render() {
    return (
      <div className="flex">
        <div className="left-sidebar">
          <DateEntry/>
        </div>
        <div className="right-sidebar">
          <DateResults/>
        </div>
      </div>
    )
  }
}

export default DateGeneration