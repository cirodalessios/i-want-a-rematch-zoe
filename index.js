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
          "A rich girl lets a poor artist freeze to death because she refuses to share a giant floating door.",
          "Q6","Q7","What are the five colors of the rings on the Olympic flag?"],
    300: ["Q1","Q2",
          "What slang phrase tells someone to get off the internet and reconnect with reality?",
          "What creepy sculpture with bulging eyes and a wide grin was supposedly part of a viral challenge that told kids to hurt themselves on WhatsApp and Youtube?  ",
          "A group of people spend 9 hours of screen time walking across a continent just to return a piece of jewelry.",
          "Q6","Q7","On what exact date (Day, Month, and Year) did the 21st Century technically begin?"],
    400: ["Q1","Q2",
          "What slang means to show off or brag about something?",
          "What does the Blue Whale curator order on the last day?  ",
          "An orphan spends seven years being bullied by a man with no nose who is weirdly obsessed with a teenager.",
          "Q6","Q7","What are the three official colors on the flag of Germany?"],
    500: ["Q1","Q2",
          "What slang means suddenly cutting off all communication with someone?",
          "What viral internet legend describes an infinite office-like space with old wet carpet smell, endless humming lights, and no escape?  ",
          "A depressed teenager has to choose between dating a 100-year-old corpse or a giant dog while a war happens in the woods.",
          "Q6","Q7","In what decade was the World Wide Web (WWW) actually invented?"],
    600: ["Q1","Q2",
          "What word describes outshining someone in looks when standing next to them?",
          "In Azerbaijani/Turkish urban legends, what evil spirit rides your chest while you sleep and brings nightmares? ",
          "A billionaire spends his inheritance on high-tech cosplay and military-grade gadgets to beat up the mentally ill.",
          "Q6","Q7","What is the only natural food that is biologically immortal and never expires?"],
    700: ["Q1","Q2",
          "What term describes someone who gained success mainly through family connections rather than merit?",
          "In Japanese urban legend, what does the Slit-Mouthed Woman ask victims before revealing her mouth?",
          "A health code violation becomes a world-class chef by pulling on a ginger man's hair like a puppet.",
          "Q6","Q7","How many keys are on a standard, full-sized grand piano?"],
    800: ["Q1","Q2",
          "What slang term describes giving someone excessive or cringey praise?",
          "What is the chilling phrase Jack the Killer whispers to his victims before attacking them?",
          "A teenager undergoes extreme, non-consensual body modification and gives up her literal voice just to chase a man she saw once.",
          "Q6","Q7","The first YouTube video ever uploaded features co-founder Jawed Karim at this place."],
    900: ["Q1","Q2",
          "You might get 'this' after seeing a romantic interest do something tiny but embarrassing, like running with a backpack?",
          "What taboo act must someone commit to become a skinwalker in Navajo legend? ",
          "A candy tycoon slowly eliminates a group of children one by one in front of their parents using a series of safety hazards.",
          "Q6","Q7","What is the only letter that does not appear in any of the 50 U.S. State names?"]
  },
  answers: {
    200: ["Diamonds","harry potter","GOAT","Slenderman","Titanic","Dove","Russian/Soviet","red, blue, green, yellow, black"],
    300: ["Die with a smile","pirates of caribbean","touch grass","Momo Challenge (or just Momo)","LOTR","BP","Afgan","1 January 2001"],
    400: ["7 rings","gravity falls","flex","to commit suicide","harry potter","Porsche","French","Black, Red, Gold"],
    500: ["wildflower","arcane","ghosting","the backrooms","Twilight","Nestle","Mexican","1980s"],
    600: ["as it was","game of thrones","mog (mogging)","karabasan","Batman","United Nations","Polish","honey"],
    700: ["summertime sadness","gumball","nepo baby","Am I pretty? (or Am I beautiful?)","Ratatouille","Nvidia","British","88"],
    800: ["lost on you","powerpuff girls","glazing","Go to sleep.","The Little Mermaid","Outlook","German","Zoo"],
    900: ["industry baby",
          "Euphoria","the ICK","Kill a close family member (or Murder a relative or Kill a sibling or parent)","Willy Wonka & the Chocolate factory","Hermes","Chinese","Q"]
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
