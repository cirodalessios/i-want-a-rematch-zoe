// ===== Teams =====
const teams = [
  { name: "Teen Titans", score: 0, scoreHistory: [] },
  { name: "Powerpuff Girls", score: 0, scoreHistory: [] },
  { name: "Ninja Turtles", score: 0, scoreHistory: [] },
  { name: "Winx", score: 0, scoreHistory: [] }
];

let currentQuestionValue = 0;
let currentCategoryIndex = null;
let currentAudio = null;

// ===== Categories & Questions =====
const data = {
  categories: [
    "Music", "Soundtrack", "Slang", "Movies",
    "Creepypasta", "Logos", "Propaganda", "Random"
  ],
  questions: {
    200: [
      { text: "Name this track?", audio: "https://raw.githubusercontent.com/username/repo/main/audio/track1.mp3" },  // Music
      { text: "Identify the movie from this theme", audio: "https://raw.githubusercontent.com/username/repo/main/audio/track2.mp3" }, // Soundtrack
      { text: "Slang question 1" },
      { text: "Movies question 1" },
      { text: "Creepypasta question 1" },
      { text: "Logo question 1", image: "https://raw.githubusercontent.com/username/repo/main/images/logo1.png" },
      { text: "Propaganda question 1", image: "https://raw.githubusercontent.com/username/repo/main/images/propaganda1.png" },
      { text: "Random question 1" }
    ]
    // Repeat for 300,400,...900
  },
  answers: {
    200: ["Coca-Cola", "Macedonian Greek", "Slang answer 1", "Movies answer 1", "Creepypasta answer 1", "Nike", "WWII Poster", "Random answer 1"]
    // Repeat for 300,400,...900
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const modal = document.getElementById("modal");
  const questionText = document.getElementById("questionText");
  const questionImage = document.getElementById("questionImage");
  const showAnswerBtn = document.getElementById("showAnswerBtn");
  const playAudioBtn = document.getElementById("playAudioBtn");
  const closeBtn = document.getElementById("closeBtn");

  // ===== Scoreboard =====
  const scoreboard = document.getElementById("scoreboard");
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

  const pointsValues = [200,300,400,500,600,700,800,900];
  pointsValues.forEach(points => {
    for(let c=0;c<data.categories.length;c++){
      const box = document.createElement("div");
      box.className = "box";
      box.textContent = points;

      box.addEventListener("click", () => {
        currentQuestionValue = points;
        currentCategoryIndex = c;

        const question = data.questions[points]?.[c];
        if(!question) return; // skip if no question

        questionText.textContent = question.text;
        questionText.dataset.answer = data.answers[points]?.[c] || "";

        // Image handling
        if(question.image){
          questionImage.src = question.image;
          questionImage.style.display = "block";
        } else {
          questionImage.style.display = "none";
        }

        // Audio handling (only Music/Soundtrack)
        if(currentAudio) currentAudio.pause();
        currentAudio = question.audio ? new Audio(question.audio) : null;

        modal.style.display = "flex";

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
      currentAudio.currentTime = 0;
      currentAudio.play();
    }
  };

  // ===== Close Modal =====
  const closeModal = () => {
    modal.style.display = "none";
    board.querySelectorAll('.box:not(.used)').forEach(box => box.style.pointerEvents = 'auto');
  };

  closeBtn.onclick = closeModal;
  window.onclick = e => { if(e.target==modal) closeModal(); };

  // ===== Scoreboard Buttons =====
  scoreboard.addEventListener("click", e => {
    const idx = e.target.dataset.index;
    if(e.target.classList.contains("add-btn") && idx!==undefined){
      teams[idx].score += currentQuestionValue;
      teams[idx].scoreHistory.push(currentQuestionValue);
      document.getElementById(`score-${idx}`).textContent = teams[idx].score;
    }
    if(e.target.classList.contains("subtract-btn") && idx!==undefined){
      const lastPoints = teams[idx].scoreHistory.pop();
      if(lastPoints){
        teams[idx].score -= lastPoints;
        document.getElementById(`score-${idx}`).textContent = teams[idx].score;
      }
    }
  });

});
