import {
//   Card,
  createEmptyCard,
  generatorParameters,
//   FSRSParameters,
  FSRS,
  Rating,
//   RecordLog,
} from 'https://cdn.jsdelivr.net/npm/ts-fsrs@latest/+esm';

// export interface Card {

// } // yeah i'm going to switch files to typescript later

export class OneSidedCard {
      constructor(id, subject, title, question, answer, children, isPrivate = true, FSRSCard = createEmptyCard()) {
        this.id = id;
        this.subject = subject;
        this.title = title;
        this.question = question;
        this.answer = answer;
        this.children = children; // Array of Card objects
        this.FSRSCard = FSRSCard; // FSRS Card object
        this.isPrivate = isPrivate; // Boolean indicating if the card is private
    }

    stepCard(rating) {
        // rating can be : [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy]
        let card = this.FSRSCard;
        const f = new FSRS(generatorParameters());
        let scheduling_cards = f.repeat(card, new Date());
        const newCard = scheduling_cards[rating].card
        return newCard;
    }
    
    updateCard(card) { this.FSRSCard = card; }

    getDueDate() {
        return this.FSRSCard.due;
    }
}

export class ManySidedCard {
    constructor(id, subject, title, description, problems, children, isPrivate = true, FSRSCard = createEmptyCard()) {
        this.id = id;
        this.subject = subject;
        this.title = title;
        this.description = description;
        this.problems = problems; // Array of Problem objects
        this.children = children; // Array of Card objects
        this.FSRSCard = FSRSCard; // FSRS Card object
        this.isPrivate = isPrivate; // Boolean indicating if the card is private
    }

    stepCard(rating) {
        // rating can be : [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy]
        let card = this.FSRSCard;
        const f = new FSRS(generatorParameters());
        let scheduling_cards = f.repeat(card, new Date());
        const newCard = scheduling_cards[rating].card
        return newCard;
    }

    updateCard(card) { this.FSRSCard = card; }

    getDueDate() {
        return this.FSRSCard.due;
    }
}

export class Card{
    constructor(id, subject, title, description, answer, problems, children, isPrivate = true, FSRSCard = createEmptyCard()) {
        this.id = id;
        this.subject = subject;
        this.title = title;
        this.description = description;
        this.answer = answer;
        this.problems = problems; // Array of Problem objects
        this.children = children; // Array of Card objects
        this.FSRSCard = FSRSCard; // FSRS Card object
        this.isPrivate = isPrivate; // Boolean indicating if the card is private
    }

    stepCard(rating) {
        // rating can be : [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy]
        let card = this.FSRSCard;
        const f = new FSRS(generatorParameters());
        let scheduling_cards = f.repeat(card, new Date());
        const newCard = scheduling_cards[rating].card
        return newCard;
    }

    updateCard(card) { this.FSRSCard = card; }

    getDueDate() {
        return this.FSRSCard.due;
    }
}