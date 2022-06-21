const quizData = [
  {
    question: "How old is Milet(Japan singer)?",
    a: "10",
    b: "17",
    c: "27",
    d: "21",
    correct: "c",
  },
  {
    question: "What is the most popular programming language in 2022?",
    a: "Python",
    b: "Java",
    c: "C++",
    d: "JavaScript",
    correct: "a",
  },
  {
    question: "Who is the President of US?",
    a: "Trump",
    b: "Obama",
    c: "Bidden",
    d: "Nash",
    correct: "c",
  },
  {
    question: "What does HTML stand for?",
    a: "Cascading Style Sheet",
    b: "Hypertext Markup Language",
    c: "Json Object Notation",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "b",
  },
  {
    question: "What year was JavaScript language launched?",
    a: "2022",
    b: "2021",
    c: "2020",
    d: "none of the above",
    correct: "d",
  },
];

const qeustion = document.querySelector(".quiz__title");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");

const submitBtn = document.querySelector(".btn");

let currentQuiz = 0;

// store score
let score = 0;

function loadQuiz() {
  const currentQuizData = quizData[currentQuiz];
  qeustion.innerHTML = currentQuizData.question;
  a_text.innerHTML = currentQuizData.a;
  b_text.innerHTML = currentQuizData.b;
  c_text.innerHTML = currentQuizData.c;
  d_text.innerHTML = currentQuizData.d;
}

function getSelected() {
  let id = undefined;
  let answers = document.getElementsByName("answer");
  answers.forEach((item) => {
    if (item.checked) {
      id = item.id;
    }
  });
  answers.forEach((item) => {
    item.checked = false;
  });
  return id;
}

loadQuiz();

submitBtn.addEventListener("click", () => {
  let answer = getSelected();

  if (!answer) {
    alert("You don't have input");
  } else {
    if (answer === quizData[currentQuiz].correct) {
      score += 10;
    }
    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      document.querySelector(
        ".quiz__container"
      ).innerHTML = `<div class="quiz__header"><h2>You finish the quiz successfully, and you get ${score} / 50</h2><div><button onclick="location.reload()">reload</button>`;
    }
  }
});
