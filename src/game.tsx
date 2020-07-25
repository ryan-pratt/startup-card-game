import React from 'react';
import api from './utilities/api';
import Deck from './objects/deck';
import DeckCard from './objects/deckCard';
import './styles/game.scss';

type GameProps = {
  socket : SocketIOClient.Socket,
  isHosting : boolean,
  gameCode : string
}

type GameState = {
  deck : Deck
}

class Game extends React.Component<GameProps, GameState> {
  constructor(props : GameProps) {
    super(props);
    this.state = {
      deck: new Deck()
    };
  }
  
  render() : JSX.Element {
    const card : DeckCard = this.state.deck.draw();

    return (
      <div className="game">
        <img src={card.image} alt={card.name} onClick={async () => await api.endTurn() } />
        <p>this is the game content</p>
        {this.props.isHosting ? <p>this user is hosting</p> : <p>this user is not hosting</p>}
        <p>the game code is: {this.props.gameCode}</p>
      </div>
    );
  }
}

export default Game;
