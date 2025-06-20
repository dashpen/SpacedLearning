import { OneSidedCard, ManySidedCard } from './card.js';
import { Problem } from './problem.js';
// import { Rating } from 'https://cdn.jsdelivr.net/npm/ts-fsrs@latest/+esm';
import {v4 as uuidv4} from 'https://cdn.jsdelivr.net/npm/uuid@11.1.0/dist/esm-browser/index.js';
const subjectContainer = document.getElementById("createSubjectContainer")
const showSubjectButton = document.getElementById("showSubjectButton")

showSubjectButton.addEventListener("click", () => { subjectContainer.classList.toggle("d-none") })

subjectContainer.onsubmit = (e) => {
    e.preventDefault()

    let data = {}
    const loggedIn = sessionStorage.getItem("loggedIn") === "true"
    if(loggedIn) {
        data = sessionStorage.getItem("data")
    } else {
        data = localStorage.getItem("data")
    }

    const newSubjectName = document.getElementById("subjectName").value

    const subjectData = {cards: []}

    if(!data){
        data = {
            subjects: [newSubjectName],
            cards: [],
        }
    } else {
        data = JSON.parse(data)
        if(!data.subjects.includes(newSubjectName)) {
            data.subjects.push(newSubjectName)
        } else {
            alert("Subject already exists!")
        }
    }

    data = JSON.stringify(data)

    if(loggedIn) {
        sessionStorage.setItem("data", data)
    } else {
        localStorage.setItem("data", data)
    }

    subjectContainer.classList.add("d-none")
    subjectContainer.querySelector("form").reset() // reset the form
    populateSubjects() // Refresh the subject list
}

function populateSubjects() {
    const loggedIn = sessionStorage.getItem("loggedIn") === "true"
    const rawData = loggedIn ? sessionStorage.getItem("data") : localStorage.getItem("data")
    let data = JSON.parse(rawData || '{}')
    if (!data.subjects) {
       return; // No subjects to populate
    }
    const subjectSelector = document.getElementById("subject")
    subjectSelector.querySelectorAll(".custom-option").forEach(option => option.remove()) // Clear existing options
    for (const subject of data.subjects){
        const option = document.createElement("option")
        option.value = subject
        option.textContent = subject
        option.classList.add("custom-option")
        subjectSelector.appendChild(option)
    }
}

populateSubjects() // Initial population of subjects


function selectContainersCallback(event) {
    event.preventDefault();
    const value = event.target.value;

    if (value === "answer") {
        document.getElementById("answerContainer").classList.remove("d-none")
        document.getElementById("problemSetContainer").classList.add("d-none")
        toggleBackInputs(false)

    } else if (value === "problem-set") {
        document.getElementById("problemSetContainer").classList.remove("d-none")
        document.getElementById("answerContainer").classList.add("d-none")
        toggleBackInputs(true)
    }
}

function toggleBackInputs(makeAnswerInvisible = false) {
    document.getElementById("problemSetAnswer").disabled = makeAnswerInvisible

    document.getElementById("problemSetContainer").querySelectorAll(".problem").forEach((problemElement) => {
        const elements = problemElement.querySelectorAll("textarea");
        const problemText = elements[0];
        const answerText = elements[1];
        problemText.disabled = !makeAnswerInvisible;
        answerText.disabled = !makeAnswerInvisible;
    });
}

const backType = document.getElementById("backType");
backType.addEventListener("change", selectContainersCallback);

const problemSetContainer = document.getElementById("problemSetContainer");
const addProblemButton = document.getElementById("addProblem");
addProblemButton.addEventListener("click", () => {
    const numProblems = problemSetContainer.children.length - 2;
    const problemTemplate = document.getElementById("problem0");
    const newProblem = problemTemplate.cloneNode(true);
    newProblem.id = `problem${numProblems + 1}`;
    const newProblemProblemLabel = newProblem.children[0].children[0]
    const newProblemProblemInput = newProblem.children[0].children[1]
    const newProblemAnswerLabel = newProblem.children[1].children[0]
    const newProblemAnswerInput = newProblem.children[1].children[1]

    // newProblem.removeChild(newProblem.children[2]); // Remove the template's delete button

    const elementDeleter = document.createElement("div");
    elementDeleter.classList.add("col-md-1", "d-flex", "justify-content-center", "align-items-center");
    const removeButton = document.createElement("button");


    newProblemProblemLabel.for = `problemSetProblem${numProblems + 1}`;
    newProblemProblemInput.name = `problemSetProblem${numProblems + 1}`;
    newProblemProblemInput.value = "";
    newProblemProblemInput.removeAttribute("style")

    newProblemAnswerLabel.for = `problemSetAnswer${numProblems + 1}`;
    newProblemAnswerInput.name = `problemSetAnswer${numProblems + 1}`;
    newProblemAnswerInput.value = "";
    newProblemAnswerInput.removeAttribute("style")

    removeButton.classList.add("btn", "btn-danger", "mt-4");
    elementDeleter.appendChild(removeButton);
    removeButton.innerText = "x";
    newProblem.appendChild(elementDeleter);
    removeButton.addEventListener("click", () => { newProblem.remove(); })
    removeButton.id = `removeProblem${numProblems + 1}`;
    removeButton.type= "button"; // Prevents form submission on click

    problemSetContainer.appendChild(newProblem);
    problemSetContainer.appendChild(document.getElementById("addProblemContainer"))
})

const form = document.getElementById("createCardForm");
form.onsubmit = (e) => {
    e.preventDefault();
    const subject = document.getElementById("subject").value;
    const title = document.getElementById("title").value;
    const front = document.getElementById("front").value;

    const cardType = backType.value;

    let newCard = null;

    if(cardType === "answer") {
        // Create a OneSidedCard
        console.log("answer card");
        const answer = document.getElementById("problemSetAnswer").value;
        newCard = new OneSidedCard(uuidv4(), subject, title, front, answer, []);
    } else if(cardType === "problem-set") {
        // Create a ManySidedCard
        const problemSetContainer = document.getElementById("problemSetContainer");
        newCard = new ManySidedCard(uuidv4(), subject, title, front, [], []);

        problemSetContainer.querySelectorAll(".problem").forEach((problemElement) => {
            const elements = problemElement.querySelectorAll("textarea");
            const problemText = elements[0];
            const answerText = elements[1];
            const problem = new Problem(uuidv4(), problemText, answerText);
            newCard.problems.push(problem);
        });
    }

    if (!newCard) {
        alert("Please select a card type and fill in the required fields.");
        return;
    }

    const loggedIn = sessionStorage.getItem("loggedIn") === "true";
    let data = loggedIn ? sessionStorage.getItem("data") : localStorage.getItem("data");
    data = JSON.parse(data || '{}');
    if (!data.cards) {
        data.cards = [];
    }
    data.cards.push(newCard);
    data = JSON.stringify(data);
    if (loggedIn) {
        sessionStorage.setItem("data", data);
    } else {
        localStorage.setItem("data", data);
    }

    alert("Card created successfully!");
    form.reset();

    // hide containers
    document.getElementById("answerContainer").classList.add("d-none")
    document.getElementById("problemSetContainer").classList.add("d-none")
}



// subjectElement = document.getElementById("subject")

// testing code

// import { Card } from './card.js'
// import { Rating } from 'https://cdn.jsdelivr.net/npm/ts-fsrs@latest/+esm';
// const myCard = new Card(1, "Math", "Algebra", "Solve for x in 2x + 3 = 7", "x = 2", [], [], true);
// console.log(myCard);
// myCard.stepCard(Rating.Good); // Example of stepping the card with a rating of 'Good'
// console.log(Rating)
// console.log(myCard.getDueDate()); // Get the due date of the card