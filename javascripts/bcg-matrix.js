'use strict';

import React from "react";

class PointRow extends React.Component {
  render() {
    var point = this.props.point;

    return (
      <li>
        {point.x} {point.y} {point.label}
        <button
          onClick={() => this.props.deletePoint(this.props.id)}>X</button>
      </li>
    )
  }
}

class PointList extends React.Component {
  constructor(props) {
    super(props)

    this.renderPointRow = this.renderPointRow.bind(this)
  }

  renderPointRow(point, idx) {
    return (
      <PointRow
        point={point}
        key={idx}
        id={idx}
        deletePoint={this.props.deletePoint}
        />
    )
  }

  render() {
    var Points = this.props.points.map(this.renderPointRow);
    return (
      <ul>
        {Points}
      </ul>
    )
  }
}

class AddPoint extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: '',
      y: '',
      label: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    this.props.addPoint(
      this.state.x, this.state.y, this.state.label
    )

    this.setState({
      x: '', y: '', label: ''
    })

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="x" value={this.state.x} onChange={this.handleInputChange}/>
        <input type="text" name="y" value={this.state.y} onChange={this.handleInputChange}/>
        <input type="text" name="label" value={this.state.label} onChange={this.handleInputChange}/>
        <input type="submit" value="Add" />
      </form>
    )
  }
}

class BCGMatrix extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      points: [
        {x: 1, y: 1, label: 'Hello'},
        {x: 3, y: -3, label: 'Hello 2'}
        ]
    }

    this.deletePoint = this.deletePoint.bind(this)
    this.addPoint = this.addPoint.bind(this)
  }

  addPoint(x, y, label) {
    var points = this.state.points

    points.push({
      x: x, y: y, label: label
    })

    this.setState({
      points: points
    })
  }

  deletePoint(idx) {
    var points = this.state.points
    delete points[idx]
    this.setState({ points: points })
  }

  render() {
    return (
      <div>
        <PointList
          points={this.state.points}
          deletePoint={idx => this.deletePoint(idx)}
          />
        <AddPoint addPoint={this.addPoint}/>
      </div>
    )
  }
}

export default BCGMatrix
