import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

class Export extends Component {}

const mapStateToProps = state => {
  return {
    commands: state.commands
  };
}

export default connect(mapStateToProps)(Export);
