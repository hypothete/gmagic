import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {addCommand} from '../actions/commands';
import {setDrawingMode} from '../actions/drawingMode';

import ColorPalette from './ColorPalette';

const ToolsWrap = styled.div`
  margin: 10px;
  flex: 1;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ToolButton = styled.button`
  margin: 10px;
  border-width: 2px;
  border-color: ${props => props.active ? 'blue' : 'none'};
`;

const ToolRow = styled.div`
  min-height: 30px;
`;

class ToolsPalette extends Component {

  render() {
    const {addCommand, activeCommand, setDrawingMode, drawingMode} = this.props;
    return (
      <ToolsWrap>
        <ToolRow>
        <ToolButton
          onClick={() => {addCommand('LINE')}}>
          <span role="img" aria-label="add line">✒️ Add Line</span>
        </ToolButton>
        <ToolButton
          onClick={() => {addCommand('POLYGON')}}>
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
        </ToolRow>
        <ColorPalette index={0}></ColorPalette>
        <ColorPalette index={1}></ColorPalette>
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
