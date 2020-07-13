import DeckCard from './deckCard';

const buildDeck = () : DeckCard[] => {
  const multiples : number[] = [ // how many of each card (with id of the index in this array) appear in the deck
    2,  // code monkey mike         (0)
    2,  // ambitious apprentice
    1,  // assertive cto
    2,  // copy paste dev
    2,  // downer dave
    2,  // database dev             (5)
    2,  // BI dev
    2,  // full stack ninja
    2,  // QA wizard
    2,  // senior backend dev
    2,  // junior backend dev       (10)
    2,  // research engineer
    2,  // lead dev
    2,  // intern
    1,  // shy frontend dev
    2,  // office manager           (15)
    2,  // rockstar recruiter
    2,  // undercover HR agent
    1,  // nice HR lady
    1,  // nice HR guy
    2,  // scrum master             (20)
    1,  // clean code
    1,  // design patterns
    1,  // defensive programming
    1,  // polymorphism
    1,  // TDD                      (25)
    1,  // unit tests
    1,  // SOLID
    1,  // version control
    1,  // domain knowledge
    1,  // dependency injection     (30)
    1,  // debugging
    1,  // CI
    2,  // outsourcing
    4,  // investor (might need to change -2 to 0 and add a rule) 
    1,  // head hunter              (35)
    1,  // coffee machine
    2,  // get away from it all
    1,  // crunch time
    1,  // technical debt
    2   // monster bug              (40)
  ];
  let cards : DeckCard[] = [];
  multiples.forEach((num, cardId) => {
    for (let i : number = 0; i < num; i++) {
      cards.push(new DeckCard(cardId));
    }
  });
  return cards;
}

class Deck {
  cards : DeckCard[];
  discarded : DeckCard[];

  constructor() {
    // TODO: build larger decks for more players
    this.discarded = [];
    this.cards = buildDeck();
    this.shuffle();
  }

  shuffle = () : void => {
    for (let i : number = 0; i < this.cards.length; i++) {
      const j : number = Math.floor(Math.random() * i);
      const temp : DeckCard = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  draw = () : DeckCard => {
    // TODO: handle case where cards and discarded are both empty
    if (this.cards.length === 0) {
      this.cards = this.discarded;
      this.discarded = [];
      this.shuffle();
    }
    return this.cards.pop() as DeckCard;
  }
}

export default Deck;
