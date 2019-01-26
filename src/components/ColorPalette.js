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
  border: 2px  ${props => props.active? 'dashed' : 'inset'};
  border-color:  ${props => props.active? 'black' : 'auto'};
`;

class ColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: -1
    };
  }

  componentWillReceiveProps(nextProps) {
    const activeCmd = nextProps.commands.find(cmd => cmd.id === nextProps.activeCommand);
    if (activeCmd) {
      this.setState({
        activeIndex: activeCmd.colors[nextProps.index]
      });
    }
  }

  render() {
    const {activeCommand, setColor, index} = this.props;
    return (
      <PaletteWrap>
        {
          hex.map((col, colorIndex) =>(
            <Swatch color={col} key={colorIndex} active={this.state.activeIndex === colorIndex}
              onClick={() => {setColor(activeCommand, colorIndex, index)}}>
            </Swatch>
          ))
        }
      </PaletteWrap>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeCommand: state.activeCommand,
    commands: state.commands
  };
}

export default connect(mapStateToProps, {setColor})(ColorPalette);
