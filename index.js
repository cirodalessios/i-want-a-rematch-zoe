// ===== Teams =====
const teams = [
  { name: "Team 1", score: 0, scoreHistory: [] },
  { name: "Team 2", score: 0, scoreHistory: [] },
  { name: "Team 3", score: 0, scoreHistory: [] },
  { name: "Team 4", score: 0, scoreHistory: [] }
];

let currentQuestionValue = 0;

// ===== Categories & Questions =====
const data = {
  categories: ["Math", "History", "Science", "Movies", "Geography", "Sports", "Tech", "Random"],
  questions: {
    200: ["Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8"],
    300: ["Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8"],
    400: ["Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8"],
    500: ["Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8"],
    600: ["Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8"],
    700: ["Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8"],
    800: ["Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8"],
    900: ["Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8"]
  },
  answers: {
    200: ["A1","A2","A3","A4","A5","A6","A7","A8"],
    300: ["A1","A2","A3","A4","A5","A6","A7","A8"],
    400: ["A1","A2","A3","A4","A5","A6","A7","A8"],
    500: ["A1","A2","A3","A4","A5","A6","A7","A8"],
    600: ["A1","A2","A3","A4","A5","A6","A7","A8"],
    700: ["A1","A2","A3","A4","A5","A6","A7","A8"],
    800: ["A1","A2","A3","A4","A5","A6","A7","A8"],
    900: ["A1","A2","A3","A4","A5","A6","A7","A8"]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const modal = document.getElementById("modal");
  const questionText = document.getElementById("questionText");
  const showAnswerBtn = document.getElementById("showAnswerBtn");
  const closeBtn = document.getElementById("closeBtn");

  // ===== Scoreboard =====
  const scoreboard = document.createElement("div");
  scoreboard.id = "scoreboard";
  document.body.insertBefore(scoreboard, document.querySelector(".board-container"));

  teams.forEach((team,i) => {
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

  // ===== Board Headers =====
  data.categories.forEach(cat => {
    const header = document.createElement("div");
    header.className = "header";
    header.textContent = cat;
    board.appendChild(header);
  });

  // ===== Question Boxes =====
  const pointsValues = [200,300,400,500,600,700,800,900];
  pointsValues.forEach(points => {
    for(let c=0; c<data.categories.length; c++){
      const box = document.createElement("div");
      box.className = "box";
      box.textContent = points;
      box.addEventListener("click", () => {
        currentQuestionValue = points;
        questionText.textContent = data.questions[points][c];
        questionText.dataset.answer = data.answers[points][c];
        modal.style.display = "flex";

        box.classList.add("used");
        box.style.pointerEvents = "none";
      });
      board.appendChild(box);
    }
  });

  // ===== Show Answer =====
  showAnswerBtn.onclick = () => {
    questionText.textContent = questionText.dataset.answer;
  }

  // ===== Close Modal =====
  document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const modal = document.getElementById("modal");
  const questionText = document.getElementById("questionText");
  const showAnswerBtn = document.getElementById("showAnswerBtn");
  const closeBtn = document.getElementById("closeBtn");

  // Close modal
  closeBtn.onclick = () => {
    modal.style.display = "none";
  }; // ← semicolon here

}); // ← make sure DOMContentLoaded callback ends here


  // ===== Scoreboard Buttons =====
  scoreboard.addEventListener("click", e => {
    if(e.target.classList.contains("add-btn")){
      const idx = e.target.dataset.index;
      teams[idx].score += currentQuestionValue;
      teams[idx].scoreHistory.push(currentQuestionValue);
      document.getElementById(`score-${idx}`).textContent = teams[idx].score;
      e.target.textContent = `+${currentQuestionValue}`;
    }
    if(e.target.classList.contains("subtract-btn")){
      const idx = e.target.dataset.index;
      const lastPoints = teams[idx].scoreHistory.pop();
      if(lastPoints){
        teams[idx].score -= lastPoints;
        document.getElementById(`score-${idx}`).textContent = teams[idx].score;
      }
    }
  });
});
