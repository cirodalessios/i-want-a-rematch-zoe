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
           "This law, formulated by Charles Darwin and Alfred Russel Wallace, explains how species evolve over generations.", 
           "Joy, Fear, Anger, Disgust, and Sadness guide whose emotions in Inside Out?", 
           "Used to honor someone’s skill, this Japanese word means “master” and often follows a name.", 
           "Q6?", 
           "Q7?", 
           "Q8?"],
    200:  ["This soda brand launched the “Share a _” campaign featuring people's names on bottles.", 
           "Cleopatra, the famed queen known for her charm and diplomacy, belonged to which ethnic group?", 
           "The fastest thing in the universe, traveling at approximately 299,792 km/s.", 
           "What were the last words said by Thanos in Avengers: Endgame? ", 
           "What does the phrase ‘kick the bucket’ mean?", 
           "Q6?", 
           "Q7?", 
           "Q8?"],
    300:  ["This company began in 1975 inside a garage and later became the world’s largest software maker.", 
           "Which U.S. president issued the Emancipation Proclamation freeing enslaved people in 1863?", 
           "The first electronic general-purpose computer, completed in 1945, was called?", 
           "What is the antagonist’s name from ‘The Little Mermaid’?", 
           "What Spanish phrase means “see you later” and became famous because of Terminator 2?", 
           "Q6?", 
           "Q7?", 
           "Q8?"],
    400:  ["This smartphone brand came before Apple and Samsung – and was the global leader in the 2000s, but disappeared after failing to adapt to touchscreens.", 
           "Which 15th-century Wallachian prince inspired the legend of a famous vampire due to his fierce reputation?", 
           "What was the name of the first nuclear bomb test conducted by J. Robert Oppenheimer and the Manhattan Project in 1945", 
           "What is Happy Hogan’s phone password in Spider-Man: Far from Home?  ", 
           "What does “YOLO” mean?", 
           "Q6?", 
           "Q7?", 
           "Q8?"],
    500:  ["This sports brand is named after a Greek goddess of victory.", 
           "This Russian empress corresponded with Voltaire and Diderot and promoted legal, educational, and cultural reforms inspired by Enlightenment ideas.", 
           "Who is considered the world’s first computer programmer?", 
           "What does the enchanted cake in ‘Brave’ turn Merida’s mother into?", 
           "What is the term for a word that has the opposite meaning of another word?", 
           "Q6?", 
           "Q7?", 
           "Q8?"],
    600:  ["This smartphone brand is named after an Indonesian word meaning “three stars.”", 
           "Which 1919 treaty officially ended World War I and imposed harsh penalties on Germany?", 
           "What is the subatomic particles that make up protons and neutrons? ", 
           "Which real-life political figure made a brief cameo in Home Alone 2: Lost in New York?", 
           "In slang, what does “AFK” stand for?", 
           "Q6?", 
           "Q7?", 
           "Q8?"],
    700:  ["This luxury brand destroyed millions of dollars of unsold clothes to keep their exclusivity.", 
           "Which country declared war on emus in 1932 — and lost the so‑called ‘Emu War’?", 
           "What's largest internal organ?", 
           "Which was the first-ever Disney Movie?", 
           "What is a person who loves books and reading called?", 
           "Q6?", 
           "Q7?", 
           "Q8?"],
    800:  ["“Don’t be evil” was once the unofficial motto of this company — until it was silently removed in 2018.", 
           "Which all-female Soviet pilots flew night bombing missions in plywood planes?", 
           "This type of star collapse leads to either a neutron star or a black hole.", 
           "In Mean Girls, what is the name of the high school girl group led by Regina George, known for their strict rules, stylish outfits, and social dominance?", 
           "Which word comes from the Latin word for 'salt,' because Roman soldiers were sometimes paid with it?", 
           "Q6?", 
           "Q7?", 
           "Q8?"],
    900:  ["This chain ran a promotion during a regional conflict, offering pizza and drinks in association with the salvation of a city, generating significant controversy.", 
           "On what date in 1989 did people dismantle the border fence and cross freely between Soviet Azerbaijan and Iran?", 
           "This famous conference, first held in 1911 in Brussels, gathered legendary physicists like Albert Einstein and Marie Curie to discuss quantum theory.", 
           "Which legendary ship, captained by Davy Jones, is cursed to sail the seas forever and can travel underwater in Pirates of the Caribbean?", 
           "a small character part in a play or film, played by a distinguished actor or a celebrity", 
           "Q6?", 
           "Q7?", 
           "Q8?"],
    1000: ["This luxury brand started by making trunks for traveling aristocrats in 1854.", 
           "Many historians mark this date — as the day the United States officially entered World War II. (answer with full date)", 
           "What is the main reason new planets don’t form in the asteroid belt?", 
           "In which movie does a missing woman reveal she orchestrated her own disappearance to frame her husband?", 
           "This German phrase, displayed at the entrance of the Auschwitz concentration camp as part of Nazi propaganda, translates to “Arbeit macht frei.”", 
           "Q6?", 
           "Q7?", 
           "Q8?"]
  },
  answers: {
    100:  ["Disney", "Renaissance", "natural selection", "Riley", "-sensei", "A6", "A7", "A8"],
    200:  ["Coca-Cola", "Macedonian Greek", "speed of light", "I am inevitable.", "‘to die’", "A6", "A7", "A8"],
    300:  ["Microsoft", "Abraham Lincoln", "ENIAC", "Ursula", "Hasta la vista", "A6", "A7", "A8"],
    400:  ["Nokia", "Vlad the Impaler", "the Trinity test", "Password", "you only live once", "A6", "A7", "A8"],
    500:  ["Nike", "Catherine the Great", "Ada Lovelace", "A bear", "antonym", "A6", "A7", "A8"],
    600:  ["Samsung", "Treaty of Versailles", "Quarks", "Donald Trump", "away from keyboard", "A6", "A7", "A8"],
    700:  ["Burberry", "Australia?", "Liver", "Snow White And The Seven Dwarfs", "bibliophile", "A6", "A7", "A8"],
    800:  ["Google", "Night Witches", "supernova", "The Plastics", "salary", "A6", "A7", "A8"],
    900:  ["Papa John's", "December 31", "Solvay", "The Flying Dutchman", "cameo", "A6", "A7", "A8"],
    1000: ["Louis Vuitton", "December 7, 1941", "Jupiter", "Gone Girl", "Work makes you free", "A6", "A7", "A8"]
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
