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
    const {setDrawingMode, addCommand, drawingMode} = this.props;
    return (
      <ToolsWrap>
        <button onClick={() => { addCommand({})}}>Add</button>
        <ToolButton onClick={() => { setDrawingMode('DRAW') }} active={drawingMode === 'DRAW'}>
          <span role="img" aria-label="add shape">✒️ Add</span>
        </ToolButton>
        <ToolButton onClick={() => { setDrawingMode('EDIT') }} active={drawingMode === 'EDIT'}>
          <span role="img" aria-label="edit shape">📍 Edit</span>
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

export default connect(mapStateToProps, {addCommand, setDrawingMode})(ToolsPalette);
