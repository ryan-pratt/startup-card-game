import React from 'react';
import '../styles/host-selector.scss';

type HostSelectorProps = {
  codeCallback : Function,
  startCallback : Function
}

type HostSelectorState = {
  showHostModal : boolean,
  showGuestModal : boolean
}

class HostSelector extends React.Component<HostSelectorProps, HostSelectorState> {
  constructor(props : HostSelectorProps) {
    super(props);
    this.state = {
      showHostModal: false,
      showGuestModal: false
    };
  }

  startGame = () : void => {
    const {startCallback} = this.props;
    // TODO: if not hosting, get code input and call codeCallback
    startCallback();
  }

  openHostModal = () : void => {
    // TODO: generate code, call codeCallback
    this.setState({
      showHostModal: true
    });
  }
  
  openGuestModal = () : void => {
    this.setState({
      showGuestModal: true
    });
  }

  _renderButtons = () : JSX.Element => {
    return (
      <div className="button-container">
        <div className="button" onClick={() => this.openHostModal()}>
          <h3>Click here to host a game</h3>
          <p>You will be given a code to share with the other people so they can join your game.</p>
        </div>
        <div className="button" onClick={() => this.openGuestModal()}>
          <h3>Click here to join a game</h3>
          <p>You will enter a code to join someone else's game.</p>
        </div>
      </div>
    );
  }
  
  render() : JSX.Element {
    const {showHostModal, showGuestModal} = this.state;
    const modalOpen = showHostModal || showGuestModal;

    return (
      <div className="host-selector-screen">
        {this._renderButtons()}
        {modalOpen && 
          <div className="modal">
            <p>TODO</p>
            <div className="button-container">
              <div className="button" onClick={() => this.startGame()}>
                <p>Start</p>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default HostSelector;
