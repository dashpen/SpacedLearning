const subjectContainer = document.getElementById("createSubjectContainer")
const showSubjectButton = document.getElementById("showSubjectButton")

showSubjectButton.addEventListener("click", () => { subjectContainer.classList.toggle("d-none") })

subjectContainer.onsubmit = async (e) => {
    e.preventDefault()

    // const 

    let data = {}
    const loggedIn = sessionStorage.getItem("loggedIn") === "true"
    if(loggedIn) {
        data = sessionStorage.getItem("data")
    } else {
        data = localStorage.getItem("data")
    }

    // let data = localStorage.getItem(storageTarget)
    const newSubjectName = document.getElementById("subjectName").value

    if(!data){
        data = {
            subjects: [newSubjectName],
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
    subjectContainer.querySelectorAll("form")[0].reset() // reset the form
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