import React from 'react';
import './styles/App.scss';
import HostSelector from './components/host-selector';
import Game from './game';
import api from './utilities/api';

type AppState = {
  hasStarted : boolean,
  isHosting : boolean,
  gameCode : string | null
}

class App extends React.Component<{}, AppState> {
  constructor(props : any) {
    super(props);
    this.state = {
      hasStarted: false,
      isHosting: false,
      gameCode: null
    };
  }

  startSession = async (code : string) : Promise<void> => {
    await api.startSession(code);
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
            root@nerok.dog:~$ ./IT_Startup.sh
          </p>
        </header>
  
        <div className="game-container">
          {hasStarted && gameCode !== null ? <Game isHosting={isHosting} gameCode={gameCode} /> : <HostSelector sessionCallback={this.startSession} startCallback={this.startGame} />}
        </div>
      </div>
    );
  }
}

export default App;
