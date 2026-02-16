// ===== Default Teams =====
const teams = [
  { name: "Teen Titans", score: 0, scoreHistory: [] },
  { name: "Powerpuff Girls", score: 0, scoreHistory: [] },
  { name: "Ninja Turtles", score: 0, scoreHistory: [] },
  { name: "Winx", score: 0, scoreHistory: [] }
];

let currentQuestionValue = 0;
let currentCategoryIndex = null;
let currentAudio = null; // For manual audio control

// ===== Categories & Questions (with optional audio) =====
const data = {
  categories: [
    "Music", "Soundtrack", "Slang", "Movies", 
    "Creepypasta", "Logos", "Propaganda", "Random"
  ],
  questions: {
    200: [
      { text: "Track name?", audio: "https://raw.githubusercontent.com/username/repo/main/audio/track1.mp3" },
      { text: "Identify the movie from this musical theme.", audio: "https://raw.githubusercontent.com/username/repo/main/audio/track2.mp3" },
      { text: "Track name?" },
      { text: "Track name?" },
      { text: "Track name?" },
      { text: "Track name?" },
      { text: "Track name?" },
      { text: "Track name?" }
    ],
    300: [
      { text: "Track name?", audio: "https://raw.githubusercontent.com/username/repo/main/audio/track3.mp3" },
      { text: "Identify the movie from this musical theme." },
      { text: "Identify the movie from this musical theme." },
      { text: "Identify the movie from this musical theme." },
      { text: "Identify the movie from this musical theme." },
      { text: "Identify the movie from this musical theme." },
      { text: "Identify the movie from this musical theme." },
      { text: "Identify the movie from this musical theme." }
    ]
    // … continue for 400, 500 … 900
    400:  ["Q1?", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
    500:  ["Q1?", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
    600:  ["Q1?", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
    700:  ["Q1?", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
    800:  ["Q1?", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
    900:  ["Q1?", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
  },
  answers: {
    200: ["Coca-Cola", "Macedonian Greek", "speed of light", "I am inevitable.", "‘to die’", "Imane Khelif / Iman Khalif", "gabriela", "1930"],
    300: ["Microsoft", "Abraham Lincoln", "ENIAC", "Ursula", "Hasta la vista", "Soccer (football)", "mind over matter", "eggs"]
    // … continue for 400, 500 … 900
    400:  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    500:  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    600:  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    700:  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    800:  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    900:  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const modal = document.getElementById("modal");
  const questionText = document.getElementById("questionText");
  const showAnswerBtn = document.getElementById("showAnswerBtn");
  const playAudioBtn = document.getElementById("playAudioBtn"); // NEW
  const closeBtn = document.getElementById("closeBtn");

  // ===== Scoreboard =====
  const scoreboard = document.createElement("div");
  scoreboard.id = "scoreboard";
  document.body.insertBefore(scoreboard, document.querySelector(".board-container"));

  teams.forEach((team, i) => {
    const div = document.createElement("div");
    div.className = "team-box";
    div.innerHTML = `
      <h3>${team.name}</h3>
      <p id="score-${i}">${team.score}</p>
      <button class="add-btn" data-index="${i}">+Points</button>
      <button class="subtract-btn" data-index="${i}">Undo Last</button>
    `;
    scoreboard.appendChild(div);
  });

  // ===== Build Board =====
  data.categories.forEach(cat => {
    const header = document.createElement("div");
    header.className = "header";
    header.textContent = cat;
    board.appendChild(header);
  });

  const pointsValues = [200, 300, 400, 500, 600, 700, 800, 900];
  pointsValues.forEach(points => {
    for (let c = 0; c < data.categories.length; c++) {
      const box = document.createElement("div");
      box.className = "box";
      box.textContent = points;

      box.addEventListener("click", () => {
        currentQuestionValue = points;
        currentCategoryIndex = c;

        const question = data.questions[points][c];
        questionText.textContent = question.text;
        questionText.dataset.answer = data.answers[points][c] || "";

        // Reset audio
        if(currentAudio) currentAudio.pause();
        currentAudio = question.audio ? new Audio(question.audio) : null;

        modal.style.display = "flex";

        // mark used & prevent multiple clicks
        box.classList.add("used");
        board.querySelectorAll('.box').forEach(b => b.style.pointerEvents = 'none');
        box.style.pointerEvents = 'none';
      });

      board.appendChild(box);
    }
  });

  // ===== Show Answer =====
  showAnswerBtn.onclick = () => {
    questionText.textContent = questionText.dataset.answer;
  };

  // ===== Play Audio (manual) =====
  playAudioBtn.onclick = () => {
    if(currentAudio){
      currentAudio.currentTime = 0; // restart
      currentAudio.play();
    }
  };

  // ===== Close Modal =====
  closeBtn.onclick = () => {
    modal.style.display = "none";
    board.querySelectorAll('.box:not(.used)').forEach(box => box.style.pointerEvents = 'auto');
  };

  // ===== Close Modal on click outside =====
  window.onclick = e => {
    if(e.target == modal){
      modal.style.display = "none";
      board.querySelectorAll('.box:not(.used)').forEach(box => box.style.pointerEvents = 'auto');
    }
  };

  // ===== Scoreboard Buttons =====
  scoreboard.addEventListener("click", e => {
    const idx = e.target.dataset.index;
    if(e.target.classList.contains("add-btn") && idx !== undefined){
      teams[idx].score += currentQuestionValue;
      teams[idx].scoreHistory.push(currentQuestionValue);
      document.getElementById(`score-${idx}`).textContent = teams[idx].score;
    }
    if(e.target.classList.contains("subtract-btn") && idx !== undefined){
      const lastPoints = teams[idx].scoreHistory.pop();
      if(lastPoints){
        teams[idx].score -= lastPoints;
        document.getElementById(`score-${idx}`).textContent = teams[idx].score;
      }
    }
  });
});
