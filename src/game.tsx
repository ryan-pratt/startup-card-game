import React from 'react';
import Deck from './objects/deck';
import DeckCard from './objects/deckCard';
import './styles/game.scss';

type GameProps = {
  isHosting : boolean
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
        <img src={card.image} alt={card.name} />
        <p>this is the game content</p>
        {this.props.isHosting ? <p>this user is hosting</p> : <p>this user is not hosting</p>}
      </div>
    );
  }
}

export default Game;
