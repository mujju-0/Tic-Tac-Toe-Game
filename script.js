 let currentPlayer = 'X'; // Start with Player X
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Empty board
let gameActive = false; // Game should not be active until the "Start Game" button is clicked
let playerX = 0;
let playerY = 0;

const buttons = document.querySelectorAll('#main_div button');
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const messageDiv = document.getElementById('message');

// Handle the start button click
startButton.addEventListener('click', () => {
    gameActive = true;
    gameBoard = ['', '', '', '', '', '', '', '', '']; // Reset the game board
    currentPlayer = 'X'; // Reset to player X
    messageDiv.textContent = ''; // Clear message
    buttons.forEach(button => button.textContent = ''); // Reset button labels
    restartButton.disabled = false; // Enable restart button
});

// Handle the restart button click
restartButton.addEventListener('click', () => {
    gameActive = true;
    gameBoard = ['', '', '', '', '', '', '', '', '']; // Reset the game board
    playerX = 0;
    playerY = 0;
    Score(playerX, playerY)
    currentPlayer = 'X'; // Reset to player X
    messageDiv.textContent = ''; // Clear message
    buttons.forEach(button => button.textContent = ''); // Reset button labels
});

// Handle individual button clicks
function handleClick(event) {
    const index = event.target.id.split('-')[1];

    // If the cell is empty and the game is active
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        // Check for winner after each move
        if (checkWinner()) {
            messageDiv.textContent = `${currentPlayer} wins!`; // Display winner
            playerX = 'X' === currentPlayer ? ++playerX : playerX;
            playerY = 'O' === currentPlayer ? ++playerY : playerY;
            Score(playerX, playerY)
            gameActive = false; // End the game
            restartButton.disabled = false; // Enable restart button
        } else if (gameBoard.every(cell => cell !== '')) {
            messageDiv.textContent = 'It\'s a draw!'; // Display draw if all cells are filled
            gameActive = false; // End the game
            restartButton.disabled = false; // Enable restart button
        } else {
        if(currentPlayer === 'X'){
            currentPlayer = 'O';
            messageDiv.textContent = "Player O's turn" 
        } 
        else{
            currentPlayer = 'X'
            messageDiv.textContent = "Player X's turn" 
        }
        }
    }
}

// Check for winning conditions
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => gameBoard[index] === currentPlayer);
    });
}

function Score(playerX, playerY){
    let scoreX = document.getElementById('x');
    let scoreY = document.getElementById('y');
    scoreX.textContent = playerX;
    scoreY.textContent = playerY;
}

// Add event listeners to the buttons
buttons.forEach(button => button.addEventListener('click', handleClick));
