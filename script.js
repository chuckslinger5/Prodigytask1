let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = false;
let playerXName = "Player X";
let playerOName = "Player O";
let isAgainstAI = false;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const boardContainer = document.getElementById("board");
const restartBtn = document.getElementById("restartBtn");

cells.forEach(cell => {
  cell.addEventListener("click", () => handleCellClick(cell));
});

function startGame() {
  const nameX = document.getElementById("playerX").value.trim();
  const nameO = document.getElementById("playerO").value.trim();
  const mode = document.getElementById("modeSelect").value;

  playerXName = nameX || "Player X";
  playerOName = nameO || (mode === "ai" ? "AI" : "Player O");

  isAgainstAI = mode === "ai";
  currentPlayer = "X";
  isGameActive = true;
  board = ["", "", "", "", "", "", "", "", ""];

  cells.forEach(cell => {
    cell.textContent = "";
  });

  statusText.textContent = `${playerXName}'s Turn (X)`;
  boardContainer.style.display = "grid";
  restartBtn.style.display = "inline-block";
  document.getElementById("namePanel").style.display = "none";
}

function handleCellClick(cell) {
  const index = cell.dataset.index;
  if (board[index] !== "" || !isGameActive) return;

  makeMove(index, currentPlayer);

  if (!isGameActive || !isAgainstAI || currentPlayer !== "O") return;

  setTimeout(() => {
    const aiMove = getBestMove();
    if (aiMove !== -1) makeMove(aiMove, "O");
  }, 500);
}

function makeMove(index, player) {
  if (board[index] !== "") return;

  board[index] = player;
  cells[index].textContent = player;

  if (checkWinner()) {
    const winnerName = player === "X" ? playerXName : playerOName;
    statusText.textContent = `${winnerName} Wins! 🎉`;
    isGameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a Draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  const nextName = currentPlayer === "X" ? playerXName : playerOName;
  statusText.textContent = `${nextName}'s Turn (${currentPlayer})`;
}

function getBestMove() {
  const availableIndices = board
    .map((val, i) => (val === "" ? i : null))
    .filter(i => i !== null);
  if (availableIndices.length === 0) return -1;
  return availableIndices[Math.floor(Math.random() * availableIndices.length)];
}

function checkWinner() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer;
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;

  cells.forEach(cell => (cell.textContent = ""));
  statusText.textContent = `${playerXName}'s Turn (X)`;
}