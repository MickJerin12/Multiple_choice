const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const wrongAnswer = document.getElementById("wrongAnswer");

let questions = [
  {
    question: "",
    imgSrc: "",
    choiceA: "Correct",
    choiceB: "Wrong",
    choiceC: "Wrong",
    correct: "A",
  },
  {
    question: "",
    imgSrc: "",
    choiceA: "Wrong",
    choiceB: "Correct",
    choiceC: "Wrong",
    correct: "B",
  },
  {
    question: "",
    imgSrc: "",
    choiceA: "Wrong",
    choiceB: "Wrong",
    choiceC: "Correct",
    correct: "C",
  },
];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
let wrongImg = "img/close.png";
let reTry = "";

const renderQuestion = () => {
  let q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  qImg.innerHTML = "<img src=" + q.imgSrc + ">";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
};

start.addEventListener("click", startQuiz);

function startQuiz() {
  start.style.display = "none";
  scoreDiv.style.display = "none";
  quiz.style.display = "none";
  runningQuestion = 0;
  score = 0;
  progress.innerHTML = "";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000);
}

const renderProgress = () => {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
};

const renderCounter = () => {
  if (count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++;
  } else {
    count = 0;
    answerIsWrong();
    if (runningQuestion < lastQuestion) {
      quiz.style.display = "none";
      wrongAnswer.style.display = "block";
      wrongAnswer.innerHTML = "<img src=" + wrongImg + ">";
      wrongAnswer.innerHTML += "<p>" + "Oops! You're late" + "</p";
    }
    showWrongScreen();
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      clearInterval(TIMER);
      scoreRender();
    }
  }
};

const showWrongScreen = () => {
  setTimeout(() => {
    wrongAnswer.style.display = "none";
    quiz.style.display = "block";
  }, 500);
};

const checkAnswer = (answer) => {
  if (answer == questions[runningQuestion].correct) {
    score++;
    answerIsCorrect();
  } else {
    answerIsWrong();
  }
  count = 0;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    clearInterval(TIMER);
    scoreRender();
  }
};

const answerIsCorrect = () => {
  document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
};

const answerIsWrong = () => {
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
};

const scoreRender = () => {
  scoreDiv.style.display = "block";

  const scorePerCent = Math.round((100 * score) / questions.length);

  let img =
    scorePerCent >= 80
      ? "img/5.png"
      : scorePerCent >= 60
      ? "img/4.png"
      : scorePerCent >= 40
      ? "img/3.png"
      : scorePerCent >= 20
      ? "img/2.png"
      : "img/1.png";

  scoreDiv.innerHTML = "<img src=" + img + ">";
  scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
  scoreDiv.innerHTML += "<div id=" + "reTry" + ">" + "Retry!" + "</div>";
  reTry = document.getElementById("reTry");
  reTry.addEventListener("click", startQuiz);
};
