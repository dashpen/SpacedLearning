export class Problem {
    constructor(id, problemText, answerText, isPrivate = true){
        this.id = id; // Unique identifier for the problem
        this.problemText = problemText; // The text of the problem
        this.answerText = answerText; // The text of the answer
        this.isPrivate = isPrivate; // Boolean indicating if the problem is private
    }
}