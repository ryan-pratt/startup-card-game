import React from 'react';
import './styles/game.scss';

type GameProps = {
  isHosting : boolean
}

type GameState = {
  
}

class Game extends React.Component<GameProps, GameState> {
  constructor(props : GameProps) {
    super(props);
    this.state = {

    };
  }
  
  render() : JSX.Element {
    return (
      <div className="game">
        <p>this is the game content</p>
        {this.props.isHosting ? <p>this user is hosting</p> : <p>this user is not hosting</p>}
      </div>
    );
  }
}

export default Game;
