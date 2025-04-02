
let cells = document.querySelectorAll(".cell");
let resultContainer = document.querySelector(".resultContainer");
let result = document.querySelector("#result");
let newGameBtn = document.querySelector("#newGameBtn");
let resetScoreBtn = document.querySelector("#resetScoreBtn");
let varCount = 0;

let winX = document.querySelector("#winX");
let draw = document.querySelector("#draw");
let winY = document.querySelector("#winO");

let winCountX = 0;
let drawCount = 0;
let winCountO = 0;

let playerX = true;

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
]

// Loader
window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    const mainContent = document.querySelector(".container"); // Targeting the correct container

    if (loader && mainContent) {
        setTimeout(() => {
            loader.classList.add("hide-loader");
            mainContent.classList.remove("hide-content"); // Show the game content
        }, 1500);
    }
});

cells.forEach( (cell) => {
    cell.addEventListener("click",  () => {
        if (cell.innerText !== "") return;

        if (playerX === true) {
            cell.innerText = "X";
            cell.style.color = "#72CFF9"; 
            cell.style.textShadow = "0 0 1rem rgba(114, 207, 249, 0.5)";
            playerX = false;
            varCount++;
        } else {
            cell.innerText = "O";
            cell.style.color = "#DCBF3F";
            cell.style.textShadow = "0 0 1rem rgba(220, 191, 63, 0.5)";
            playerX = true;
            varCount++;
        }
        cell.disabled = true;
        checkWinner();
    })
})

const checkWinner = () => {
    for (let pattern of winningPatterns) {
        let pos1 = cells[pattern[0]].innerText;
        let pos2 = cells[pattern[1]].innerText;
        let pos3 = cells[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
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
}

const displayWinner = (winner) => {
    result.innerText = `Game Over. Player ${winner} wins!`;
    resultContainer.classList.remove("hide");
    disableAllCells();
    newGameBtn.innerText = "Play Again";
    if (winner === "X") {
        winCountX++
        winX.innerText = winCountX;
    } else {
        winCountO++
        winO.innerText = winCountO;
    }
}

const displayDrawResult = () => {
    result.innerText = `Game Drawn!`;
    resultContainer.classList.remove("hide");
    disableAllCells();
    draw.innerText = drawCount;
    newGameBtn.innerText = "Play Again";
}

const disableAllCells = () => {
    for (let cell of cells) {
        cell.disabled = true;
    }
}

const enableAllCells = () => {
    for (let cell of cells) {
        cell.disabled = false;
        cell.innerText = "";
    }
}

const resetScore = () => {
    playerX = true;
    enableAllCells();
    resultContainer.classList.add("hide");
    varCount = 0;
    newGameBtn.innerText = "New Game";
}

resetScoreBtn.addEventListener("click", () => {
    resetScore();
    winCountX = 0; drawCount = 0; winCountO = 0;
    winX.innerText = winCountX;
    draw.innerText = drawCount;
    winO.innerText = winCountO;
})

const newGame = () => {
    playerX = true;
    enableAllCells();
    resultContainer.classList.add("hide");
    varCount = 0;
    newGameBtn.innerText = "New Game";
}

newGameBtn.addEventListener("click", () => {
    newGame();
})