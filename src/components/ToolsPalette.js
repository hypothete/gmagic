import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {addCommand, addBackground} from '../actions/commands';
import {setDrawingMode} from '../actions/drawingMode';

import ColorPalette from './ColorPalette';
import PatternToggle from './PatternToggle';
import { openModal } from '../actions/modal';

const ToolsWrap = styled.div`
  margin: 10px;
  flex: 1;
  min-height: 100px;
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  overflow-y: scroll;
  padding: 0 10px;
`;

const ToolsColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const ToolButton = styled.button`
  margin: 0px 5px 5px 5px;
  border-width: 2px;
  border-color: ${props => props.active ? 'blue' : 'none'};
`;

const ToolRow = styled.div`
  min-height: 30px;
`;

class ToolsPalette extends Component {

  render() {
    const {
      addCommand,
      activeCommand,
      setDrawingMode,
      drawingMode,
      addBackground,
      openModal
      } = this.props;
    return (
      <ToolsWrap>
        <ToolsColumn>
          <ToolRow>
          <ToolButton
            onClick={() => {addCommand('LINE')}}>
            <span role="img" aria-label="add line">✒️ Add Line</span>
          </ToolButton>
          <ToolButton
            onClick={() => {addCommand('POLYGON')}}>
            <span role="img" aria-label="add polygon">⭐ Add Polygon</span>
          </ToolButton>
          <ToolButton
            onClick={() => {addBackground()}}>
            <span role="img" aria-label="add background">🖼️ Add Background</span>
          </ToolButton>
          <ToolButton
            onClick={() => {openModal()}} >
            <span role="img" aria-label="open export modal">💾 Import/Export</span>
          </ToolButton>
          </ToolRow>
          <ToolRow>
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
        </ToolsColumn>
        <ToolsColumn>
          <ColorPalette index={0}></ColorPalette>
          <ColorPalette index={1}></ColorPalette>
        </ToolsColumn>
        <ToolsColumn>
          <PatternToggle></PatternToggle>
        </ToolsColumn>
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

export default connect(mapStateToProps, {addCommand, addBackground, setDrawingMode, openModal})(ToolsPalette);
