const squares = document.querySelectorAll('.square');
const gameboard = document.querySelector('.gameboard');
const menu = document.querySelector('.menu');
const initialLoad = document.querySelector('.initial-load');

const Gameboard = {
    gameSquare: ['', '', '', '', '', '', '', '', '']
}

const getGameSquare = Gameboard.gameSquare;


function Player(name, marker) {
    this.name = name;
    this.marker = marker;
}

let playerOne = ''
let playerTwo = '';

let p1Icon = '';
let p2Icon = '';

const gameFlow = () => {
    let currentTurn = 'p1';

    let gamePiece = '';

    let winningCombos = {};

    let winner = false;

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
                console.log('1');
                winner = true;
                return ('p1 wins');
            } else if (winningCombos[key] === p2Win) {
                winner = true;
                return ('p2 wins');
            }
        }
    }

    const tieCheck = () => {
       if (getGameSquare.every((currentValue) => currentValue !== '') && winner == false) {
        return true;
       }
    }

    const playTurn = (array) => {   
        squares.forEach((box) => {
            box.addEventListener('click', (e) => {
                console.log(e);
                checkPlayer();
                let selectedBox = Number(e.target.id.slice(7));
                if (validatePlay(e) == true) {
                    return
                };
                array[selectedBox - 1] = gamePiece;
                if (currentTurn === 'p1' ? currentTurn = 'p2' : currentTurn = 'p1'); 
                displayBoard(array);
                winnerCheck(array);
                if(tieCheck()) {
                    return ('tie');
                };
            })
        })
    }
    return { playTurn }
};

gameFlow().playTurn(getGameSquare);
console.log(p2_name.value)

//need to figure out how to pull value from radio buttons to determine marker symbol for each player

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
    menu.classList.remove('closeDisplay');
})


