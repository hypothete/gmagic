import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {setColor} from '../actions/commands';

import {hex} from '../utils/colors';

const PaletteWrap = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Swatch = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.color};
  border: 2px inset;
`;

class ToolsPalette extends Component {

  render() {
    const {activeCommand, setColor, index} = this.props;
    return (
      <PaletteWrap>
        {
          hex.map((col, color) =>(
            <Swatch color={col} key={color}
              onClick={() => {setColor(activeCommand, color, index)}}>
            </Swatch>
          ))
        }
      </PaletteWrap>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeCommand: state.activeCommand
  };
}

export default connect(mapStateToProps, {setColor})(ToolsPalette);
