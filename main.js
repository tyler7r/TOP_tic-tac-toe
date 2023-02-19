const squares = document.querySelectorAll('.square');
const gameboard = document.querySelector('.gameboard');
const initialLoad = document.querySelector('.form');
const winnerDisplay = document.querySelector('.winnerDisplay');

const Gameboard = {
    gameSquare: ['', '', '', '', '', '', '', '', '']
}

const getGameSquare = Gameboard.gameSquare;


function Player(name, marker) {
    this.name = name;
    this.marker = marker;
}

let vsComputer = false;
let vsEasyAI = false;

let playerOne = ''
let playerTwo = '';

let p1Icon = '';
let p2Icon = '';

const gameFlow = () => {
    let currentTurn = 'p1';

    let gamePiece = '';

    let winningCombos = {};

    let winner = false;

    let emptySquares = [];

    const easyAI = (array) => {
        for (i = 0; i < array.length; i++) {
            if (array[i] === '') {
                emptySquares.push([i]);
            }
        } 
        let randomChoice = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        array[randomChoice] = playerTwo.marker;
        displayBoard(array);
        emptySquares = [];
    }
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
        if (e.target.textContent == playerOne.marker || e.target.textContent == playerTwo.marker) {
            return true
        }
    }

    const winnerCheck = (array) => {
        winningCombos.rowOne = array[0] + array[1] + array[2];
        winningCombos.rowTwo = array[3] + array[4] + array[5];
        winningCombos.rowThree = array[6] + array[7] + array[8];
        winningCombos.columnOne = array[0] + array[3] + array[6];
        winningCombos.columnTwo = array[1] + array[4] + array[7];
        winningCombos.columnThree = array[2] + array[5] + array[8];
        winningCombos.diagonalOne = array[0] + array[4] + array[8];
        winningCombos.diagonalTwo = array[2] + array[4] + array[6];
        for (let key in winningCombos) {
            const p1Win = `${playerOne.marker}${playerOne.marker}${playerOne.marker}`
            const p2Win = `${playerTwo.marker}${playerTwo.marker}${playerTwo.marker}`
            if (winningCombos[key] === p1Win){
                winner = true;
                return ('p1');
            } else if (winningCombos[key] === p2Win) {
                winner = true;
                return ('p2');
            }
        }
    }

    const tieCheck = () => {
       if (getGameSquare.every((currentValue) => currentValue !== '') && winner == false) {
        return true;
       }
    }

    const resetBoard = (array) => {
        currentTurn = 'p1';
        winner = false;
        for (i = 0; i < array.length; i++) {
            array[i] = ''
            displayBoard(array);
        }
    }

    const endGameDisplay = (array) => {
        const congrats = document.querySelector('.congrats');
        if (winnerCheck(array) === 'p1') {
         congrats.textContent = `${playerOne.name} (${playerOne.marker}) Wins`;
        } else if (winnerCheck(array) === 'p2') {
         congrats.textContent = `${playerTwo.name} (${playerTwo.marker}) Wins`;
        } else {
            congrats.textContent = "It's a TIE"
        }
        const playAgain = document.querySelector('.playAgain');
        playAgain.addEventListener('click', () => {
            resetBoard(array);
            winnerDisplay.classList.add('closeDisplay');
        })
        const changeSettings = document.querySelector('.changeSettings')
        changeSettings.addEventListener('click', () => {
            resetBoard(array);
            winnerDisplay.classList.add('closeDisplay');
            initialLoad.classList.remove('closeDisplay');
            gameboard.classList.add('closeDisplay');
        })
     }

    const playTurn = (array) => {   
        squares.forEach((box) => {
            box.addEventListener('click', (e) => {
                let selectedBox = Number(e.target.id.slice(7));
                if (validatePlay(e) == true) {
                    return
                }
                if (vsComputer === false && winner === false) {
                    checkPlayer();
                    array[selectedBox -1] = gamePiece;
                    if (currentTurn === 'p1' ? currentTurn = 'p2' : currentTurn = 'p1');
                    displayBoard(array);
                } else if (vsComputer === true && vsEasyAI === true && winner === false) {
                    array[selectedBox - 1] = playerOne.marker;
                    displayBoard(array);
                    if (winnerCheck(array) !== 'p1') {
                        setTimeout(() => {
                            easyAI(array);
                            winnerCheck(array);
                            if (winner || tieCheck()) {
                                winnerDisplay.classList.remove('closeDisplay');
                                endGameDisplay(array);
                            }
                        }, 300);
                    }
                }
                winnerCheck(array);
                if (winner || tieCheck()) {
                    winnerDisplay.classList.remove('closeDisplay');
                    endGameDisplay(array);
                }
                if (winner == true) {
                    return
                }
            })
        })
    }
    return { playTurn }
};

gameFlow().playTurn(getGameSquare);

const submitBtn = document.querySelector('.submit');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let btns = document.getElementsByName('icon');
    function radioCheck() {
        btns.forEach((button) => {
            if(button.checked === true) {
                p1Icon = button.value;
            } else if (button.checked === false) {
                p2Icon = button.value;
            }
        })
    }
    radioCheck();
    playerOne = new Player(document.getElementById('p1_name').value, p1Icon);
    playerTwo = new Player(document.getElementById('p2_name').value, p2Icon);
    console.log(playerOne, playerTwo);
    initialLoad.classList.add('closeDisplay');
    gameboard.classList.remove('closeDisplay');
})

const modeBtns = document.getElementsByName('gameMode');
modeBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
        let player2 = document.querySelector('.player2');
        if (e.target.id === 'easy') {
            player2.classList.add('closeDisplay')
            vsComputer = true;
            vsEasyAI = true;
        } else if (e.target.id === '2P') {
            player2.classList.remove('closeDisplay');
            vsComputer = false;
            vsEasyAI = false;
        }
    })
})




