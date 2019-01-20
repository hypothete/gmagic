import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledList = styled.div`
  border: 2px inset;
  min-width: 200px;
  max-height: 100vw;
  overflow-y: scroll;
`;

const ListEntry = styled.div`
  width: 100%;
  border: 2px outset;
  padding: 10px;
`;

class CommandList extends Component {
  render() {
    const {commands} = this.props;
    return (
      <StyledList>
        {
          commands.map(cmd => (<ListEntry key={cmd.id}>{cmd.id}</ListEntry>))
        }
      </StyledList>
    );
  }
}

const mapStateToProps = state => {
  return {
    commands: state.commands
  };
}

export default connect(mapStateToProps)(CommandList);
