const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');

let currentPlayer = 'X';
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    showPopup(`${currentPlayer} wins!`);
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    showPopup("It's a draw!");
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Turn: ${currentPlayer}`;
  }
}

function checkWin() {
  return winPatterns.some(pattern => {
    return pattern.every(index => board[index] === currentPlayer);
  });
}

function showPopup(message) {
  popupMessage.textContent = message;
  popup.classList.remove('hidden');
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Turn: ${currentPlayer}`;
  cells.forEach(cell => cell.textContent = "");
  popup.classList.add('hidden');
}
