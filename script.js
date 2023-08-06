const questions = [  // array of objects
    {
        question : "Which is the largest animal in the world ",
        answers:[  // array of objects
            
                {text :"Shark", correct : false},
                {text :"Blue whale", correct : true},
                {text :"Elephant", correct : false},
                {text :"Girrafie", correct : false},
            
        ]
    },
    {
        question: "What is the capital city of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Paris", correct: true },
            { text: "Berlin", correct: false },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        answers: [
            { text: "Jupiter", correct: false },
            { text: "Mars", correct: true },
            { text: "Venus", correct: false },
            { text: "Neptune", correct: false }
        ]
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: [
            { text: "William Shakespeare", correct: true },
            { text: "Mark Twain", correct: false },
            { text: "Jane Austen", correct: false },
            { text: "Charles Dickens", correct: false }
        ]
    }
    
]

const questionElement = document.getElementById("questions");
const answerBtn = document.getElementById("answer-btns");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0 ;


function start(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = 'Next ➡️'
    showQuestion();
    
}

function showQuestion(){
    resetQuestion();
    let currentQuestion =  questions[currentQuestionIndex];  //questions[0] = question [0]
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML=questionNumber + ". "+ currentQuestion.question;  // question[0].question --> accessing the element 


    currentQuestion.answers.forEach((answer) =>{
        const Button = document.createElement("button");
        Button.innerHTML = answer.text;
        Button.classList.add("btn");
        answerBtn.appendChild(Button);
        if(answer.correct){  // or === true; // checking if the answers is true . if it is correct the block inside will be executed
            Button.dataset.correct =  answer.correct;   
        }
        Button.addEventListener('click' , showAnswer);
    });
}

function resetQuestion(){   // to clear any previous question and answer choices from the screen before displaying a new question and its corresponding answer choices.
    nextBtn.style.display = 'none';
    while(answerBtn.firstChild){  // ☝️  // this loop is for ..as long as there is firstchild element inside answerBtn
        answerBtn.removeChild(answerBtn.firstChild);
    }
}
function showAnswer(e){
    const selectedBtn = e.target;   // get the clicked element by using event.target
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
       button.disabled = true;
    });
    nextBtn.style.display = "block";
}



nextBtn.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNext();
    }
    else{
        start();
    }
})
function handleNext(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

function showScore(){
    resetQuestion();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`
    nextBtn.innerHTML = 'Play again'
    nextBtn.style.display = 'block'
}


   
start();