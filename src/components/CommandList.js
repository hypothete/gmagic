import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import CommandListItem from './CommandListItem';

const StyledList = styled.div`
  border-bottom: 2px inset;
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  margin-right: 10px;
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
