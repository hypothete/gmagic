import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {addCommand} from '../actions/commands';
import {setDrawingMode} from '../actions/drawingMode';

const ToolsWrap = styled.div`
  border: 2px inset;
  margin: 10px;
  flex: 1;
`;

const ToolButton = styled.button`
  margin: 10px;
  border-width: 2px;
  border-color: ${props => props.active ? 'blue' : 'none'};
`;

class ToolsPalette extends Component {

  render() {
    const {setDrawingMode, drawingMode} = this.props;
    return (
      <ToolsWrap>
        <ToolButton
          onClick={() => {setDrawingMode('DRAW_LINE')}}
          active={drawingMode === 'DRAW_LINE'}>
          <span role="img" aria-label="add shape">✒️ Draw Line</span>
        </ToolButton>
        <ToolButton
          onClick={() => {setDrawingMode('DRAW_POLYGON')}}
          active={drawingMode === 'DRAW_POLYGON'}>
          <span role="img" aria-label="add shape">⭐ Draw Polygon</span>
        </ToolButton>
      </ToolsWrap>
    );
  }
}

const mapStateToProps = state => {
  return {
    drawingMode: state.drawingMode
  };
}

export default connect(mapStateToProps, {setDrawingMode})(ToolsPalette);
