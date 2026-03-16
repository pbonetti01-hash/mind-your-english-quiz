// =========================
// DOM ELEMENTS
// =========================
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");

const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");

const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");

const questionImage = document.getElementById("question-image");
const resultMessage = document.getElementById("result-message");
const progressBar = document.getElementById("progress");


// =========================
// QUIZ QUESTIONS
// =========================
const quizQuestions = [
  {
    question: "Which word is a synonym for 'happy'?",
    image: "../Images/Happy.jpg",
    answers: [
      { text: "Melancholy", correct: false },
      { text: "Joyful", correct: true },
      { text: "Anxious", correct: false },
      { text: "Furious", correct: false }
    ]
  },
  {
    question: "Choose the correct sentence:",
    answers: [
      { text: "She don't like coffee.", correct: false },
      { text: "She doesn't likes coffee.", correct: false },
      { text: "She doesn't like coffee.", correct: true },
      { text: "She not like coffee.", correct: false },
      { text: "She isn't like coffee.", correct: false }
    ]
  },
  {
    question: "What does the idiom 'break the ice' mean?",
    image: "../Images/Writting.jpg",
    answers: [
      { text: "To start a conversation in an awkward situation", correct: true },
      { text: "To destroy something made of ice", correct: false },
      { text: "To feel very cold", correct: false }
    ]
  },
  {
    question: "Which is the correct past tense of 'go'?",
    image: "../Images/Question.jpg",
    answers: [
      { text: "Goed", correct: false },
      { text: "Went", correct: true }
    ]
  },
  {
    question: "What does 'eloquent' mean?",
    answers: [
      { text: "Shy and reserved", correct: false },
      { text: "Fluent and persuasive in speech", correct: true },
      { text: "Rude and aggressive", correct: false },
      { text: "Confused and disorganized", correct: false }
    ]
  },
  {
    question: "Which sentence uses the Present Perfect correctly?",
    answers: [
      { text: "I have saw that movie.", correct: false },
      { text: "I seen that movie already.", correct: false },
      { text: "I have already seen that movie.", correct: true },
      { text: "I did have seen that movie.", correct: false },
      { text: "I was seeing that movie before.", correct: false }
    ]
  },
  {
    question: "What is the British English word for 'elevator'?",
    image: "../Images/Elevator.jpg",
    answers: [
      { text: "Escalator", correct: false },
      { text: "Lift", correct: true },
      { text: "Cab", correct: false },
      { text: "Trolley", correct: false }
    ]
  }
];


// =========================
// QUIZ STATE
// =========================
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;


// =========================
// INITIAL SETUP
// =========================
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;


// =========================
// EVENT LISTENERS
// =========================
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);


// =========================
// SHUFFLE FUNCTION
// Fisher-Yates Algorithm
// =========================
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


// =========================
// START QUIZ
// =========================
function startQuiz() {
  shuffleArray(quizQuestions);

  currentQuestionIndex = 0;
  score = 0;

  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}


// =========================
// SHOW QUESTION
// =========================
function showQuestion() {

  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  shuffleArray(currentQuestion.answers);

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent =
    (currentQuestionIndex / quizQuestions.length) * 100;

  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  // IMAGE
  if (currentQuestion.image) {
    questionImage.src = currentQuestion.image;
    questionImage.style.display = "block";
  } else {
    questionImage.style.display = "none";
  }

  // CLEAR ANSWERS
  answersContainer.innerHTML = "";

  // CREATE ANSWERS
  currentQuestion.answers.forEach(answer => {

    const button = document.createElement("button");

    button.textContent = answer.text;
    button.classList.add("answer-btn");

    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}


// =========================
// SELECT ANSWER
// =========================
function selectAnswer(event) {

  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach(button => {

    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }

  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }

  }, 1000);
}


// =========================
// SHOW RESULTS
// =========================
function showResults() {

  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage =
    (score / quizQuestions.length) * 100;

  resultMessage.className = '';

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
    resultMessage.classList.add('result--perfect');
  }
  else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
    resultMessage.classList.add('result--great');
  }
  else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
    resultMessage.classList.add('result--good');
  }
  else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
    resultMessage.classList.add('result--average');
  }
  else {
    resultMessage.textContent = "Keep studying! You'll get better!";
    resultMessage.classList.add('result--poor');
  }

}


// =========================
// RESTART QUIZ
// =========================
function restartQuiz() {

  resultScreen.classList.remove("active");
  startScreen.classList.add("active");

}


// =========================
// BACKGROUND ROTATION
// =========================
const Backgrounds = [
  "../Images/Australia.jpg",
  "../Images/Canada.jpg",
  "../Images/Canada2.jpg",
  "../Images/England.jpg",
  "../Images/England2.jpg"
];

let currentBG =
  Math.floor(Math.random() * Backgrounds.length);


// APPLY FIRST RANDOM BACKGROUND
document.body.style.setProperty(
  "--BG-IMAGE",
  `url(${Backgrounds[currentBG]})`
);


// CHANGE BACKGROUND EVERY 5s
setInterval(() => {

  currentBG =
    (currentBG + 1) % Backgrounds.length;

  document.body.style.setProperty(
    "--BG-IMAGE",
    `url(${Backgrounds[currentBG]})`
  );

}, 5000);