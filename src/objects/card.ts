import RandomStuff from '../helpers/randomStuff';

const BURNOUT_LIMIT : number = 3;

type TickInfo = {
  projectPoints : number,
  isDead : boolean
}

enum CardType {
  Employee,
  Knowledge,
  Action
}

enum EmployeeType {
  Developer,
  HumanResources,
  AgileCoach
}

const infoLookup : [CardType, EmployeeType | null, number, number, number, string][] = [
  [CardType.Employee, EmployeeType.Developer, 2, 0, 2,      "Code Monkey \"Mike\""],      // 0
  [CardType.Employee, EmployeeType.Developer, 1, 0, 0,      "Ambitious Apprentice"],
  [CardType.Employee, EmployeeType.Developer, 5, 0, 4,      "The Assertive CTO"],
  [CardType.Employee, EmployeeType.Developer, 1, 0, 2,      "Copy Paste Developer"],
  [CardType.Employee, EmployeeType.Developer, 3, 2, 1,      "Downer Dave"],
  [CardType.Employee, EmployeeType.Developer, 4, 1, 2,      "Database Developer"],        // 5
  [CardType.Employee, EmployeeType.Developer, 3, 1, 2,      "BI Developer"],
  [CardType.Employee, EmployeeType.Developer, 4, 0, 3,      "Full Stack Ninja"],
  [CardType.Employee, EmployeeType.Developer, 3, 0, 2,      "QA Wizard Engineer"],
  [CardType.Employee, EmployeeType.Developer, 4, 0, 2,      "Senior Backend Developer"],
  [CardType.Employee, EmployeeType.Developer, 2, 0, 1,      "Junior Backend Developer"],  // 10
  [CardType.Employee, EmployeeType.Developer, 2, 0, 2,      "Research Engineer"],
  [CardType.Employee, EmployeeType.Developer, 5, 0, 5,      "Lead Developer"],
  [CardType.Employee, EmployeeType.Developer, 1, 0, 1,      "Intern"],
  [CardType.Employee, EmployeeType.Developer, 2, 0, 1,      "Shy Frontend Developer"],
  [CardType.Employee, EmployeeType.HumanResources, 3, 0, 0, "Office Manager"],            // 15
  [CardType.Employee, EmployeeType.HumanResources, 3, 0, 0, "Rockstar Recruiter"],
  [CardType.Employee, EmployeeType.HumanResources, 3, 0, 0, "Undercover HR Agent"],
  [CardType.Employee, EmployeeType.HumanResources, 2, 1, 0, "The Nice HR Lady"],
  [CardType.Employee, EmployeeType.HumanResources, 2, 1, 0, "The Nice HR Guy"],
  [CardType.Employee, EmployeeType.AgileCoach, 4, 1, 1,     "Scrum Master"],              // 20
  [CardType.Knowledge, null, 1, 0, 2,                       "Clean code"],
  [CardType.Knowledge, null, 2, 0, 3,                       "Design patterns"],
  [CardType.Knowledge, null, 1, 0, 2,                       "Defensive programming"],
  [CardType.Knowledge, null, 1, 0, 2,                       "Polymorphism"],
  [CardType.Knowledge, null, 4, 0, 5,                       "Test driven development"],   // 25
  [CardType.Knowledge, null, 3, 0, 4,                       "Unit tests"],
  [CardType.Knowledge, null, 2, 0, 3,                       "SOLID"],
  [CardType.Knowledge, null, 1, 0, 2,                       "Version control"],
  [CardType.Knowledge, null, 3, 0, 4,                       "Domain knowledge"],
  [CardType.Knowledge, null, 2, 0, 3,                       "Dependency injection"],      // 30
  [CardType.Knowledge, null, 2, 0, 3,                       "Debugging"],
  [CardType.Knowledge, null, 3, 0, 4,                       "Continuous integration"],
  [CardType.Action, null, 2, 0, 0,                          "Outsourcing"],
  [CardType.Action, null, -2, 0, 0,                         "Investor"], // might need to change -2 to 0 and add a rule
  [CardType.Action, null, 5, 0, 0,                          "Head Hunter"],               // 35
  [CardType.Action, null, 2, 0, 0,                          "Coffee machine"],
  [CardType.Action, null, 3, 0, 0,                          "Get away from it all"],
  [CardType.Action, null, 2, 0, 0,                          "Crunch time"],
  [CardType.Action, null, 4, 0, 0,                          "Technical debt"],
  [CardType.Action, null, 3, 0, 0,                          "Monster Bug"],               // 40
];

const padLeft = (num : number, digits : number) : string => {
  let str : string = `${num}`;
  while (str.length < digits) {
    str = `0${str}`;
  }
  return str;
}

class Card {
  instanceId : string;
  cardId : number;
  type : CardType;
  employeeType : EmployeeType | null;
  cost : number;
  burnout : number;
  efficiency : number;
  name : string;
  image : string;
  isFaceUp : boolean;
  isPlanned : boolean;

  constructor(cardId : number) {
    let cardInfo = infoLookup[cardId];

    this.instanceId = RandomStuff.getString(28);
    this.cardId = cardId;
    this.type = cardInfo[0];
    this.employeeType = this.type === CardType.Employee ? cardInfo[1] : null;
    this.cost = cardInfo[2];
    this.burnout = 0 - cardInfo[3];
    this.efficiency = cardInfo[4];
    this.name = cardInfo[5];
    this.image = `/img/cards/${padLeft(this.cardId, 2)}.png`;

    this.isFaceUp = true;
    this.isPlanned = false;
  }

  tick = () : TickInfo => {
    if (this.isPlanned) this.cost = Math.max(0, this.cost - 1); // planned cards cost 1 less per turn until played

    this.burnout++;
    return {
      projectPoints: this.efficiency,
      isDead: this.burnout >= BURNOUT_LIMIT
    };
  }

  plan = () : void => {
    if (this.type === CardType.Action) {
      this.isFaceUp = false;
      this.isPlanned = true;
    }
  }

  play = () : void => {
    this.isFaceUp = true;
    this.isPlanned = false;
  }
}

export default Card;
