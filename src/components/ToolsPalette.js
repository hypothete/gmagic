import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {addCommand} from '../actions/commands';
import {setDrawingMode} from '../actions/drawingMode';

import ColorPalette from './ColorPalette';

const ToolsWrap = styled.div`
  border: 2px inset;
  margin: 10px;
  flex: 1;
  z-index: 2;
`;

const ToolButton = styled.button`
  margin: 10px;
  border-width: 2px;
  border-color: ${props => props.active ? 'blue' : 'none'};
`;

class ToolsPalette extends Component {

  render() {
    const {addCommand, activeCommand, setDrawingMode, drawingMode} = this.props;
    return (
      <ToolsWrap>
        <ToolButton
          onClick={() => {addCommand({type: 'LINE', points: [], colorId: 0})}}>
          <span role="img" aria-label="add line">✒️ Add Line</span>
        </ToolButton>
        <ToolButton
          onClick={() => {addCommand({type: 'POLYGON', points: [], colorId: 0})}}>
          <span role="img" aria-label="add polygon">⭐ Add Polygon</span>
        </ToolButton>
        {
          activeCommand !== null && (
            <Fragment>
              <ToolButton
                onClick={() => {setDrawingMode('ADD_POINTS')}} active={drawingMode === 'ADD_POINTS'}>
                <span role="img" aria-label="add points">➕ Add Points</span>
              </ToolButton>
              <ToolButton
                onClick={() => {setDrawingMode('EDIT_POINTS')}} active={drawingMode === 'EDIT_POINTS'}>
                <span role="img" aria-label="edit points">📍 Edit Points</span>
              </ToolButton>
            </Fragment>
          )
        }
        <ColorPalette></ColorPalette>
      </ToolsWrap>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeCommand: state.activeCommand,
    drawingMode: state.drawingMode
  };
}

export default connect(mapStateToProps, {addCommand, setDrawingMode})(ToolsPalette);
