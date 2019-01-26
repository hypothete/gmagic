import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {setPattern} from '../actions/commands';

const Wrap = styled.div`
  width: 100px;
  height: 100px;
`;

const Check = styled.input`
  width: 25%;
  height: 25%;
  float: left;
  margin: 0;
`;

class PatternToggle extends Component {
  constructor(props){
    super(props);

    const activeCmd = props.commands.find(cmd => cmd.id === props.activeCommand);
    if (activeCmd) {
      this.state ={
        values: [...activeCmd.pattern]
      };
    }
    else {
      this.state = {values:[
        false, false, false, false,
        false, false, false, false,
        false, false, false, false,
        false, false, false, false,
      ]};
    }
    this.toggleValue = this.toggleValue.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const activeCmd = nextProps.commands.find(cmd => cmd.id === nextProps.activeCommand);
    if (activeCmd) {
      this.setState({
        values: [...activeCmd.pattern]
      });
    }
  }
  toggleValue(index) {
    this.props.setPattern(this.props.activeCommand, this.state.values.map((val, valIndex) => {
      if (valIndex === index) {
        return !val;
      }
      return val;
    }))
  }

  render() {
    return (
      <Wrap>
        {
          this.state.values.map((value, index) => (
            <Check type="checkbox" key={index} checked={value} onChange={() => {this.toggleValue(index);}} />
          ))
        }
      </Wrap>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeCommand: state.activeCommand,
    commands: state.commands
  };
}

export default connect(mapStateToProps, {setPattern})(PatternToggle);
