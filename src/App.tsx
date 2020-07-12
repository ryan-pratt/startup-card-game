import React from 'react';
import './styles/App.scss';
import HostSelector from './components/host-selector';

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

  setCode = (code : string, isHosting : boolean) : void => {
    // TODO: start server session
    this.setState({
      gameCode: code,
      isHosting: isHosting
    });
  }

  startGame = () : void => {
    this.setState({
      hasStarted: true
    });
  }

  render() : JSX.Element {
    return (
      <div className="app">
        <header className="app-header">
          <p>
            root@nerok.dog:~$ ./IT_Startup.sh
          </p>
        </header>
  
        <div className="game-container">
          <HostSelector codeCallback={this.setCode} startCallback={this.startGame} />
        </div>
      </div>
    );
  }
}

export default App;
