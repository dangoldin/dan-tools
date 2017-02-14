'use strict';

import React from "react";
var dateFormat = require('dateformat');

class DateEntry extends React.Component {
  render() {
    return (
      <form>
        <div className="option-group">
          <input type="text" name="start" placeholder="start date" value={this.props.start} onChange={this.props.updateField}/>
          <input type="text" name="end" placeholder="end date" value={this.props.end} onChange={this.props.updateField}/>
        </div>
        <div className="option-group" value={this.props.interval_type} onChange={this.props.updateField}>
          <select name="interval_type">
            <option>Minute</option>
            <option>Hour</option>
            <option>Day</option>
            <option>Week</option>
          </select>
          <input type="text" name="interval_step" placeholder="step value" value={this.props.interval_step} onChange={this.props.updateField}/>
        </div>
        <div className="option-group">
          <input type="text" name="date_format" placeholder="date format" value={this.props.date_format} onChange={this.props.updateField}/>
        </div>
      </form>
    )
  }
}

class DateResults extends React.Component {
  is_valid(props) {
    return (props.start !== '') &&
      (props.end !== '') &&
      (props.interval_type !== '') &&
      (props.interval_step !== '') &&
      (props.date_format !== '')
  }

  render() {
    var DateRows = [];
    if (this.is_valid(this.props)) {
      var start = new Date(this.props.start)
      start.setTime( start.getTime() + start.getTimezoneOffset() * 60 * 1000 );

      var end = new Date(this.props.end)
      end.setTime( end.getTime() + end.getTimezoneOffset() * 60 * 1000 );

      var step_val = parseFloat(this.props.interval_step)
      switch (this.props.interval_type) {
        case 'Minute':
          step_val *= 60 * 1000
          break;
        case 'Hour':
          step_val *= 60 * 60 * 1000
          break;
        case 'Day':
          step_val *= 24 * 60 * 60 * 1000
          break;
        case 'Week':
          step_val *= 7 * 24 * 60 * 60 * 1000
          break;
      }

      var i = 0
      while (start < end) {
        DateRows.push(
          <li key={i++}>
            {dateFormat(start, this.props.date_format)}
          </li>
        )

        start = new Date( start.getTime() + step_val );
      }

      // console.log(start);
      // console.log(end);
      // console.log(step_val);
      // console.log(start < end)
    }

    return (
      <ul className="points">
        {DateRows}
      </ul>
    )
  }
}

class DateGeneration extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      start: '2017-01-01',
      end: '2017-01-10',
      interval_type: 'Day',
      interval_step: '1',
      date_format: 'yyyy-mm-dd'
    }

    this.updateField = this.updateField.bind(this)
  }

  updateField(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const props = this.state

    return (
      <div className="flex">
        <div className="left-sidebar">
          <DateEntry {...props} updateField={this.updateField} />
        </div>
        <div className="right-sidebar">
          <DateResults {...props} />
        </div>
      </div>
    )
  }
}

export default DateGeneration