import {
//   Card,
  createEmptyCard,
  generatorParameters,
//   FSRSParameters,
  FSRS,
  Rating,
//   RecordLog,
} from "ts-fsrs";

export class Card {
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
        this.FSRSCard = newCard;
        return this.FSRSCard;
    }

    getDueDate() {
        return this.FSRSCard.due;
    }
}