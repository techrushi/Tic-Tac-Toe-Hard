const board = document.querySelector('.board');
let currentPlayer = 'X';
let winner = null;
const cells = Array.from({ length: 9 }).fill(null); // Initializes the board with 9 empty cells
const gameStatusElement = document.getElementById('gameStatus');
const resetButton = document.getElementById('resetButton');

// Function to check the winner

function checkWinner() {
  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

// Function to handle a cell click

function handleCellClick(index, cellElement) {
 
  // Check if game has a winner or the cell is already filled

  if (winner || cells[index]) return;

  // Update the clicked cell with the current player's symbol

  cells[index] = currentPlayer;
  cellElement.textContent = currentPlayer; // Update the cell display

  winner = checkWinner();

  if (winner) {
    setTimeout(() => {
      gameStatusElement.innerText = `Player ${winner} wins!`;
      alert(`Player ${winner} wins!`);
    }, 100);
  } else if (!cells.includes(null)) {
    setTimeout(() => {
      gameStatusElement.innerText = "It's a tie!";
      alert("It's a tie!");
    }, 100);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    gameStatusElement.innerText = `Player ${currentPlayer}'s turn`; // Update game status
  }
}

// Function to render the board and cells

function render() {
  board.innerHTML = ''; // Clear the board before rendering
  cells.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell'); 
    cell.textContent = value || ''; 
    cell.addEventListener('click', () => handleCellClick(index, cell)); 
    board.appendChild(cell); 
  });
}

// Function to reset the game

function resetGame() {
  cells.fill(null); 
  currentPlayer = 'X'; 
  winner = null; 
  gameStatusElement.innerText = "Player X's turn"; 
  render(); 
}

// Add an event listener to the reset button

resetButton.addEventListener('click', resetGame);

// Initial rendering of the game board

render();
