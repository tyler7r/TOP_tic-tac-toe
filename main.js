const squares = document.querySelectorAll('.square');

const Gameboard = {
    gameSquare: ['X','X','X','X','O','X','X','X','X']
}


const Player = (marker, name) => {
    this.marker = marker;
    this.name = name;
}

const playerOne = Player('X', 'P1');
const playerTwo = Player('O', 'P2');

const gameFlow = () => {
    const p1Turn = true;

    const displayBoard = (array) => {
        for (let i = 0; i < array.length; i++) {
            const squareSelect = document.querySelector('#square-' + [i+1]);
            squareSelect.textContent = array[i];
        }
    }
    const checkPlayer = () => {

    }
    const playTurn = () => {   

    }
    const validatePlay = () => {

    }
    const winnerCheck = () => {

    }
    return { displayBoard, checkPlayer, playTurn, validatePlay, winnerCheck }
};

gameFlow().displayBoard(Gameboard.gameSquare);


