import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {closeModal} from '../actions/modal';
import {setCommands} from '../actions/commands';

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalWindow = styled.div`
  background-color: #fff;
  box-shadow: 0px 10px 20px rgba(0,0,0,0.1);
  cursor: auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;

  p {
    margin: 0 10px 0 0;
  }
`;

const Body = styled.div`
  padding: 10px;
`;

const ExitButton = styled.div`
  cursor: pointer;
`;

class ExportModal extends Component {
  constructor(props) {
    super(props);
    this.exitModal = this.exitModal.bind(this);
    this.importFile = this.importFile.bind(this);
  }

  importFile(evt) {
    const reader = new FileReader();
    reader.onload = (loadevt) => {
      const data = JSON.parse(loadevt.target.result);
      this.props.setCommands(data);
      this.props.closeModal();
    };
    reader.readAsText(evt.target.files[0]);
  }

  calculatePattern(values) {
    let count = 0;
    values.forEach((v, id) => {
      let w = 0;
      if (v && id > 0) {
        w = Math.pow(2,15-id);
      }
      else if (v) {
        w -= 32768;
      }
      count += w;
    });
    return count;
  }

  compressToPico(cmds) {
    return cmds.map(cmd => {
      let str = '';
      if (cmd.type === 'POLYGON') {
        str += 'poly('
      }
      else if (cmd.type === 'LINE') {
        str += 'line('
      }
      let hexCol = (16 * cmd.colors[1] + cmd.colors[0]);
      const patternData = this.calculatePattern(cmd.pattern);
      str += `'${cmd.points.join(',')}', 0x${hexCol.toString(16)}, ${patternData})\n`;
      return str;
    });
  }

  exitModal(evt) {
    evt.stopPropagation();
    this.props.closeModal();
  }

  render() {
    const {commands, modalOpen} = this.props;
    if (!modalOpen) return null;

    const jsonBlob = new Blob([JSON.stringify(commands, null, 2)], { type: 'application/json' });
    const picoBlob = new Blob(this.compressToPico(commands), { type: 'text/plain' });
    const jsonUrl = window.URL.createObjectURL(jsonBlob);
    const picoUrl = window.URL.createObjectURL(picoBlob);

    return (
      <Overlay>
        <ModalWindow>
          <Header>
            <p>
              Import and export data
            </p>
            <ExitButton onClick={this.exitModal}><span role="img" aria-label="exit modal button">❌</span></ExitButton>
          </Header>
          <Body>
            <p>
              Import JSON: <input type="file" onChange={this.importFile} /> 
            </p>
            <p>
              <a download="gmagic_drawing.json" href={jsonUrl}>Download JSON</a>
            </p>
            <p>
              <a download="gmagic_drawing.txt" href={picoUrl}>Download PICO-8 code</a>
            </p>
          </Body>
        </ModalWindow>
      </Overlay>
    );
  }
}

const mapStateToProps = state => {
  return {
    commands: state.commands,
    modalOpen: state.modalOpen
  };
}

export default connect(mapStateToProps, {closeModal, setCommands})(ExportModal);
