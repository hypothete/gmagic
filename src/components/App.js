import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {addCommand} from '../actions/commands';

import Canvas from './Canvas';
import CommandList from './CommandList';

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  margin-bottom: 10px;
`;

class App extends Component {
  render() {
    const {addCommand} = this.props;
    return (
      <Fragment>
        <Row>
          <Canvas></Canvas>
          <CommandList></CommandList>
        </Row>
        <Row>
          <button onClick={() => { addCommand({})}}>Add</button>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
}

export default connect(mapStateToProps, {addCommand})(App);
