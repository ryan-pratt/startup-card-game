import React from 'react';
import api from './utilities/api';
// import Deck from './helpers/deck';
// import Card from './objects/card';
import MulliganHand from './components/mulliganHand';
import './styles/game.scss';

type GameProps = {
  socket : SocketIOClient.Socket,
  isHosting : boolean,
  gameCode : string
}

type GameState = {
  showMulliganHand : boolean
}

class Game extends React.Component<GameProps, GameState> {
  constructor(props : GameProps) {
    super(props);
    this.state = {
      showMulliganHand: false
    };
  }

  componentDidMount() : void {
    api.getTurnNumber().then((turnNumber : number) => {
      if (turnNumber === 0) {
        this.setState({
          showMulliganHand: true
        });
      }
    });
  }

  finishedMulligan = () : void => {
    // TODO: add end turn logic
    this.setState({
      showMulliganHand: false
    });
  }
  
  render() : JSX.Element {
    if (this.state.showMulliganHand) return (<MulliganHand readyCallback={this.finishedMulligan} />);
    return (
      <div className="game">
        <p>this is the game content</p>
        {this.props.isHosting ? <p>this user is hosting</p> : <p>this user is not hosting</p>}
      </div>
    );
  }
}

export default Game;
