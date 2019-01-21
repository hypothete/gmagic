import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {setColor} from '../actions/commands';

import colors from '../utils/colors';

const PaletteWrap = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Swatch = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${props => props.color};
`;

class ToolsPalette extends Component {

  render() {
    const {activeCommand, setColor} = this.props;
    return (
      <PaletteWrap>
        {
          colors.map((col, index) =>(
            <Swatch color={col} key={index}
              onClick={() => {setColor(activeCommand, index)}}>
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
