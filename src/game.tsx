import React from 'react';
import api from './utilities/api';
import Deck from './helpers/deck';
// import Card from './objects/card';
import CardRenderer from './components/cardRenderer';
import Card from './objects/card';
import './styles/game.scss';

type GameProps = {
  socket : SocketIOClient.Socket,
  isHosting : boolean,
  gameCode : string
}

type GameState = {
  renderOverride : JSX.Element | null
}

class Game extends React.Component<GameProps, GameState> {
  constructor(props : GameProps) {
    super(props);
    this.state = {
      renderOverride: null
    };
  }

  selectCard = () : void => {

  }

  initializeGame = async () : Promise<void> => {
    const cards = await Deck.drawMany(5);
    const renderedCards = cards.map((card : Card, index : number) => {
      return (<CardRenderer card={card} key={card.instanceId} />);
    });

    this.setState({
      renderOverride: (
        <div className="mulligan">
          <h3>This is your starting hand.</h3>
          <p>It's a mulligan hand, so you can select any cards you don't want. Those will be discarded and you'll draw new cards to replace them.</p>
          <div className="hand">
            {renderedCards}
          </div>
        </div>
      )
    });
  }

  componentDidMount() : void {
    api.getTurnNumber().then((turnNumber : number) => {
      if (turnNumber === 0) {
        this.initializeGame();
      }
    });
  }
  
  render() : JSX.Element {
    const { renderOverride } = this.state;
    return renderOverride || (
      <div className="game">
        <p>this is the game content</p>
        {this.props.isHosting ? <p>this user is hosting</p> : <p>this user is not hosting</p>}
      </div>
    );
  }
}

export default Game;
