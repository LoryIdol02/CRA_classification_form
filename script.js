const questions = [
  {
    question: "Quanto è premium il prodotto?",
    answers: [
      { text: "Molto basso", value: 1 },
      { text: "Basso", value: 2 },
      { text: "Alto", value: 3 },
      { text: "Molto alto", value: 4 }
    ]
  },
  {
    question: "Quanto è innovativo?",
    answers: [
      { text: "Per nulla", value: 1 },
      { text: "Poco", value: 2 },
      { text: "Abbastanza", value: 3 },
      { text: "Molto", value: 4 }
    ]
  },
  {
    question: "Qual è il prezzo percepito?",
    answers: [
      { text: "Economico", value: 1 },
      { text: "Accessibile", value: 2 },
      { text: "Costoso", value: 3 },
      { text: "Luxury", value: 4 }
    ]
  },
  {
    question: "Quanto è tecnologico?",
    answers: [
      { text: "Base", value: 1 },
      { text: "Normale", value: 2 },
      { text: "Avanzato", value: 3 },
      { text: "Futuristico", value: 4 }
    ]
  },
  {
    question: "Quanto è esclusivo?",
    answers: [
      { text: "Comune", value: 1 },
      { text: "Poco esclusivo", value: 2 },
      { text: "Esclusivo", value: 3 },
      { text: "Molto esclusivo", value: 4 }
    ]
  },
  {
    question: "Quanto è sostenibile?",
    answers: [
      { text: "Per nulla", value: 1 },
      { text: "Poco", value: 2 },
      { text: "Molto", value: 3 },
      { text: "Completamente", value: 4 }
    ]
  },
  {
    question: "Quanto è richiesto dal mercato?",
    answers: [
      { text: "Poco", value: 1 },
      { text: "Medio", value: 2 },
      { text: "Alto", value: 3 },
      { text: "Altissimo", value: 4 }
    ]
  },
  {
    question: "Quanto è differenziato dai competitor?",
    answers: [
      { text: "Per nulla", value: 1 },
      { text: "Poco", value: 2 },
      { text: "Abbastanza", value: 3 },
      { text: "Molto", value: 4 }
    ]
  },
  {
    question: "Quanto è scalabile?",
    answers: [
      { text: "Per nulla", value: 1 },
      { text: "Limitatamente", value: 2 },
      { text: "Molto", value: 3 },
      { text: "Estremamente", value: 4 }
    ]
  },
  {
    question: "Quanto è forte il branding?",
    answers: [
      { text: "Debole", value: 1 },
      { text: "Normale", value: 2 },
      { text: "Forte", value: 3 },
      { text: "Iconico", value: 4 }
    ]
  }
];

let currentQuestion = 0;
let totalScore = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const progressEl = document.getElementById("progress");

const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");

const resultTitle = document.getElementById("result-title");
const resultDescription = document.getElementById("result-description");

function showQuestion() {

  const current = questions[currentQuestion];

  questionEl.innerText = current.question;

  answersEl.innerHTML = "";

  current.answers.forEach(answer => {

    const button = document.createElement("button");

    button.classList.add("answer-btn");

    button.innerText = answer.text;

    button.onclick = () => selectAnswer(answer.value);

    answersEl.appendChild(button);
  });

  updateProgress();
}

function selectAnswer(value) {

  totalScore += value;

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function updateProgress() {

  const progress =
    ((currentQuestion) / questions.length) * 100;

  progressEl.style.width = `${progress}%`;
}

function showResult() {

  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");

  let classification = "";
  let description = "";

  if (totalScore <= 15) {
    classification = "Classe A";
    description =
      "Prodotto entry-level con basso posizionamento strategico.";
  }

  else if (totalScore <= 25) {
    classification = "Classe B";
    description =
      "Prodotto con buon potenziale e discreto posizionamento.";
  }

  else if (totalScore <= 35) {
    classification = "Classe C";
    description =
      "Prodotto competitivo con caratteristiche avanzate.";
  }

  else {
    classification = "Classe D";
    description =
      "Prodotto premium con alto valore strategico.";
  }

  resultTitle.innerText = classification;
  resultDescription.innerText = description;
}

function restartQuiz() {

  currentQuestion = 0;
  totalScore = 0;

  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");

  showQuestion();
}

showQuestion();