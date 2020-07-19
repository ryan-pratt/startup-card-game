import React from 'react';
import '../styles/host-selector.scss';

type HostSelectorProps = {
  sessionCallback : Function,
  startCallback : Function
}

type HostSelectorState = {
  code : string | null,
  showHostModal : boolean,
  showGuestModal : boolean
}

class HostSelector extends React.Component<HostSelectorProps, HostSelectorState> {
  constructor(props : HostSelectorProps) {
    super(props);
    this.state = {
      showHostModal: false,
      showGuestModal: false,
      code: null
    };
  }

  startGame = () : void => {
    const { startCallback } = this.props;
    const { showHostModal, code } = this.state;
    startCallback(code, showHostModal);
  }

  openHostModal = async () : Promise<void> => {
    const { sessionCallback } = this.props;
    const code = Math.random().toString(36).substring(2,6);
    this.setState({
      code: code,
      showHostModal: true
    });
    await sessionCallback(code, true);
  }
  
  openGuestModal = () : void => {
    this.setState({
      showGuestModal: true
    });
  }

  updateCode = (event : any) : void => {
    this.setState({
      code: event.target.value.toLowerCase().substring(0, 4)
    });
  }

  _renderButtons = () : JSX.Element => {
    return (
      <div className="button-container">
        <div className="button" onClick={async () => await this.openHostModal()}>
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

  _renderCodeInput = () : JSX.Element => {
    const { code } = this.state;
    return (
      <div>
        <label>Enter the game code:</label>
        <input type="text" value={code || ""} onChange={this.updateCode} />
      </div>
    );
  }
  
  render() : JSX.Element {
    const { showHostModal, showGuestModal, code } = this.state;
    const modalOpen = showHostModal || showGuestModal;

    return (
      <div className="host-selector-screen">
        {this._renderButtons()}
        {modalOpen && 
          <div className="modal">
            {showHostModal ? <p>Code: {code}</p> : this._renderCodeInput()}
            <div className="button-container">
              <div className="button" onClick={() => this.startGame()}> {/* TODO: disable when code hasn't been entered */}
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
