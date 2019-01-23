import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import colors from '../utils/colors';

import {addPoint, movePoint, removePoint} from '../actions/commands';

const CanvasFrame = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  overflow: scroll;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: darkgray;
  margin-right: 10px;
`;

const ZoomCtrls = styled.div`
  position: absolute;
  display: ${props => props.dragging ? 'none' : 'block' };
  z-index: 3;
  left: 10px;
  top: 10px;
`;

const PixelCanvas = styled.canvas`
  width: ${props => props.scale}px;
  height: ${props => props.scale}px;
  image-rendering: optimizeSpeed;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: optimize-contrast;
  image-rendering: pixelated;
  -ms-interpolation-mode: nearest-neighbor;
  z-index: 1;
  background-color: white;
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
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);

    this.state = {
      dragIndex: -1,
      scale: 512
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

  zoomIn() {
    this.setState({
      scale: this.state.scale * 2
    });
  }

  zoomOut() {
    this.setState({
      scale: this.state.scale / 2
    });
  }

//   void plotLine(int x0, int y0, int x1, int y1)
// {
//    int dx =  abs(x1-x0), sx = x0<x1 ? 1 : -1;
//    int dy = -abs(y1-y0), sy = y0<y1 ? 1 : -1; 
//    int err = dx+dy, e2; /* error value e_xy */
 
//    for(;;){  /* loop */
//       setPixel(x0,y0);
//       if (x0==x1 && y0==y1) break;
//       e2 = 2*err;
//       if (e2 >= dy) { err += dy; x0 += sx; } /* e_xy+e_x > 0 */
//       if (e2 <= dx) { err += dx; y0 += sy; } /* e_xy+e_y < 0 */
//    }
// }
  bresenham(x0, y0, x1, y1, col) {
    const dx = Math.abs(x1 - x0);
    const dy = -Math.abs(y1 - y0);
    const sx = (x0 < x1) ? 1 : -1;
    const sy = (y0 < y1) ? 1 : -1;
    let x = x0, y = y0;
    let err = dx + dy;
    let e2;
    let loopCt = 0;
    this.ctx.fillStyle = col;
    do {
      loopCt++;
      if (loopCt > 500) {
        console.error(`error drawing line ${x0}, ${y0} to ${x1}, ${y1}`);
        break;
      }
      this.ctx.fillRect(x-1, y-1, 1, 1);
      if ((x===x1) && (y===y1)) break;
      e2 = 2 * err;
      if (e2 >= dy) {
        err += dy;
        x += sx;
      }
      if (e2 <= dx) {
        err += dx;
        y += sy;
      }
    } while ((x !== x1) || (y !== y1));
  }

  renderCanvas(props) {
    this.ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    const {commands, activeCommand} = props;
    const cmds = [...commands].reverse();
    let activeCmd;
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
          for (let i = 0; i < cmd.points.length-3; i+=2) {
            const x0 = cmd.points[i];
            const y0 = cmd.points[i+1];
            const x1 = cmd.points[i+2];
            const y1 = cmd.points[i+3];
            this.bresenham(x0, y0, x1, y1, colors[cmd.colorId]);
          }
          break;
        }
        default:
          return;
      }
      if(cmd.id === activeCommand) {
        activeCmd = cmd;
      }
    });
    if(activeCmd) {
      // draw points
      this.ctx.globalCompositeOperation = 'xor';
      this.ctx.strokeStyle = colors[activeCmd.colorId];
      for (let i=0; i< activeCmd.points.length; i+=2) {
        const x = activeCmd.points[i] - 0.5;
        const y = activeCmd.points[i+1] - 0.5;
        this.ctx.strokeRect(x-1, y-1, 2, 2);
      }
      this.ctx.globalCompositeOperation = 'source-over';
    }
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

  getNearestPoint(evt) {
    const xy = this.convert(evt);
    const cmd = this.props.commands.find(someCmd => someCmd.id === this.props.activeCommand);
    // check dist to points
    let nearest = -1;
    for(let i=0; i < cmd.points.length; i+=2) {
      const pt = {
        x: cmd.points[i],
        y: cmd.points[i+1]
      };
      const dist = this.dist(pt, xy);
      if (dist < 8) {
        nearest = i;
        break;
      }
    }
    return nearest;
  }

  handleClick(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    if (!this.props.activeCommand) return;
    if (this.props.drawingMode === 'EDIT_POINTS') return;
    // add point
    const { x, y } = this.convert(evt);
    this.props.addPoint(this.props.activeCommand, x, y);
  }

  handleMouseDown(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    if (!this.props.activeCommand || this.props.drawingMode !== 'EDIT_POINTS') return;
    const nearest = this.getNearestPoint(evt);
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

  handleContextMenu(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    return false;
  }

  render() {
    return (
      <Fragment>
        <CanvasFrame>
          <PixelCanvas scale={this.state.scale} ref="canvas"
            onMouseDown={this.handleMouseDown}
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
            onClick={this.handleClick}
            onContextMenu={this.handleContextMenu}
          ></PixelCanvas>
        </CanvasFrame>
        <ZoomCtrls dragging={this.state.dragIndex > -1}>
        <button onClick={this.zoomIn}><span role="img" aria-label="zoom in">➕</span></button>
        <button onClick={this.zoomOut}><span role="img" aria-label="zoom out">➖</span></button>
        </ZoomCtrls>
      </Fragment>
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

export default connect(mapStateToProps, {addPoint, movePoint, removePoint})(Canvas);
