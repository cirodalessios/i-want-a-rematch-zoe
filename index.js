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
    100:  ["This company’s theme park workers are not allowed to break character or point with a single finger — it must be two fingers or an open hand.",
           "This European movement, starting in the 14th century, is called the 'rebirth' of classical art, literature, and learning.", 
           "Q3?", 
           "Q4?", 
           "Q5?", 
           "Q6?", 
           "Q7?", 
           "Q8?"],
    200:  ["This soda brand launched the “Share a _” campaign featuring people's names on bottles.", 
           "Cleopatra, the famed queen known for her charm and diplomacy, belonged to which ethnic group?", 
           "Q3?", 
           "Q4?", 
           "Q5?", 
           "Q6?", 
           "Q7?", 
           "Q8?"],
    300:  ["This company began in 1975 inside a garage and later became the world’s largest software maker.", 
           "Which U.S. president issued the Emancipation Proclamation freeing enslaved people in 1863?", 
           "Q3?", 
           "Q4?", 
           "Q5?", 
           "Q6?", 
           "Q7?", 
           "Q8?"],
    400:  ["This smartphone brand came before Apple and Samsung – and was the global leader in the 2000s, but disappeared after failing to adapt to touchscreens.", 
           "Which 15th-century Wallachian prince inspired the legend of a famous vampire due to his fierce reputation?", 
           "Q3?", 
           "Q4?", 
           "Q5?", 
           "Q6?", 
           "Q7?", 
           "Q8?"],
    500:  ["This sports brand is named after a Greek goddess of victory.", 
           "This Russian empress corresponded with Voltaire and Diderot and promoted legal, educational, and cultural reforms inspired by Enlightenment ideas.", 
           "Q3?", 
           "Q4?", 
           "Q5?", 
           "Q6?", 
           "Q7?", 
           "Q8?"],
    600:  ["This smartphone brand is named after an Indonesian word meaning “three stars.”", 
           "Which 1919 treaty officially ended World War I and imposed harsh penalties on Germany?", 
           "Q3?", 
           "Q4?", 
           "Q5?", 
           "Q6?", 
           "Q7?", 
           "Q8?"],
    700:  ["This luxury brand destroyed millions of dollars of unsold clothes to keep their exclusivity.", 
           "Which country declared war on emus in 1932 — and lost the so‑called ‘Emu War’?", 
           "Q3?", 
           "Q4?", 
           "Q5?", 
           "Q6?", 
           "Q7?", 
           "Q8?"],
    800:  ["“Don’t be evil” was once the unofficial motto of this company — until it was silently removed in 2018.", 
           "Which all-female Soviet pilots flew night bombing missions in plywood planes?", 
           "Q3?", 
           "Q4?", 
           "Q5?", 
           "Q6?", 
           "Q7?", 
           "Q8?"],
    900:  ["This chain ran a promotion during a regional conflict, offering pizza and drinks in association with the salvation of a city, generating significant controversy.", 
           "On what date in 1989 did people dismantle the border fence and cross freely between Soviet Azerbaijan and Iran?", 
           "Q3?", 
           "Q4?", 
           "Q5?", 
           "Q6?", 
           "Q7?", 
           "Q8?"],
    1000: ["This luxury brand started by making trunks for traveling aristocrats in 1854.", 
           "Many historians mark this date — as the day the United States officially entered World War II. (answer with full date)", 
           "Q3?", 
           "Q4?", 
           "Q5?", 
           "Q6?", 
           "Q7?", 
           "Q8?"]
  },
  answers: {
    100:  ["Disney", "Renaissance", "A3", "A4", "A5", "A6", "A7", "A8"],
    200:  ["Coca-Cola", "Macedonian Greek", "A3", "A4", "A5", "A6", "A7", "A8"],
    300:  ["Microsoft", "Abraham Lincoln", "A3", "A4", "A5", "A6", "A7", "A8"],
    400:  ["Nokia", "Vlad the Impaler", "A3", "A4", "A5", "A6", "A7", "A8"],
    500:  ["Nike", "Catherine the Great", "A3", "A4", "A5", "A6", "A7", "A8"],
    600:  ["Samsung", "Treaty of Versailles", "A3", "A4", "A5", "A6", "A7", "A8"],
    700:  ["Burberry", "Australia?", "A3", "A4", "A5", "A6", "A7", "A8"],
    800:  ["Google", "Night Witches", "A3", "A4", "A5", "A6", "A7", "A8"],
    900:  ["Papa John's", "December 31", "A3", "A4", "A5", "A6", "A7", "A8"],
    1000: ["Louis Vuitton", "December 7, 1941", "A3", "A4", "A5", "A6", "A7", "A8"]
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
