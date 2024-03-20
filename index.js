

const cells = document.querySelectorAll(".cell"); //list representing each cell
const statusText = document.querySelector("#statusText");// status text like x's turn

/**
 * The three buttons
 */
const restartBtn = document.querySelector("#restartBtn");
const resetBtn = document.querySelector('#resetBtn')
const changeBg = document.querySelector('#changeBgBtn')


/**
 * The scores
 */
const xResult = document.querySelector('.js-x')
const oResult = document.querySelector('.js-o')
const drawResult = document.querySelector('.js-draw')

/**Array for changing the background image */
const backgroundImages = [
    'image/florian-olivo.jpg',
    'image/jonathan-petersson.jpg',
    'image/kamil-s.jpg',
    'image/pedro-henrique-santos.jpg',
    'image/uriel-soberanes.jpg',
]
const photographer = document.querySelector('.js-photographer-name')
let imageIndex = 0;


const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

let score = JSON.parse(localStorage.getItem('score')) || {
    xWin : 0,
    oWin : 0,
    draw: 0,
}

initializeGame();
updateScore();
resetBtn.addEventListener('click', resetScore)
changeBg.addEventListener('click', changeBackgroundImage)
setInterval(changeBackgroundImage, 10000)


function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("Index");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        if(currentPlayer === "X"){
            score.xWin++;
            xResult.innerHTML = score.xWin;
            localStorage.setItem('score', JSON.stringify(score))
            }
        if(currentPlayer === 'O'){ 
            score.oWin++;
            oResult.innerHTML = score.oWin;
            localStorage.setItem('score', JSON.stringify(score))
        }

        

        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        score.draw++;
        localStorage.setItem('score', JSON.stringify(score))
        drawResult.innerHTML = score.draw;
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

function updateScore(){
    xResult.innerHTML = score.xWin 
    oResult.innerHTML =  score.oWin
    drawResult.innerHTML = score.draw
}

function resetScore(){
    localStorage.removeItem('score');
    score.xWin = 0;
    score.oWin = 0;
    score.draw = 0
    updateScore()
}

function changeBackgroundImage(){
    const body = document.body
    body.style.backgroundImage = `url('${backgroundImages[imageIndex]}')`
    let imageName = backgroundImages[imageIndex].split('/').pop();
    let imageN = imageName.split('.')[0].replace(/-/g, ' ')
    photographer.innerHTML = imageN;
    imageIndex = (imageIndex + 1) % backgroundImages.length
}



