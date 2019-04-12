import React from 'react';
import { string, func } from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { changeConnectionMode } from '../../actions/connectionMode.actions';
import './MozartPollingStreamingDropdown.scss';

class MozartPollingStreamingDropdown extends React.Component {
  static defaultProps = {
    connectionMode: 'polling',
  };

  state = {
    isDropdownOpen: false,
  };

  toggle = () =>
    this.setState(state => ({
      isDropdownOpen: !state.isDropdownOpen,
    }));

  setFetchingMode = e => {
    // eslint-disable-next-line no-shadow
    const { changeConnectionMode } = this.props;
    const { value: connectionMode } = e.target;
    return changeConnectionMode(connectionMode);
  };

  renderFetchingModeText = () => {
    const { connectionMode, currentBreakpoint } = this.props;
    switch (connectionMode) {
      case 'polling':
        return currentBreakpoint === 'sm' ? 'P' : 'Polling';
      case 'streaming':
        return currentBreakpoint === 'sm' ? 'WS' : 'Streaming WS';
      default:
        return null;
    }
  };

  render() {
    const { isDropdownOpen } = this.state;
    return (
      <div className="MozartPollingStreamingDropdown">
        <ButtonDropdown isOpen={isDropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret size="md" color="dark">
            <FontAwesomeIcon icon="sync-alt" />
            <span className="mx-2">{this.renderFetchingModeText()}</span>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem value="polling" onClick={this.setFetchingMode}>
              Polling
            </DropdownItem>
            <DropdownItem value="streaming" onClick={this.setFetchingMode}>
              Streaming
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}

MozartPollingStreamingDropdown.propTypes = {
  changeConnectionMode: func,
  currentBreakpoint: string,
  connectionMode: string,
};

const mapStateToProps = ({ global = {} }) => ({
  connectionMode: global.connectionMode,
});

export default connect(
  mapStateToProps,
  { changeConnectionMode }
)(MozartPollingStreamingDropdown);
