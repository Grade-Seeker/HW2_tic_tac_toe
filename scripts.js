let playerName = '';
let wins = 0;
let winRate = 0;
let totalGames = 0;
let board = Array(9).fill(null);
let playerTurn = true;

// Login
function login() {
  const usernameInput = document.getElementById('username').value;
  if (usernameInput) {
    playerName = usernameInput;
    document.getElementById('player-name').textContent = playerName;
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('homepage').style.display = 'block';
  }
}

// Start match making
function startMatch() {
  document.getElementById('match-status').textContent = 'Looking for an opponent...';
  document.getElementById('match-button').disabled = true;

  setTimeout(() => {
    document.getElementById('match-status').textContent = 'Match Found';
    setTimeout(() => {
      startGame();
    }, 1000);
  }, 3000);
}

// Start game
function startGame() {
  board = Array(9).fill(null);
  playerTurn = true;
  
  // Set player name in the game screen
  document.getElementById('player1-name').textContent = playerName;
  
  updateGameStatus('Your Turn');
  document.getElementById('homepage').style.display = 'none';
  document.getElementById('game-page').style.display = 'block';
  updateBoard();
}

// Player's move
function playerMove(index) {
  if (playerTurn && !board[index]) {
    board[index] = 'X';
    updateBoard(); // Update the board right after the move

    if (!checkWinner()) {
      playerTurn = false; // Only switch turns if no winner
      setTimeout(npcMove, 1000); // NPC makes a move after a 1-second delay
      updateGameStatus('Wait for your opponent');
    }
  }
}

// NPC's move
function npcMove() {
  const availableMoves = board.map((val, index) => (val === null ? index : null)).filter(val => val !== null);
  const npcMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  board[npcMove] = 'O';
  updateBoard(); // Update the board right after the NPC move

  if (!checkWinner()) {
    playerTurn = true; // Switch back to player turn only if no winner
    updateGameStatus('Your Turn');
  }
}


// Update game board
function updateBoard() {
  document.querySelectorAll('.grid-item').forEach((cell, index) => {
    cell.innerHTML = ''; // Clear the cell first
    if (board[index] === 'X') {
      cell.innerHTML = '<img src="x.png" alt="X">';
    } else if (board[index] === 'O') {
      cell.innerHTML = '<img src="o.png" alt="O">';
    }
  });
}


// Update game status
function updateGameStatus(status) {
  document.getElementById('game-status').textContent = status;
}

// Check for a winner or tie
function checkWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      endGame(board[a]);
      return true;
    }
  }

  if (!board.includes(null)) {
    endGame(null); // It's a tie
    return true;
  }

  return false;
}

// End game logic
function endGame(winner) {
  updateBoard(); // Ensure board is up-to-date before showing the result
  
  setTimeout(() => {
    if (winner === 'X') {
      wins++;
      totalGames++;
      alert('You won!');
    } else if (winner === 'O') {
      totalGames++;
      alert('NPC won!');
    } else {
      // Ignore tie games
      // totalGames++;
      alert('It\'s a tie!');
    }

    updateStats();
    document.getElementById('game-page').style.display = 'none';
    document.getElementById('homepage').style.display = 'block';
  }, 100); // Short delay (100ms) to ensure the DOM is updated
}


// Update Wins and Win Rate
function updateStats() {
  const winRate = totalGames ? ((wins / totalGames) * 100).toFixed(2) : 0;
  document.getElementById('wins').textContent = wins;
  document.getElementById('win-rate').textContent = `${winRate}%`;

  //Reset elements
  document.getElementById('match-status').textContent = '';
  document.getElementById('match-button').disabled = false;
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 使用示例
async function demo() {
  console.log("开始等待...");
  await wait(2000); // 等待2秒
  console.log("等待结束!");
}