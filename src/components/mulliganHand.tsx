import React from 'react';
import Card from '../objects/card';
import Deck from '../helpers/deck';
import api from '../utilities/api';
import CardRenderer from './cardRenderer';
import ArrayFunctions from '../utilities/arrayFunctions';

type MulliganHandProps = {
  readyCallback : Function
}

type MulliganHandState = {
  allCards : Card[],
  selectedCards : string[]
}

class MulliganHand extends React.Component<MulliganHandProps, MulliganHandState> {
  constructor(props : MulliganHandProps) {
    super(props);
    this.state = {
      allCards: [],
      selectedCards: []
    };
  }

  async componentDidMount() : Promise<void> {
    const cards = await Deck.drawMany(5);
    this.setState({
      allCards: cards,
    });
  }

  selectCard = (instanceId : string) : void => {
    const { selectedCards } = this.state;
    const index = selectedCards.indexOf(instanceId);
    if (index === -1) {
      selectedCards.push(instanceId);
    }
    else {
      selectedCards.splice(index, 1);
    }
    this.setState({
      selectedCards: selectedCards // trigger a re-render
    });
  }

  commit = async () : Promise<void> => {
    const { allCards, selectedCards } = this.state;
    const [selected, remaining] = ArrayFunctions.partition(allCards, (card : Card) => selectedCards.includes(card.instanceId));
    for (const card of selected) {
      await Deck.discard(card);
    }
    const newCards = await Deck.drawMany(selected.length);
    const hand = remaining.concat(newCards);
    await api.commitHand(hand.map(card => card.cardId));
    this.props.readyCallback();
  }

  render() : JSX.Element {
    const { allCards, selectedCards } = this.state;
    const renderedCards = allCards.map((card : Card) => {
      const selected = selectedCards.includes(card.instanceId);
      return (<CardRenderer card={card} key={card.instanceId} onClick={this.selectCard} selected={selected} />);
    });

    return (
        <div className="mulligan">
        <h3>This is your starting hand.</h3>
        <p>It's a mulligan hand, so you can select any cards you don't want. Those will be discarded and you'll draw new cards to replace them.</p>
        <div className="hand">
          {renderedCards}
        </div>
        <div className="button-container">
          <div className="button" onClick={async () => await this.commit()}>
            <h3>Continue</h3>
            <p>Discard any selected cards</p>
          </div>
        </div>
      </div>
    );
  }
}

export default MulliganHand;