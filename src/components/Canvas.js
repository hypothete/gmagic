import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {hex} from '../utils/colors';

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
  margin: 50px;
  box-shadow: 0px 10px 20px rgba(0,0,0,0.2);
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

  fillPattern(x, y, colors, pattern) {
    const px = x % 4;
    const py = y % 4;
    const pc = py * 4 + px;
    const pf = pattern[pc];
    this.ctx.fillStyle = hex[colors[pf ? 1 : 0]];
    this.ctx.fillRect(x-1, y-1,1,1);
  }

  // based on http://members.chello.at/~easyfilter/bresenham.html
  bresenham(x0, y0, x1, y1, colors, pattern) {
    const dx = Math.abs(x1 - x0);
    const dy = -Math.abs(y1 - y0);
    const sx = (x0 < x1) ? 1 : -1;
    const sy = (y0 < y1) ? 1 : -1;
    let x = x0, y = y0;
    let err = dx + dy;
    let e2;
    let loopCt = 0;
    do {
      loopCt++;
      if (loopCt > 500) {
        console.error(`error drawing line ${x0}, ${y0} to ${x1}, ${y1}`);
        break;
      }
      this.fillPattern(x,y, colors, pattern);
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

  polygon(pts, colors, pattern) {
    // http://alienryderflex.com/polygon_fill/
    const polyCorners = pts.length / 2;
    const polyX = [];
    const polyY = [];
    // sort out XY arrays
    for (let h=0; h<pts.length; h+=2) {
      polyX.push(pts[h]);
      polyY.push(pts[h+1]);
    }
    //build node list
    for (let y=0; y<this.refs.canvas.height; y++) {
      const nodeX = [];
      let nodes = 0;
      let j = polyCorners - 1;
      for (let i=0; i<polyCorners; i++) {
        if (
          ((polyY[i] < y) && (polyY[j] >= y)) ||
          ((polyY[j] < y) && (polyY[i] >= y))
        ) {
          nodeX[nodes++] = (
            polyX[i] +
            Math.round((y-polyY[i])/(polyY[j]-polyY[i]) *
            (polyX[j] - polyX[i]))
          );
        }
        j = i;
      }
      // sort nodes
      let k=0;
      while(k < nodes-1) {
        if (nodeX[k] > nodeX[k+1]) {
          let swap = nodeX[k];
          nodeX[k] = nodeX[k+1];
          nodeX[k+1] = swap;
          if (k) k--;
        }
        else {
          k++;
        }
      }
      // fill the pixels between pairs
      for (let l=0; l<nodes; l+=2) {
        if (nodeX[l] >= this.refs.canvas.width) break;
        if (nodeX[l+1] > 0) {
          if (nodeX[l] < 0) nodeX[l] = 0;
          if (nodeX[l+1] > this.refs.canvas.width) nodeX[l+1] = this.refs.canvas.width;
          this.bresenham(nodeX[l], y, nodeX[l+1], y, colors, pattern);
        }
      }
    }
  }

  renderCanvas(props) {
    this.ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    const {commands, activeCommand} = props;
    const cmds = [...commands];//.reverse();
    let activeCmd;
    cmds.forEach(cmd => {
      switch(cmd.type) {
        case 'POLYGON': {
          this.polygon(cmd.points, cmd.colors, cmd.pattern);
          break;
        }
        case 'LINE': {
          for (let i = 0; i < cmd.points.length-3; i+=2) {
            const x0 = cmd.points[i];
            const y0 = cmd.points[i+1];
            const x1 = cmd.points[i+2];
            const y1 = cmd.points[i+3];
            this.bresenham(x0, y0, x1, y1, cmd.colors, cmd.pattern);
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
      this.ctx.strokeStyle = hex[activeCmd.colorId];
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
    return [
      <CanvasFrame key="frame" onMouseUp={this.handleMouseUp}>
        <PixelCanvas scale={this.state.scale} ref="canvas"
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onClick={this.handleClick}
          onContextMenu={this.handleContextMenu}
        ></PixelCanvas>
      </CanvasFrame>,
      <ZoomCtrls key="ctrls" dragging={this.state.dragIndex > -1}>
        <button onClick={this.zoomIn}><span role="img" aria-label="zoom in">➕</span></button>
        <button onClick={this.zoomOut}><span role="img" aria-label="zoom out">➖</span></button>
      </ZoomCtrls>
    ];
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
