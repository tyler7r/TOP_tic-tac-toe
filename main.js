const squares = document.querySelectorAll('.square');

const Gameboard = {
    gameSquare: []
}

const getGameSquare = Gameboard.gameSquare;

function Player(marker, name) {
    this.marker = marker;
    this.name = name;
}

const playerOne = new Player('X', 'P1');
const playerTwo = new Player('O', 'P2');

const gameFlow = () => {
    let currentTurn = 'p1';

    let gamePiece = '';

    const displayBoard = (array) => {
        for (let i = 0; i < array.length; i++) {
            const squareSelect = document.querySelector('#square-' + [i+1]);
            squareSelect.textContent = array[i];
        }
    }
    const checkPlayer = () => {
        if (currentTurn === 'p1') {
            gamePiece = playerOne.marker;
        } else if (currentTurn === 'p2') {
            gamePiece = playerTwo.marker;
        }
    }
    const validatePlay = (e) => {
        if (e.target.textContent == 'X' || e.target.textContent == 'O') {
            return true
        }
    }

    const winnerCheck = () => {

    }
    const playTurn = () => {   
        squares.forEach((box) => {
            box.addEventListener('click', (e) => {
                checkPlayer();
                let selectedBox = Number(e.target.id.slice(7));
                if (validatePlay(e) == true) {
                    return
                };
                getGameSquare[selectedBox - 1] = gamePiece;
                if (currentTurn === 'p1' ? currentTurn = 'p2' : currentTurn = 'p1'); 
                displayBoard(getGameSquare);
            })
        })
    }
    return { checkPlayer, playTurn, validatePlay, winnerCheck, displayBoard }
};

gameFlow().playTurn();


