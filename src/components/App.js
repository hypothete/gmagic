import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Canvas from './Canvas';
import CommandList from './CommandList';
import ToolsPalette from './ToolsPalette';

const Row = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0;
`;

const Wrap = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  flex-direction: column;
`;

class App extends Component {
  render() {
    return (
      <Wrap>
        <Row>
          <Canvas></Canvas>
          <CommandList></CommandList>
        </Row>
        <ToolsPalette></ToolsPalette>
      </Wrap>
    );
  }
}

const mapStateToProps = state => {
  return {};
}

export default connect(mapStateToProps)(App);
