const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById("loader");
const game = document.getElementById('game');
let currentQuestion ={};
let acceptingAnsewers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<script> ",
        choice2: "<js>",
        choice3: "<scripting>",
        choice4: "<javascript>",
        answer: 1
    },
    {
        question: "How do you write \"Hello World\" in an alert box?",
        choice1: "msg(\"Hello World\");   ",
        choice2: "msgBox(\"Hello World\");",
        choice3: "alert(\"Hello World\");  ",
        choice4: "alertBox(\"Hello World\");",
        answer: 3
    },
    {
        question: "What is the correct syntax for referring to an external script called 'XXX.js' ?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3
    },
    {
        question: "How do you create a function in JavaScript?",
        choice1: "function = myFunction()   ",
        choice2: "function myFunction()",
        choice3: "function:myFunction()",
        choice4: "fun:myFunction()",
        answer: 2
    },
    {
        question: "How to write an IF statement in JavaScript?",
        choice1: "if i == 5 then ",
        choice2: "if (i == 5)  ",
        choice3: "if i = 5",
        choice4: "if i = 5 then",
        answer: 2
    },
    {
        question: "How to write an IF statement for executing some code if \"i\" is NOT equal to 5?",
        choice1: "if (i <> 5)   ",
        choice2: "if i <> 5",
        choice3: "if i =! 5 then",
        choice4: "if (i != 5)  ",
        answer: 4
    },
    {
        question: "How does a WHILE loop start?",
        choice1: "while (i <= 10; i++)  ",
        choice2: "while (i <= 10)  ",
        choice3: "while i = 1 to 10",
        choice4: "i = 0 while i to 10",
        answer: 2
    },
    {
        question: "How to insert a comment that has more than one line?",
        choice1: "<!--This comment has more than one line--> ",
        choice2: "//This comment has more than one line//",
        choice3: "/*This comment has more than one line*/ ",
        choice4: "/*This comment has more than one line ",
        answer: 3
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        choice1: "var colors = ['red', 'green', 'blue']   ",
        choice2: "var colors = 'red', 'green', 'blue'",
        choice3: "var colors = (1:'red', 2:'green', 3:'blue')",
        choice4: "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
        answer: 1
    },
    {
        question: "How do you round the number 7.25, to the nearest integer?",
        choice1: "rnd(7.25)   ",
        choice2: "Math.rnd(7.25)",
        choice3: "round(7.25)",
        choice4: "Math.round(7.25)  ",
        answer: 4
    },
    {
        question: "What is the correct JavaScript syntax for opening a new window called 'w2' ?",
        choice1: "w2 = window.new(\"http://www.Quiz.com\");  ",
        choice2: "w2 = window.open(\"http://www.Quiz.com\");  ",
        choice3: "window.new(\"http://www.w2.com\")",
        choice4: "w2.window.open(\"http://www.Quiz.com\")  ",
        answer: 2
    },
    {
        question: "How do you declare a JavaScript variable?",
        choice1: "var carName;   ",
        choice2: "v carName; ",
        choice3: "variable carName;",
        choice4: "var.name ",
        answer: 1
    },
    {
        question: "How can you detect the client's browser name?",
        choice1: "browser.name  ",
        choice2: "navigator.appName  ",
        choice3: "client.navName",
        choice4: "client.ip  ",
        answer: 2
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        choice1: "onchange",
        choice2: "onclick  ",
        choice3: "onmouseclick",
        choice4: "onmouseover",
        answer: 2
    },
  
];


//Constants
const CORRET_BONUS = 10;
const max_questions = 10;

startGame = () => {
   questionCounter = 0;
   score = 0;
   availableQuestions = [...questions];
   
   getNewQuestion();
   game.classList.remove('hidden');
   loader.classList.add('hidden');
};

getNewQuestion = () => {

   if(availableQuestions.length == 0 || questionCounter >= max_questions){
    localStorage.setItem('mostRecentScore', score);
       //got to the end page
       return window.location.assign("/end.html");
   }

   questionCounter++;
   progressText.innerText = `Question ${questionCounter} / ${max_questions}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter/max_questions)* 100}%`;
   
    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
   currentQuestion = availableQuestions[questionIndex];
   question.innerText = currentQuestion.question;
   choices.forEach(choice => {
       const number = choice.dataset["number"];
       choice.innerText = currentQuestion["choice" + number];
   });
   availableQuestions.splice(questionIndex, 1);
   acceptingAnsewers = true;
};

choices.forEach(choice => {
   choice.addEventListener("click", e =>{
       if(!acceptingAnsewers) return;

       acceptingAnsewers = false;
       const selectedchoice = e.target;
       const selectedAnswer = selectedchoice.dataset["number"];
       const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
       
       if(classToApply == "correct"){
           incrementScore(CORRET_BONUS);
       }

       selectedchoice.parentElement.classList.add(classToApply);
       setTimeout(() => {
           selectedchoice.parentElement.classList.remove(classToApply);
           console.log(classToApply);
           getNewQuestion();     
       }, 1000);
     
      
       
   });
});

startGame();

incrementScore = num =>{
   score +=num;
   scoreText.innerText = score;
};


