import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import CommandListItem from './CommandListItem';

const StyledList = styled.div`
  border: 2px inset;
  border-top: none;
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  margin: 0 10px 0 0;
  padding-top: 10px;
`;

class CommandList extends Component {
  render() {
    const {commands} = this.props;
    return (
      <StyledList>
        {
          commands.map(cmd => (<CommandListItem key={cmd.id} item={cmd} />))
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
