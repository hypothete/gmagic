import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import CommandListItem from './CommandListItem';

const StyledList = styled.div`
  border: 2px inset;
  min-width: 200px;
  max-height: 100vw;
  overflow-y: scroll;
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
