export class Set {
    constructor(id, subject, title, description = "", cards = [], isPrivate = true) {
        this.id = id; // Unique identifier for the set
        this.subject = subject; // Subject of the set
        this.title = title; // Title of the set
        this.description = description; // Description of the set
        this.cards = cards; // Array of Card objects in the set
        this.isPrivate = isPrivate; // Boolean indicating if the set is private
    }
    addCard(card) {
        this.cards.push(card); // Add a Card object to the set
    }
    removeCard(cardId) {
        this.cards = this.cards.filter(card => card.id !== cardId); // Remove a Card object by its ID
    }
    getCard(cardId) {
        return this.cards.find(card => card.id === cardId); // Get a Card object by its ID
    }
    getAllCards() {
        return this.cards; // Get all Card objects in the set
    }
    getDueCards() {
        return this.cards.filter(card => card.getDueDate() <= new Date()); // Get all cards that are due
    }
}