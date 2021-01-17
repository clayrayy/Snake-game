const startBtn = document.getElementById("startBtn");
const score = document.querySelectorAll(".score-display");
const gameBoard = document.getElementById("board")
let modalContainer = document.querySelector(".overlay");
let restart = document.querySelector("#restartBtn")
let squares = [];
let currentSnake = [189, 188, 187];
let direction = 1;
let width = 20;
let timeInterval = 1000;
let scoreCount = 0;
let speed = .9;
let timerId = 0;

function startGame() {
    squares[appleIndex].classList.remove('apple')
    currentSnake.map(x => squares[x].classList.remove('snake'))
    clearInterval(timerId)
    currentSnake = [189, 188, 187];
    scoreCount = 0;
    direction = 1;
    score[0].textContent = scoreCount
    timeInterval = 1000;
    currentSnake.map(x => squares[x].classList.add('snake'))
    generateApples()
    timerId = setInterval(move, timeInterval)
}

let count = 0;


function control(e) {
    e.keyCode === 39 ?
        direction = 1 :
        e.keyCode === 38 ?
            direction = -20 :
            e.keyCode === 37 ?
                direction = -1 :
                e.keyCode === 40 ?
                    direction = 20 :
                    direction = direction;
}

const createGrid = () => {
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement("div")
        square.classList.add("gameSquare")
        gameBoard.appendChild(square)
        squares.push(square)
    }
}
createGrid()

currentSnake.map(x => squares[x].classList.add("snake"))

function move() {

    // game-over checker
    if (
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        modalContainer.style.display = "block";
        return clearInterval(timerId)

    }

    const tail = currentSnake.pop()
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction)
    squares[currentSnake[0]].classList.add('snake')
    if (squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add("snake")
        currentSnake.push(tail)
        generateApples()
        scoreCount += 50;
        score.forEach(score => score.textContent = scoreCount) // updating score in modal and main display
        clearInterval(timerId);
        timeInterval *= speed; //setting speed increase
        timerId = setInterval(move, timeInterval)
    }

}




addEventListener("keypress", function (e) {
    if (e.key === "s") {
        direction = 10;
    }
})
const generateApples = () => {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add("apple")

}

generateApples()

document.addEventListener("keydown", control)
startBtn.addEventListener("click", startGame)



restart.addEventListener("click", function () {
    modalContainer.style.display = "none";
})