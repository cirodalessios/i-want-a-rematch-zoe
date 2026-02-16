// ===== Teams =====
const teams = [
  { name: "Manifest", score: 0, scoreHistory: [] },
  { name: "Winx", score: 0, scoreHistory: [] },
  { name: "Powerpuff girls", score: 0, scoreHistory: [] },
  { name: "The Plastics", score: 0, scoreHistory: [] }
];

let currentQuestionValue = 0;

// ===== Categories & Questions =====
const data = {
  categories: ["Music", "Soundtrack", "Slang", "Creepypasta", "Movies", "Logos", "Propaganda", "Random"],
  questions: {
    200: ["Q1","Q2",
          "This slang means ‘the best of all time'.",
          "What tall, faceless man in a black suit stalks children in forests and playgrounds ?",
          "Q5","Q6","Q7","Q8"],
    300: ["Q1","Q2",
          "What slang phrase tells someone to get off the internet and reconnect with reality?",
          "What creepy sculpture with bulging eyes and a wide grin was supposedly part of a viral challenge that told kids to hurt themselves on WhatsApp and Youtube?  ",
          "Q5","Q6","Q7","Q8"],
    400: ["Q1","Q2",
          "What slang means to show off or brag about something?",
          "What does the Blue Whale curator order on the last day?  ",
          "Q5","Q6","Q7","Q8"],
    500: ["Q1","Q2",
          "What slang means suddenly cutting off all communication with someone?",
          "What viral internet legend describes an infinite office-like space with old wet carpet smell, endless humming lights, and no escape?  ",
          "Q5","Q6","Q7","Q8"],
    600: ["Q1","Q2",
          "What word describes outshining someone in looks when standing next to them?",
          "In Azerbaijani/Turkish urban legends, what evil spirit rides your chest while you sleep and brings nightmares? ",
          "Q5","Q6","Q7","Q8"],
    700: ["Q1","Q2",
          "What term describes someone who gained success mainly through family connections rather than merit?",
          "In Japanese urban legend, what does the Slit-Mouthed Woman ask victims before revealing her mouth?",
          "Q5","Q6","Q7","Q8"],
    800: ["Q1","Q2",
          "What slang term describes giving someone excessive or cringey praise?",
          "What is the chilling phrase Jack the Killer whispers to his victims before attacking them?",
          "Q5","Q6","Q7","Q8"],
    900: ["Q1","Q2",
          "You might get 'this' after seeing a romantic interest do something tiny but embarrassing, like running with a backpack?",
          "What taboo act must someone commit to become a skinwalker in Navajo legend? ",
          "Q5","Q6","Q7","Q8"]
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

  // ===== Scoreboard Setup =====
  const scoreboard = document.createElement("div");
  scoreboard.id = "scoreboard";
  
  const boardContainer = document.querySelector(".board-container");
  if (boardContainer) {
    document.body.insertBefore(scoreboard, boardContainer);
  }

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

  // ===== Board Headers =====
  data.categories.forEach(cat => {
    const header = document.createElement("div");
    header.className = "header";
    header.textContent = cat;
    board.appendChild(header);
  });

  // ===== Question Boxes =====
  const pointsValues = [200, 300, 400, 500, 600, 700, 800, 900];
  pointsValues.forEach(points => {
    for (let c = 0; c < data.categories.length; c++) {
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

  // ===== Modal Controls =====
  showAnswerBtn.onclick = () => {
    questionText.textContent = questionText.dataset.answer;
  };

  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  // ===== Scoreboard Logic =====
  scoreboard.addEventListener("click", e => {
    if (e.target.classList.contains("add-btn")) {
      const idx = e.target.dataset.index;
      teams[idx].score += currentQuestionValue;
      teams[idx].scoreHistory.push(currentQuestionValue);
      document.getElementById(`score-${idx}`).textContent = teams[idx].score;
      e.target.textContent = `+${currentQuestionValue}`;
    }
    
    if (e.target.classList.contains("subtract-btn")) {
      const idx = e.target.dataset.index;
      const lastPoints = teams[idx].scoreHistory.pop();
      if (lastPoints !== undefined) {
        teams[idx].score -= lastPoints;
        document.getElementById(`score-${idx}`).textContent = teams[idx].score;
      }
    }
  });
});
