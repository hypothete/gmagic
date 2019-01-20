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

class ToolsPalette extends Component {
  render() {
    const {setDrawingMode, addCommand} = this.props;
    return (
      <ToolsWrap>
        <button onClick={() => { addCommand({})}}>Add</button>
      </ToolsWrap>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
}

export default connect(mapStateToProps, {addCommand, setDrawingMode})(ToolsPalette);
