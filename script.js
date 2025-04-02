
let cells = document.querySelectorAll(".cell");
let resultContainer = document.querySelector(".resultContainer");
let result = document.querySelector("#result");
let newGameBtn = document.querySelector("#newGameBtn");
let resetScoreBtn = document.querySelector("#resetScoreBtn");
let turnIndicator = document.querySelector("#turnIndicator");
let varCount = 0;

let winX = document.querySelector("#winX");
let draw = document.querySelector("#draw");
let winY = document.querySelector("#winO");

let winCountX = 0;
let drawCount = 0;
let winCountO = 0;

let playerX = true;
let nextPlayerX = true; // X will start the first game

const clickSound = new Audio("assets/mouse-click-sound.mp3");
const drawSound = new Audio("assets/draw-sound.mp3");
const winSound = new Audio("assets/win-sound.mp3");

const winningPatterns = [
  // Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonal
  [0, 4, 8],
  [2, 4, 6],
];

// Loader
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  const mainContent = document.querySelector(".container");
  if (loader && mainContent) {
    setTimeout(() => {
      loader.classList.add("hide-loader");
      mainContent.classList.remove("hide-content");
    }, 1500);
  }
});

// Cell click event
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (cell.innerText !== "") return;

    clickSound.currentTime = 0;
    clickSound.play();

    if (playerX === true) {
      cell.innerText = "X";
      cell.style.color = "#72CFF9";
      cell.style.textShadow = "0 0 1rem rgba(114, 207, 249, 0.5)";
      playerX = false;
    } else {
      cell.innerText = "O";
      cell.style.color = "#DCBF3F";
      cell.style.textShadow = "0 0 1rem rgba(220, 191, 63, 0.5)";
      playerX = true;
    }
    varCount++;
    updateTurnIndicator();
    checkWinner();
  });
});

// Check for a winner or a draw
const checkWinner = () => {
  for (let pattern of winningPatterns) {
    let pos1 = cells[pattern[0]].innerText;
    let pos2 = cells[pattern[1]].innerText;
    let pos3 = cells[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        displayWinner(pos1);
        return;
      }
    }
  }
  if (varCount === 9) {
    drawCount++;
    displayDrawResult();
  }
};

// Display winner and toggle starting player for next game
const displayWinner = (winner) => {
  result.innerText = `Game Over. Player ${winner} wins!`;
  winSound.currentTime = 0;
  winSound.play();
  resultContainer.classList.remove("hide");
  turnIndicator.innerText = "";
  disableAllCells();
  newGameBtn.innerText = "Play Again";
  if (winner === "X") {
    winCountX++;
    winX.innerText = winCountX;
  } else {
    winCountO++;
    winY.innerText = winCountO;
  }
  // Toggle nextPlayerX so that the starting player alternates next time.
  nextPlayerX = !nextPlayerX;
};

// Display draw and toggle starting player for next game
const displayDrawResult = () => {
  result.innerText = `Game Drawn!`;
  drawSound.currentTime = 0;
  drawSound.play();
  resultContainer.classList.remove("hide");
  disableAllCells();
  draw.innerText = drawCount;
  newGameBtn.innerText = "Play Again";
  turnIndicator.innerText = "";
  nextPlayerX = !nextPlayerX;
};

// Disable all cells (used when game ends)
const disableAllCells = () => {
  cells.forEach((cell) => {
    cell.disabled = true;
  });
};

// Enable all cells and clear text (used when starting a new game)
const enableAllCells = () => {
  cells.forEach((cell) => {
    cell.disabled = false;
    cell.innerText = "";
  });
};

// Reset scores and start a new game
const resetScore = () => {
  winCountX = 0;
  drawCount = 0;
  winCountO = 0;
  winX.innerText = winCountX;
  draw.innerText = drawCount;
  winY.innerText = winCountO;

  nextPlayerX = true;
  playerX = nextPlayerX;
  enableAllCells();
  resultContainer.classList.add("hide");
  varCount = 0;
  newGameBtn.innerText = "New Game";
  updateTurnIndicator();
};

resetScoreBtn.addEventListener("click", () => {
  resetScore();
});

// Start a new game using the starting player from nextPlayerX.
const newGame = () => {
  playerX = nextPlayerX;
  enableAllCells();
  resultContainer.classList.add("hide");
  varCount = 0;
  newGameBtn.innerText = "New Game";
  updateTurnIndicator();
};

newGameBtn.addEventListener("click", () => {
  newGame();
});

// Update the turn indicator on the screen
const updateTurnIndicator = () => {
  if (playerX) {
    turnIndicator.innerText = "Player X's Turn";
    turnIndicator.style.color = "#72CFF9";
  } else {
    turnIndicator.innerText = "Player O's Turn";
    turnIndicator.style.color = "#DCBF3F";
  }
};

updateTurnIndicator();
