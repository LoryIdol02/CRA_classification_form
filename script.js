const questions = [
  {
    question: "Qual è il contesto di utilizzo previsto del prodotto?",
    answers: [
      { text: "Uso personale/hobbistico, nessun contesto critico", value: 0 },
      { text: "Uso aziendale generale (ufficio, produttività)", value: 2 },
      { text: "Utilizzo in infrastrutture aziendali sensibili o PA", value: 5 },
      { text: "Infrastrutture critiche (energia, sanità, trasporti, finanza)", value: 8 }
    ]
  },
  {
    question: "Il prodotto gestisce o processa dati personali o sensibili?",
    answers: [
      { text: "No, nessun dato personale", value: 0 },
      { text: "Dati personali comuni in modo limitato", value: 2 },
      { text: "Dati personali su larga scala o dati di categorie speciali", value: 5 },
      { text: "Dati sanitari, biometrici o finanziari ad alta sensibilità", value: 8 }
    ]
  },
  {
    question: "Qual è il livello di connettività di rete del prodotto?",
    answers: [
      { text: "Nessuna connessione di rete (air-gapped)", value: 0 },
      { text: "Connettività limitata/locale (LAN, intranet)", value: 2 },
      { text: "Connesso a internet con funzioni limitate", value: 4 },
      { text: "Costantemente connesso, esposto a internet, API pubbliche", value: 6 }
    ]
  },
  {
    question: "Il prodotto ha accesso privilegiato a sistemi o risorse critiche?",
    answers: [
      { text: "Nessun accesso privilegiato", value: 0 },
      { text: "Accesso limitato a risorse di sistema standard", value: 2 },
      { text: "Accesso a risorse aziendali sensibili (AD, database critici)", value: 4 },
      { text: "Accesso privilegiato a sistemi critici o industriali (OT/ICS)", value: 7 }
    ]
  },
  {
    question: "Qual è l'impatto potenziale di una violazione della sicurezza?",
    answers: [
      { text: "Impatto minimo, nessun danno significativo", value: 0 },
      { text: "Impatto lieve su dati o operatività limitata", value: 2 },
      { text: "Interruzione di servizi aziendali o perdita di dati significativa", value: 5 },
      { text: "Rischio per la sicurezza pubblica, danni diffusi o perdite finanziarie gravi", value: 8 }
    ]
  },
  {
    question: "Il prodotto è destinato ad essere integrato in altri sistemi o è autonomo?",
    answers: [
      { text: "Prodotto autonomo, nessuna integrazione", value: 0 },
      { text: "Integrazione con sistemi non critici tramite API standard", value: 1 },
      { text: "Componente integrato in sistemi aziendali complessi", value: 3 },
      { text: "Componente core di infrastrutture critiche o sistemi embedded", value: 5 }
    ]
  },
  {
    question: "Quanti utenti o sistemi dipendono dal prodotto?",
    answers: [
      { text: "Meno di 10 utenti/sistemi", value: 0 },
      { text: "Da 10 a 500 utenti/sistemi", value: 1 },
      { text: "Da 500 a 50.000 utenti/sistemi", value: 3 },
      { text: "Oltre 50.000 utenti o sistemi critici dipendenti", value: 5 }
    ]
  },
  {
    question: "Qual è il livello di aggiornabilità e patch del prodotto?",
    answers: [
      { text: "Aggiornamenti automatici frequenti e verificati", value: 0 },
      { text: "Aggiornamenti manuali periodici, processo documentato", value: 1 },
      { text: "Aggiornamenti rari o complessi, richiede downtime", value: 3 },
      { text: "Non aggiornabile o con ciclo di vita molto lungo (es. firmware fisso)", value: 5 }
    ]
  },
  {
    question: "Il prodotto include funzionalità crittografiche o di autenticazione?",
    answers: [
      { text: "Nessuna funzione crittografica o di autenticazione", value: 0 },
      { text: "Autenticazione base (password), crittografia standard", value: 1 },
      { text: "Gestione avanzata di identità, SSO, crittografia end-to-end", value: 3 },
      { text: "Infrastruttura PKI, HSM, gestione certificati o root of trust", value: 5 }
    ]
  },
  {
    question: "Il prodotto è già soggetto ad altri regolamenti settoriali di sicurezza informatica?",
    answers: [
      { text: "Nessun altro regolamento applicabile", value: 0 },
      { text: "Soggetto a regolamenti generici (es. GDPR, ISO 27001)", value: 1 },
      { text: "Soggetto a NIS2 o DORA come entità importante", value: 3 },
      { text: "Soggetto a NIS2 come entità essenziale, MDR, IEC 62443 o equivalenti", value: 5 }
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

function startQuiz() {

  document
    .getElementById("intro-box")
    .classList.add("hidden");

  document
    .getElementById("quiz-box")
    .classList.remove("hidden");

  showQuestion();
}

function showQuestion() {

  const current = questions[currentQuestion];

  const counter = document.getElementById("question-counter");
  if (counter) counter.innerText = `${currentQuestion + 1} / ${questions.length}`;

  questionEl.innerText = current.question;

  answersEl.innerHTML = "";

  current.answers.forEach(answer => {

    const button = document.createElement("button");

    button.classList.add("answer-btn");

    button.innerText = answer.text;

    button.addEventListener("pointerenter", () => {
    button.style.background = "var(--navy)";
    button.style.color = "var(--white)";
    button.style.borderColor = "var(--navy)";
    button.style.transform = "translateX(4px)";
    });

    button.addEventListener("pointerleave", () => {
    button.style.background = "";
    button.style.color = "var(--text-body)";
    button.style.borderColor = "";
    button.style.transform = "";
    });

    button.onclick = () => selectAnswer(answer.value);

    answersEl.appendChild(button);
  });

  updateProgress();
}

function selectAnswer(value) {
    document.querySelectorAll(".answer-btn").forEach(btn => {
    btn.style.background = "";
    btn.style.color = "";
    btn.style.borderColor = "";
    btn.style.transform = "";
  });

  totalScore += value;

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showLoadingScreen();
  }
}

function updateProgress() {

  const progress =
    ((currentQuestion) / questions.length) * 100;

  progressEl.style.width = `${progress}%`;
}

function showLoadingScreen() {

  quizBox.classList.add("hidden");

  document
    .getElementById("loading-screen")
    .classList.remove("hidden");

  const progress =
    document.getElementById("loading-progress");

  let current = 0;

  // Incrementi casuali
  const fakeSteps = [
    7,
    13,
    21,
    28,
    41,
    49,
    63,
    69,
    74,
    81,
    87,
    91,
    94,
    97,
    100
  ];

  fakeSteps.forEach((value, index) => {

    setTimeout(() => {

      progress.style.width = value + "%";

    }, index * 650);

  });

  // Dopo 10 secondi mostra risultato
  setTimeout(() => {

    document
      .getElementById("loading-screen")
      .classList.add("hidden");

    showResult();

  }, 10000);
}

function showResult() {

  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");

  let classification = "";
  let description = "";
const resultCard = document.querySelector(".result-card");

if (totalScore <= 15) {
  classification = "Prodotto di classe Default";
  description = "Il vostro prodotto è considerato come il prodotto più semplice tra i prodotti digitali, ma deve comunque rispettare tutte gli standard che la direttiva stabilisce.";
  resultCard.style.background = "#85ea85";
  resultCard.style.borderColor = "#659a65";
}
else if (totalScore <= 25) {
  classification = "Prodotto digitale importante di classe 1";
  description = "Il prodotto è risultato un prodotto digitale importante, che necessità un attenzione particolare";
  resultCard.style.background = "#fff4e0";
  resultCard.style.borderColor = "#f0d080";
}
else if (totalScore <= 35) {
  classification = "Prodotto digitale importante di classe 2";
  description = "Il vostro prodotto potrebbe causare danni importanti in caso di manomissione, per questo motivo il Cyber Resilience Act lo tratta in maniera dettagliata.";
  resultCard.style.background = "#ffeaea";
  resultCard.style.borderColor = "#f0b0b0";
}
else {
  classification = "Prodotto critico";
  description = "Il vostro prodotto è fondamentale per la sicurezza dell'ambiente in cui opera, per questo è fondamentale che sia perfettamente allineato con lo standard.";
  resultCard.style.background = "#1a0a0a";
  resultCard.style.borderColor = "#6a1010";
  resultCard.style.color = "#ff6060";
  resultCard.querySelector("h2").style.color = "#ff6060";
  resultCard.querySelector("p").style.color = "rgba(255,150,150,0.85)";
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

// Il quiz parte solo dopo il click su "Inizia"