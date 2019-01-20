import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

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
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(0, 0, 128, 128);

    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(32, 32, 64, 64);
  }

  render() {
    return (
      <PixelCanvas ref="canvas"></PixelCanvas>
    );
  }
}

const mapStateToProps = state => {
  return {
    commands: state.commands
  };
}

export default connect(mapStateToProps)(Canvas);
