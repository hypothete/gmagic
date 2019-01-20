import React, { Component } from 'react';
import { connect } from 'react-redux';

import {addCommand} from '../../actions/commands';

class App extends Component {
  render() {
    const {commands, addCommand} = this.props;
    return (
      <div>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <ul>
            {
              commands.map(cmd => (<li key={cmd.id}>{cmd.id}</li>))
            }
          </ul>
          <button onClick={() => { addCommand({})}}>Add</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    commands: state.commands
  };
}

export default connect(mapStateToProps, {addCommand})(App);
