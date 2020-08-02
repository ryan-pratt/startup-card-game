import React from 'react';
import RandomStuff from '../helpers/randomStuff';
import api from '../utilities/api';
import '../styles/host-selector.scss';

type HostSelectorProps = {
  socket : SocketIOClient.Socket,
  startCallback : Function
}

type HostSelectorState = {
  playerCount : number,
  code : string | null,
  showHostModal : boolean,
  showGuestModal : boolean
}

class HostSelector extends React.Component<HostSelectorProps, HostSelectorState> {
  constructor(props : HostSelectorProps) {
    super(props);
    this.state = {
      playerCount: 0,
      showHostModal: false,
      showGuestModal: false,
      code: null
    };
  }

  startGame = async () : Promise<void> => {
    const { startCallback } = this.props;
    const { showHostModal, code } = this.state;
    if (code !== null) {
      if (!showHostModal) {
        const playerId : string | null = await api.joinSession(code).catch((reason : any) => {
          alert(reason.response.data);
          return null;
        });
        if (playerId !== null) {
          this.joinRoom(playerId);
        }
        else {
          return; // don't call startCallback
        }
      }
      await startCallback(code, showHostModal);
    }
    else {
      alert('An error occurred starting the game. Idk how you even got here (pending a TODO on this component)');
    }
  }

  joinRoom = (playerId : string) : void => {
    this.props.socket.emit('join', {room: this.state.code});
    this.props.socket.emit('join', {room: `${this.state.code}-${playerId}`});
  }

  updatePlayerCount = (event : any) : void => {
    this.setState({
      playerCount: parseInt(event.playerCount)
    })
  }

  openHostModal = async () : Promise<void> => {
    const code = RandomStuff.getString(4);

    this.setState({
      code: code,
      showHostModal: true
    });
    await api.startSession(code);
    
    this.joinRoom('host');
    this.props.socket.on('player-join', this.updatePlayerCount);
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

  _renderCodeOutput = () : JSX.Element =>{
    const { code, playerCount } = this.state;
    return (
      <div>
        <p>Code: {code}</p>
        <p>{playerCount} {playerCount === 1 ? 'person has' : 'people have'} joined your game.</p>
      </div>
    );
  }
  
  render() : JSX.Element {
    const { showHostModal, showGuestModal } = this.state;
    const modalOpen = showHostModal || showGuestModal;

    return (
      <div className="host-selector-screen">
        {this._renderButtons()}
        {modalOpen && 
          <div className="modal">
            {showHostModal ? this._renderCodeOutput() : this._renderCodeInput()}
            <div className="button-container">
              <div className="button" onClick={async () => await this.startGame()}> {/* TODO: disable when code hasn't been entered or no players have joined */}
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
