import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {setActiveCommand} from '../actions/activeCommand';
import {moveCommandUp, moveCommandDown, removeCommand} from '../actions/commands'; 

const ListEntry = styled.div`
  width: 100%;
  border: 2px outset;
  padding: 10px;
  background-color: ${props => props.active ? 'gray' : 'white'}
  display: flex;
  justify-content: space-between;
`;

const EntryCtrls = styled.div`
  display: flex;
  height: 100%;
  width: 1em;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

class CommandListItem extends Component {
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.remove = this.remove.bind(this);
  }

  selectItem() {
    if (!(this.props.activeCommand === this.props.item.id)) {
      this.props.setActiveCommand(this.props.item);
    }
    else {
      this.props.setActiveCommand({ id: null });
    }
  }

  moveUp(evt) {
    evt.stopPropagation();
    this.props.moveCommandUp(this.props.item);
  }

  moveDown(evt) {
    evt.stopPropagation();
    this.props.moveCommandDown(this.props.item);
  }

  remove(evt) {
    evt.stopPropagation();
    this.props.removeCommand(this.props.item);
  }

  render() {
    const {
      item,
      activeCommand
    } = this.props;
    return (
      <ListEntry
        onClick={this.selectItem}
        active={activeCommand === item.id}
      >
        <span>{item.id}</span>
        <EntryCtrls>
          <button onClick={this.moveUp}>
            <span role="img" aria-label="move command up">⬆️</span>
            </button>
          <button onClick={this.remove}>
            <span role="img" aria-label="remove command">🗑️</span>
            </button>
          <button onClick={this.moveDown}>
            <span role="img" aria-label="move command down">⬇️</span>
            </button>
        </EntryCtrls>
      </ListEntry>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeCommand: state.activeCommand
  };
}

const mapDispatchToProps = {
  setActiveCommand,
  moveCommandUp,
  moveCommandDown,
  removeCommand
};

export default connect(mapStateToProps, mapDispatchToProps)(CommandListItem);
