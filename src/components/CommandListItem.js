import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {setActiveCommand} from '../actions/activeCommand';
import {moveCommandUp, moveCommandDown, removeCommand, nameCommand} from '../actions/commands'; 

const ListEntry = styled.div`
  width: 100%;
  border: 2px outset;
  padding: 10px;
  background-color: ${props => props.active ? 'gray' : 'white'}
  display: flex;
  justify-content: flex-end;
`;

const EntryCtrls = styled.div`
  display: flex;
  height: 100%;
  width: 1em;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-right: 5px;
`;

const EntryText = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
  flex: 1;
`;

class CommandListItem extends Component {
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.remove = this.remove.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
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

  handleNameChange(evt) {
    this.props.nameCommand(this.props.item.id, evt.target.value);
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
        <EntryText>
          <span>{item.id}: {item.type.toLowerCase()}</span>
          <input type="text" value={item.name} onChange={this.handleNameChange} />
        </EntryText>
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
  removeCommand,
  nameCommand
};

export default connect(mapStateToProps, mapDispatchToProps)(CommandListItem);
