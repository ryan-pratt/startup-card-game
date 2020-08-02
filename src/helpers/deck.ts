import api from '../utilities/api';
import Card from '../objects/card';

class Deck {
  static draw = async () : Promise<Card> => {
    var cardId = await api.drawCard();
    return new Card(cardId);
  }
  static drawMany = async (n : number) : Promise<Card[]> => {
    const cards : Card[] = [];
    for (let i = 0; i < n; i++) {
      const card = await Deck.draw();
      cards.push(card);
    }
    return cards;
  }
}

export default Deck;