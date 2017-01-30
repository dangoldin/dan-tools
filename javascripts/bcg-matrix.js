'use strict';

import React from "react";

class PointRow extends React.Component {
  render() {
    var point = this.props.point;

    return (
      <li>
        <span className="coord">{point.x}</span>
        <span className="coord">{point.y}</span>
        <span className="label">{point.label}</span>
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
      <ul className="points">
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
        <input type="text" name="x" placeholder="x coordinate" value={this.state.x} onChange={this.handleInputChange}/>
        <input type="text" name="y" placeholder="y coordinate" value={this.state.y} onChange={this.handleInputChange}/>
        <input type="text" name="label" placeholder="the label" value={this.state.label} onChange={this.handleInputChange}/>
        <input type="submit" value="Add" />
      </form>
    )
  }
}

class Matrix extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      side: 400
    }

    this.convertCoordinate = this.convertCoordinate.bind(this)
  }

  // -10 to 10 => 0 to side
  convertCoordinate(coord) {
    const side = this.state.side
    const half = side/2

    return side/20 * coord + half
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const convertCoordinate = this.convertCoordinate;
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.state.side, this.state.side);
    ctx.fillRect(this.state.side/2, 0, 1, this.state.side)
    ctx.fillRect(0, this.state.side/2, this.state.side, 1)
    this.props.points.forEach(function(p) {
      ctx.fillRect(convertCoordinate(p.x), convertCoordinate(-1 * p.y), 5, 5);
      ctx.font = '16px serif';
      ctx.fillText(p.label, convertCoordinate(p.x) + 5, convertCoordinate(-1 * p.y) - 5, 80)
    })
  }

  render() {
    return (
      <canvas ref="canvas" width={this.state.side} height={this.state.side}/>
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
        <div className="left-sidebar">
          <PointList
            points={this.state.points}
            deletePoint={idx => this.deletePoint(idx)}
            />
          <AddPoint addPoint={this.addPoint}/>
        </div>
        <div className="right-sidebar">
          <Matrix points={this.state.points}/>
        </div>
      </div>
    )
  }
}

export default BCGMatrix
