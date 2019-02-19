import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {setActiveCommand} from '../actions/activeCommand';
import {moveCommandUp, moveCommandDown, removeCommand, nameCommand, copyCommand, changeCommandType} from '../actions/commands';

import {hex} from '../utils/colors';

const typeToEmoji = {
  'LINE': '✒️',
  'POLYGON': '⭐'
};

const ListEntry = styled.div`
  width: 100%;
  border-bottom: 2px outset;
  padding: 10px;
  background-color: ${props => props.active ? 'darkgray' : 'white'}
  display: flex;
  justify-content: flex-end;
`;

const EntryCtrls = styled.div`
  display: flex;
  height: 100%;
  width: 3em;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-right: 5px;
`;

const EntryText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
  flex: 1;
  height: 50%;
`;

const CommandEdits = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  margin: 5px;
`;

const EntrySwatch = styled.div`
  width: 1em;
  height: 1em;
  display: inline-block;
  background-color: ${props => props.color};
  border: 2px inset;
`;

const EntrySwatches = styled.div`
  width: 3em;
  height: 3em;
  margin: 5px;
`;

class CommandListItem extends Component {
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.remove = this.remove.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.copy = this.copy.bind(this);
    this.change = this.change.bind(this);
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

  copy(evt) {
    evt.stopPropagation();
    this.props.copyCommand(this.props.item);
  }

  change(evt) {
    evt.stopPropagation();
    this.props.changeCommandType(this.props.item.id);
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
        <div>
          <EntryText>
            <span role="img" aria-label={item.type}>{typeToEmoji[item.type]}</span>
            <input type="text" value={item.name} onChange={this.handleNameChange} />
          </EntryText>
          <CommandEdits>
            <button onClick={this.copy} title="copy command">
              <span role="img" aria-label="copy command">✂️</span>
            </button>
            <button onClick={this.change} title="change command type">
              <span role="img" aria-label="change command type">♻️</span>
            </button>
            <button onClick={this.remove} title="remove command">
              <span role="img" aria-label="remove command">🗑️</span>
            </button>
          </CommandEdits>
        </div>
        
        <EntrySwatches>
          <EntrySwatch color={hex[item.colors[0]]}></EntrySwatch>
          <EntrySwatch color={hex[item.colors[1]]}></EntrySwatch>
        </EntrySwatches>
        <EntryCtrls>
          <button onClick={this.moveUp} title="move command up">
            <span role="img" aria-label="move command up">🔼</span>
          </button>
          <button onClick={this.moveDown} title="move command down">
            <span role="img" aria-label="move command down">🔽</span>
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
  nameCommand,
  copyCommand,
  changeCommandType
};

export default connect(mapStateToProps, mapDispatchToProps)(CommandListItem);
