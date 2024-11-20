const programming_languages = [
  { word: "python", hint: "A popular programming language for AI and ML" },
  { word: "javascript", hint: "The language of the web" },
  { word: "mongodb", hint: "A NoSQL database" },
  { word: "json", hint: "A lightweight data-interchange format" },
  { word: "java", hint: "Write Once, Run Anywhere" },
  { word: "html", hint: "The backbone of web pages" },
  { word: "css", hint: "Responsible for web page styling" },
  { word: "c", hint: "The foundation of modern programming languages" },
  { word: "csharp", hint: "Microsoft's language for .NET development" },
  { word: "golang", hint: "Developed by Google for system programming" },
  { word: "kotlin", hint: "The preferred language for Android development" },
  { word: "php", hint: "A server-side scripting language" },
  { word: "sql", hint: "Language for managing databases" },
  { word: "ruby", hint: "A dynamic, open source programming language" }
];

let answer = '';
let hint = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
let wins = 0;
let losses = 0;
let timer;

// Select a random word
function randomWord() {
  const randomIndex = Math.floor(Math.random() * programming_languages.length);
  answer = programming_languages[randomIndex].word;
  hint = programming_languages[randomIndex].hint;
}

// Display keyboard
function generateButtons() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const buttonsHTML = alphabet.split('').map(letter => `
    <button
      class="btn btn-lg btn-primary m-1"
      id='${letter}'
      onClick="handleGuess('${letter}')"
    >
      ${letter}
    </button>
  `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

// Handle letter guesses
function handleGuess(chosenLetter) {
  if (guessed.indexOf(chosenLetter) === -1) {
    guessed.push(chosenLetter);
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (answer.includes(chosenLetter)) {
      document.getElementById(chosenLetter).classList.add('correct');
      guessedWord();
      checkIfGameWon();
    } else {
      document.getElementById(chosenLetter).classList.add('wrong');
      mistakes++;
      updateMistakes();
      checkIfGameLost();
      updateHangmanPicture();
    }
  }
}

// Update Hangman image
function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = `./images/${mistakes}.jpg`;
}

// Check if the game is won
function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
    wins++;
    document.getElementById('wins').innerText = wins;

    // Trigger confetti when the user wins
    triggerConfetti();

    clearInterval(timer);
  }
}

// Check if the game is lost
function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerText = `The answer was: ${answer}`;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
    losses++;
    document.getElementById('losses').innerText = losses;
    clearInterval(timer);
  }
}

// Show guessed word
function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.includes(letter) ? letter : " _ ")).join('');
  document.getElementById('wordSpotlight').innerText = wordStatus;
}

// Update mistakes
function updateMistakes() {
  document.getElementById('mistakes').innerText = mistakes;
}

// Reset game
function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';
  document.getElementById('hintText').innerText = '';
  startTimer();

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

// Show hint
function showHint() {
  document.getElementById('hintText').innerText = hint;
}

// Start timer
function startTimer() {
  let timeLeft = 60;
  document.getElementById('timer').innerText = timeLeft;
  clearInterval(timer);

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      checkIfGameLost();
    }
  }, 1000);
}

// Listen for keydown events to capture keyboard typing
document.addEventListener('keydown', function(event) {
  const letter = event.key.toLowerCase();  // Get the pressed key
  if (/[a-z]/.test(letter) && !guessed.includes(letter)) { // Check if it's a letter and hasn't been guessed
    handleGuess(letter); // Call the guess handler
  }
});

// Initialize game
document.getElementById('maxWrong').innerText = maxWrong;
randomWord();
generateButtons();
guessedWord();
startTimer();

// Confetti Blast on Win
function triggerConfetti() {
  // You can adjust the following parameters to customize the confetti appearance
  confetti({
    particleCount: 200,
    angle: 90,
    spread: 360,
    origin: { x: 0.5, y: 0.5 }, // Center of the screen
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffcc00'],
    gravity: 0.5,
    scalar: 1.2,
    shapes: ['circle', 'square']
  });
}
