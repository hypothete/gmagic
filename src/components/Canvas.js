import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import colors from '../utils/colors';

import {addPoint, movePoint} from '../actions/commands';

const PixelCanvas = styled.canvas`
  width: 512px;
  height: 512px;
  image-rendering: optimizeSpeed;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: optimize-contrast;
  image-rendering: pixelated;
  -ms-interpolation-mode: nearest-neighbor;
  box-shadow: 0px 10px 10px rgba(0,0,0,0.5);
  flex-shrink: 0;
`;

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.renderCanvas = this.renderCanvas.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      dragIndex: -1
    }
  }

  componentDidMount() {
    this.refs.canvas.width = 128;
    this.refs.canvas.height = 128;
    this.ctx = this.refs.canvas.getContext('2d');
    this.renderCanvas(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.renderCanvas(nextProps);
  }

  renderCanvas(props) {
    this.ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    const {commands, activeCommand} = props;
    const cmds = [...commands].reverse();
    cmds.forEach(cmd => {
      switch(cmd.type) {
        case 'POLYGON': {
          this.ctx.fillStyle = colors[cmd.colorId];
          this.ctx.beginPath();
          for (let i=0; i< cmd.points.length; i+=2) {
            const x = cmd.points[i] - 0.5;
            const y = cmd.points[i+1] - 0.5;
            if (i === 0) {
              this.ctx.moveTo(x,y);
            }
            else {
              this.ctx.lineTo(x,y);
            }
          }
          this.ctx.closePath();
          this.ctx.fill();
          break;
        }
        case 'LINE': {
          this.ctx.strokeStyle = colors[cmd.colorId];
          this.ctx.beginPath();
          for (let i=0; i< cmd.points.length; i+=2) {
            const x = cmd.points[i] - 0.5;
            const y = cmd.points[i+1] - 0.5;
            if (i === 0) {
              this.ctx.moveTo(x,y);
            }
            else {
              this.ctx.lineTo(x,y);
            }
          }
          this.ctx.stroke();
          break;
        }
        default:
          return;
      }
      if(cmd.id === activeCommand) {
        // draw points
        this.ctx.strokeStyle = colors[cmd.colorId];
        for (let i=0; i< cmd.points.length; i+=2) {
          const x = cmd.points[i] - 0.5;
          const y = cmd.points[i+1] - 0.5;
          this.ctx.strokeRect(x-2, y-2, 4, 4);
        }
      }
    });
  }

  convert(evt) {
    const rect = this.refs.canvas.getBoundingClientRect();
    return {
      x: Math.floor(this.refs.canvas.width * (evt.clientX - rect.left) / rect.width),
      y: Math.floor(this.refs.canvas.height * (evt.clientY - rect.top) / rect.height)
    };
  }

  dist (a, b) {
    // squared distance - one less operation
    return Math.pow(b.x-a.x, 2) + Math.pow(b.y - a.y, 2);
  }

  handleClick(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }

  handleMouseDown(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    const xy = this.convert(evt);
    if (!this.props.activeCommand || this.props.drawingMode !== 'EDIT_POINTS') return;
    const cmd = this.props.commands.find(someCmd => someCmd.id === this.props.activeCommand);
    // check dist to points
    let nearest = -1;
    for(let i=0; i < cmd.points.length; i+=2) {
      const pt = {
        x: cmd.points[i],
        y: cmd.points[i+1]
      };
      const dist = this.dist(pt, xy);
      if (dist < 4) {
        nearest = i;
        break;
      }
    }
    if (nearest >= 0) {
      // found a point
      this.setState({
        dragIndex: nearest
      });
    }
  }

  handleMouseMove(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    if (this.state.dragIndex < 0) return;
    // move selected point
    const {x, y} = this.convert(evt);
    this.props.movePoint(this.props.activeCommand, this.state.dragIndex, x, y);
  }

  handleMouseUp(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    this.setState({
      dragIndex: -1
    });
  }

  render() {
    return (
      <PixelCanvas ref="canvas"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onClick={this.handleClick}
      ></PixelCanvas>
    );
  }
}

const mapStateToProps = state => {
  return {
    commands: state.commands,
    activeCommand: state.activeCommand,
    drawingMode: state.drawingMode
  };
}

export default connect(mapStateToProps, {addPoint, movePoint})(Canvas);
