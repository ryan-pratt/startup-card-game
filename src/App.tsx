import React from 'react';
import io from 'socket.io-client';
import api from './utilities/api';
import './styles/App.scss';
import HostSelector from './components/host-selector';
import Game from './game';

type AppState = {
  hasStarted : boolean,
  hasJoined : boolean,
  isHosting : boolean,
  gameCode : string | null
}

class App extends React.Component<{}, AppState> {
  socket : SocketIOClient.Socket = io.connect("http://localhost:5000", {
    reconnection: true
  });

  constructor(props : any) {
    super(props);
    this.state = {
      hasStarted: false,
      hasJoined: false,
      isHosting: false,
      gameCode: null
    };
  }

  componentDidMount() : void {
    this.socket.on('start-game', () : void => {
      this.setState({
        hasStarted: true
      });
    });
  }

  startGame = async (code : string, isHosting : boolean) : Promise<void> => {
    this.setState({
      gameCode: code,
      isHosting: isHosting,
      hasJoined: true
    });
    if (isHosting) {
      await api.startGame();
    }
  }

  _renderStartScreen = () : JSX.Element => {
    const { hasJoined, gameCode } = this.state;
    if (hasJoined && gameCode !== null) {
      return (<p>Waiting for the game to start...</p>);
    }
    else {
      return (<HostSelector startCallback={this.startGame} socket={this.socket} />);
    }
  }
  
  _renderGame = () : JSX.Element => {
    const { isHosting, gameCode } = this.state;
    return (<Game isHosting={isHosting} gameCode={gameCode as string} socket={this.socket} />);
  }

  render() : JSX.Element {
    const { hasStarted, gameCode } = this.state;
    return (
      <div className="app">
        <header className="app-header">
          <p>root@nerok.dog:~$ ./IT_Startup {gameCode && '-c ' + gameCode}</p>
        </header>
  
        <div className="game-container">
          {hasStarted ? this._renderGame() : this._renderStartScreen()}
        </div>
      </div>
    );
  }
}

export default App;
