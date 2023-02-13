const squares = document.querySelectorAll('.square');

const Gameboard = {
    gameSquare: []
}


function Player(marker, name) {
    this.marker = marker;
    this.name = name;
}

const playerOne = new Player('X', 'P1');
const playerTwo = new Player('O', 'P2');

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
    const validatePlay = () => {

    }
    const winnerCheck = () => {

    }
    const playTurn = () => {   
        squares.forEach((box) => {
            box.addEventListener('click', (e) => {
                let selectedBox = Number(e.target.id.slice(7));
                Gameboard.gameSquare[selectedBox - 1] = playerOne.marker;
                displayBoard(Gameboard.gameSquare);
            })
        })
    }
    return { checkPlayer, playTurn, validatePlay, winnerCheck, displayBoard }
};

gameFlow().playTurn();


