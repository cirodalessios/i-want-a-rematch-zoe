const teams = [
  { name: "Teen Titans", score: 0, scoreHistory: [] },
  { name: "Powerpuff Girls", score: 0, scoreHistory: [] },
  { name: "Ninja Turtles", score: 0, scoreHistory: [] },
  { name: "Winx", score: 0, scoreHistory: [] }
];

let currentQuestionValue = 0;
let currentAudio = null;

const data = {
  categories: ["Music", "Soundtrack", "Slang", "Movies", "Creepypasta", "Logos", "Propaganda", "Random"],
  questions: {
    200: [
      { text: "Name this track?", audio: "https://raw.githubusercontent.com/username/repo/main/audio/track1.mp3" },
      { text: "Identify the movie from this theme", audio: "https://raw.githubusercontent.com/username/repo/main/audio/track2.mp3" },
      { text: "Slang question 1" },
      { text: "Movies question 1" },
      { text: "Creepypasta question 1" },
      { text: "Logo question 1", image: "https://via.placeholder.com/150" },
      { text: "Propaganda question 1", image: "https://via.placeholder.com/150" },
      { text: "Random question 1" }
    ]
    // Add 300, 400, etc. here later
    300:  ["Q1?", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
    400:  ["Q1?", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
    500:  ["Q1?", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
    600:  ["Q1?", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
    700:  ["Q1?", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
    800:  ["Q1?", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
    900:  ["Q1?", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"]
  },
  answers: {
    200: ["Coca-Cola", "Macedonian Greek", "Slang answer 1", "Movies answer 1", "Creepypasta answer 1", "Nike", "WWII Poster", "Random answer 1"],
    300:  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    400:  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    500:  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    600:  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    700:  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    800:  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    900:  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const modal = document.getElementById("modal");
  const questionText = document.getElementById("questionText");
  const questionImage = document.getElementById("questionImage");
  const scoreboard = document.getElementById("scoreboard");

  // Build Scoreboard
  teams.forEach((team, i) => {
    const div = document.createElement("div");
    div.className = "team-box";
    div.innerHTML = `
      <h3>${team.name}</h3>
      <p id="score-${i}">${team.score}</p>
      <button class="add-btn" data-index="${i}">+Pts</button>
      <button class="subtract-btn" data-index="${i}">Undo</button>
    `;
    scoreboard.appendChild(div);
  });

  // Build Headers
  data.categories.forEach(cat => {
    const header = document.createElement("div");
    header.className = "header";
    header.textContent = cat;
    board.appendChild(header);
  });

  // Build Grid
  const pointsValues = [200, 300, 400, 500, 600, 700, 800, 900];
  pointsValues.forEach(points => {
    for (let c = 0; c < data.categories.length; c++) {
      const box = document.createElement("div");
      box.className = "box";
      box.textContent = points;

      // SAFETY CHECK: Skip if data doesn't exist for this point/category
      const question = data.questions[points]?.[c];
      if (!question) {
        box.style.opacity = "0.2";
        box.style.cursor = "default";
        board.appendChild(box);
        continue; 
      }

      box.addEventListener("click", () => {
        currentQuestionValue = points;
        questionText.textContent = question.text;
        questionText.dataset.answer = data.answers[points][c];

        if (question.image) {
          questionImage.src = question.image;
          questionImage.style.display = "block";
        } else {
          questionImage.style.display = "none";
        }

        if (currentAudio) currentAudio.pause();
        currentAudio = question.audio ? new Audio(question.audio) : null;

        modal.style.display = "flex";
        box.classList.add("used");
        board.style.pointerEvents = "none";
      });

      board.appendChild(box);
    }
  });

  // Modal Controls
  document.getElementById("showAnswerBtn").onclick = () => {
    questionText.textContent = questionText.dataset.answer;
  };

  document.getElementById("playAudioBtn").onclick = () => {
    if (currentAudio) { currentAudio.currentTime = 0; currentAudio.play(); }
  };

  const closeModal = () => {
    modal.style.display = "none";
    board.style.pointerEvents = "auto";
    if (currentAudio) currentAudio.pause();
  };

  document.getElementById("closeBtn").onclick = closeModal;

  // Score Logic
  scoreboard.addEventListener("click", e => {
    const idx = e.target.dataset.index;
    if (!idx) return;

    if (e.target.classList.contains("add-btn")) {
      teams[idx].score += currentQuestionValue;
      teams[idx].scoreHistory.push(currentQuestionValue);
    } else if (e.target.classList.contains("subtract-btn")) {
      const last = teams[idx].scoreHistory.pop();
      if (last) teams[idx].score -= last;
    }
    document.getElementById(`score-${idx}`).textContent = teams[idx].score;
  });
});
