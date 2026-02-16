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
    "Music", "Soundtrack", "Slang", "Movies", 
    "Creepypasta", "Logos", "Propaganda", "Random"
  ],
  questions: {
   
    200:  ["Track name?",
           "Identify the movie from this musical theme.", 
           "Track name?",
           "Track name?",
           "Track name?",
           "Track name?",
           "Track name?",
           "Track name?",],
    300:  ["Track name?", 
           "Identify the movie from this musical theme.", 
           "Identify the movie from this musical theme.", 
           "Identify the movie from this musical theme.", 
           "Identify the movie from this musical theme.", 
           "Identify the movie from this musical theme.", 
           "Identify the movie from this musical theme.", 
           "Identify the movie from this musical theme."],
    400:  ["Track name?", 
           "Identify the movie from this musical theme.", 
           "What was the name of the first nuclear bomb test conducted by J. Robert Oppenheimer and the Manhattan Project in 1945", 
           "What is Happy Hogan’s phone password in Spider-Man: Far from Home?  ", 
           "What does “YOLO” mean?", 
           "In what year was the Ballon d’Or Féminin, awarded to the best female footballer in the world, given for the first time?", 
           "Q7?", 
           "Which color is the least used on national flags around the world due to its historical rarity and expense?"],
    500:  ["Track name?", 
           "Identify the movie from this musical theme.", 
           "Who is considered the world’s first computer programmer?", 
           "What does the enchanted cake in ‘Brave’ turn Merida’s mother into?", 
           "What is the term for a word that has the opposite meaning of another word?", 
           "Which country won the first ever FIFA World Cup in 1930?", 
           "Q7?", 
           "What animal kills the most humans each year? "],
    600:  ["Track name?", 
            "Identify the movie from this musical theme.", 
           "What is the subatomic particles that make up protons and neutrons? ", 
           "Which real-life political figure made a brief cameo in Home Alone 2: Lost in New York?", 
           "In slang, what does “AFK” stand for?", 
           "This Russian figure skater, known for her record-breaking jumps, is nicknamed 'The Russian Rocket'", 
           "Q7?", 
           "This American serial killer, known as the “Milwaukee Cannibal,” murdered at least 17 men and boys between 1978 and 1991."],
    700:  ["Track name?", 
            "Identify the movie from this musical theme.", 
           "What's largest internal organ?", 
           "Which was the first-ever Disney Movie?", 
           "What is a person who loves books and reading called?", 
           "What team owns the longest winning streak in NBA history?", 
           "Q7?", 
           "This river in the underworld must be crossed by souls, often aided by a ferryman named Charon."],
    800:  ["Track name?", 
            "Identify the movie from this musical theme.", 
           "This type of star collapse leads to either a neutron star or a black hole.", 
           "In Mean Girls, what is the name of the high school girl group led by Regina George, known for their strict rules, stylish outfits, and social dominance?", 
           "Which word comes from the Latin word for 'salt,' because Roman soldiers were sometimes paid with it?", 
           "In 2023, this volleyball star set a record for the fastest serve in women’s volleyball that year, hitting 112 km/h during the European Championship", 
           "Q7?", 
           "The three socially aversive personality traits that make up the Dark Triad, often linked to manipulation, lack of empathy, and self-interest."],
    900:  ["Track name?", 
            "Identify the movie from this musical theme.", 
           "This famous conference, first held in 1911 in Brussels, gathered legendary physicists like Albert Einstein and Marie Curie to discuss quantum theory.", 
           "Which legendary ship, captained by Davy Jones, is cursed to sail the seas forever and can travel underwater in Pirates of the Caribbean?", 
           "a small character part in a play or film, played by a distinguished actor or a celebrity", 
           "What is the record for red cards given in a single soccer game?", 
           "Q7?", 
           "How many Oscars did the Harry Potter film series win?"],
   
  },
  answers: {
  
    200:  ["Coca-Cola", "Macedonian Greek", "speed of light", "I am inevitable.", "‘to die’", "Imane Khelif / Iman Khalif", "gabriela", "1930"],
    300:  ["Microsoft", "Abraham Lincoln", "ENIAC", "Ursula", "Hasta la vista", "Soccer (football)", "mind over matter", "eggs"],
    400:  ["Nokia", "Vlad the Impaler", "the Trinity test", "Password", "you only live once", "2018", "your idol", "purple"],
    500:  ["Nike", "Catherine the Great", "Ada Lovelace", "A bear", "antonym", "Uruguay", "if we had each other", "The mosquito"],
    600:  ["Samsung", "Treaty of Versailles", "Quarks", "Donald Trump", "away from keyboard", "Alexandra Trusova", "spit in my face", "Jeffrey Dahmer"],
    700:  ["Burberry", "Australia?", "Liver", "Snow White And The Seven Dwarfs", "bibliophile", " Los Angeles Lakers", "the sound of silence", "River Styx"],
    800:  ["Google", "Night Witches", "supernova", "The Plastics", "salary", "Melissa Vargas", "when we were young", "narcissism, machiavellianism, and psychopathy"],
    900:  ["Papa John's", "December 31", "Solvay", "The Flying Dutchman", "cameo", "36", "wolf in sheep's clothing", "zero"],
    
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
