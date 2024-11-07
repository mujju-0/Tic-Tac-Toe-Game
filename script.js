let currentPlayer = 'X'; // Start with Player X
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Empty board
let gameActive = true;

const buttons = document.querySelectorAll('#main_div button');

function handleClick(event) {
    const index = event.target.id.split('-')[1];
    
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        
        if (checkWinner()) {
            alert(`${currentPlayer} wins!`);
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            alert('It\'s a draw!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

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

buttons.forEach(button => button.addEventListener('click', handleClick));
