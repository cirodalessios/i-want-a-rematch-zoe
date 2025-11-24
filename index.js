// ===== Default Teams =====
const teams = [
  { name: "Teen Titans", score: 0, scoreHistory: [] },
  { name: "Powerpuff Girls", score: 0, scoreHistory: [] },
  { name: "Ninja Turtles", score: 0, scoreHistory: [] },
  { name: "Winx", score: 0, scoreHistory: [] }
];

let currentQuestionValue = 0;

// ===== Categories & Questions =====
const data = {
  categories: [
    "Brands", "History", "Science", "Movies", 
    "Meaning", "Sports", "Music", "Random"
  ],
  questions: {
    100:  ["This company’s theme park workers are not allowed to break character or point with a single finger — it must be two fingers or an open hand.", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
    200:  ["This soda brand launched the “Share a _” campaign featuring people's names on bottles.", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
    300:  ["This company began in 1975 inside a garage and later became the world’s largest software maker.", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
    400:  ["This smartphone brand came before Apple and Samsung – and was the global leader in the 2000s, but disappeared after failing to adapt to touchscreens.", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
    500:  ["This sports brand is named after a Greek goddess of victory.", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
    600:  ["This smartphone brand is named after an Indonesian word meaning “three stars.”", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
    700:  ["This luxury brand destroyed millions of dollars of unsold clothes to keep their exclusivity.", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
    800:  ["“Don’t be evil” was once the unofficial motto of this company — until it was silently removed in 2018.", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
    900:  ["This chain ran a promotion during a regional conflict, offering pizza and drinks in association with the salvation of a city, generating significant controversy.", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"],
    1000: ["This luxury brand started by making trunks for traveling aristocrats in 1854.", "Q2?", "Q3?", "Q4?", "Q5?", "Q6?", "Q7?", "Q8?"]
  },
  answers: {
    100:  ["Disney", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    200:  ["Coca-Cola", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    300:  ["Microsoft", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    400:  ["Nokia", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    500:  ["Nike", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    600:  ["Samsung", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    700:  ["Burberry", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    800:  ["Google", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    900:  ["Papa John's", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    1000: ["Louis Vuitton", "A2", "A3", "A4", "A5", "A6", "A7", "A8"]
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

  // ===== Build Board Headers =====
  data.categories.forEach(cat => {
    const header = document.createElement("div");
    header.className = "header";
    header.textContent = cat;
    board.appendChild(header);
  });

  // ===== Build Question Boxes =====
  const pointsValues = [100,200,300,400,500,600,700,800,900,1000];
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

        // mark used
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
  closeBtn.onclick = () => {
    modal.style.display = "none";
  }

  // ===== Scoreboard Buttons =====
  scoreboard.addEventListener("click", e => {
    if(e.target.classList.contains("add-btn")){
      const idx = e.target.dataset.index;
      teams[idx].score += currentQuestionValue;
      teams[idx].scoreHistory.push(currentQuestionValue); // track
      document.getElementById(`score-${idx}`).textContent = teams[idx].score;
      e.target.textContent = `+${currentQuestionValue}`;
    }
    if(e.target.classList.contains("subtract-btn")){
      const idx = e.target.dataset.index;
      const lastPoints = teams[idx].scoreHistory.pop(); // remove last
      if(lastPoints){
        teams[idx].score -= lastPoints;
        document.getElementById(`score-${idx}`).textContent = teams[idx].score;
      }
    }
  });

});
