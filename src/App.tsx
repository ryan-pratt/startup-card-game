import React from 'react';
import io from 'socket.io-client';
import './styles/App.scss';
import HostSelector from './components/host-selector';
import Game from './game';

type AppState = {
  hasStarted : boolean,
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
      isHosting: false,
      gameCode: null
    };
  }

  startGame = (code : string, isHosting : boolean) : void => {
    this.setState({
      gameCode: code,
      isHosting: isHosting,
      hasStarted: true
    });
  }

  render() : JSX.Element {
    const { isHosting, hasStarted, gameCode } = this.state;
    return (
      <div className="app">
        <header className="app-header">
          <p>
            root@nerok.dog:~$ ./IT_Startup {gameCode && '-c ' + gameCode}
          </p>
        </header>
  
        <div className="game-container">
          {hasStarted && gameCode !== null ? <Game isHosting={isHosting} gameCode={gameCode} socket={this.socket} /> : <HostSelector startCallback={this.startGame} socket={this.socket} />}
        </div>
      </div>
    );
  }
}

export default App;
