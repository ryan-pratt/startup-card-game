import React from 'react';
import Card from '../objects/card';
import '../styles/card-renderer.scss';

type CardRendererProps = {
  card : Card,
  onClick : Function,
  selected : Boolean
}

class CardRenderer extends React.Component<CardRendererProps, {}> {
  _renderCardFace = () : JSX.Element => {
    const { card } = this.props;
    return (
      <img src={card.image} alt={card.name} />
    );
  }

  render() : JSX.Element {
    const { card, onClick, selected } = this.props;
    let className = "card-renderer"
    if (selected) className += " selected";
    return (
      <div className={className} onClick={() : void => onClick(card.instanceId)}>
        {card.isFaceUp ? this._renderCardFace() : <p>this card is face down</p>}
      </div>
    );
  }
}

export default CardRenderer;