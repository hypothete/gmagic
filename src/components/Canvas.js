import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import colors from '../utils/colors';

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
`;

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.renderCanvas = this.renderCanvas.bind(this);
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
    this.ctx.clearRect(0, 0, 128, 128);

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

  render() {
    return (
      <PixelCanvas ref="canvas"></PixelCanvas>
    );
  }
}

const mapStateToProps = state => {
  return {
    commands: state.commands,
    activeCommand: state.activeCommand
  };
}

export default connect(mapStateToProps)(Canvas);
