const startBtn = document.getElementById('startBtn')
const score = document.querySelectorAll('.score-display')
const gameBoard = document.getElementById('board')
let smallBtn = document.getElementById('small-board')
let medBtn = document.getElementById('med-board')
let largeBtn = document.getElementById('large-board')
let modalContainer = document.querySelector('.overlay')
let restart = document.querySelector('#restartBtn')
const allSquares = document.querySelectorAll('.gameSqaure')
let squares = []
let globalBoardSize = 'small'
let direction = -1
let width = 12
let scoreCount = 0
let speed = 0.96
let timerId = 0

let currentSnake = [65, 66, 67]

function startGame(size) {
  initialSnake =
    size === 'large'
      ? [189, 190, 191]
      : size === 'med'
      ? [119, 120, 121]
      : [65, 66, 67]
  squares[appleIndex].classList.remove('apple')
  console.log(initialSnake)
  currentSnake.map((x) => squares[x].classList.remove('snake'))
  currentSnake = initialSnake
  clearInterval(timerId)
  scoreCount = 0
  direction = -1
  score[0].textContent = scoreCount
  timeInterval = 500
  currentSnake.map((x) => squares[x].classList.add('snake'))
  generateApples()
  timerId = setInterval(move, timeInterval)
  largeBtn.disabled = true
  medBtn.disabled = true
  smallBtn.disabled = true
  console.log(width)
}

function resizeBoard(boardSize) {
  globalBoardSize = boardSize
  let newWidth = boardSize === 'large' ? 20 : boardSize === 'med' ? 16 : 12
  let classesToRemove =
    boardSize === 'large'
      ? ['board-med', 'board-small']
      : boardSize === 'med'
      ? ['board-large', 'board-small']
      : ['board-med', 'board-large']
  currentSnake.map((x) => squares[x].classList.remove('snake'))
  width = newWidth
  gameBoard.classList.add(`board-${boardSize}`)
  gameBoard.classList.remove(...classesToRemove)
  clearGrid()
  squares = []
  createGrid()
  resize()
}

function control(e) {
  e.keyCode === 39
    ? (direction = 1)
    : e.keyCode === 38
    ? (direction = -width)
    : e.keyCode === 37
    ? (direction = -1)
    : e.keyCode === 40
    ? (direction = width)
    : (direction = direction)
}

const createGrid = () => {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    square.classList.add('gameSquare')
    gameBoard.appendChild(square)
    squares.push(square)
  }
}

function clearGrid() {
  squares.forEach((item) => {
    item.remove()
  })
}

createGrid()

currentSnake.map((x) => squares[x].classList.add('snake'))

function move() {
  // game-over checker
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] - width < 0 && direction === -width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    squares[currentSnake[0] + direction].classList.contains('snake')
  ) {
    modalContainer.style.display = 'block'
    largeBtn.disabled = false
    medBtn.disabled = false
    smallBtn.disabled = false
    return clearInterval(timerId)
  }

  const tail = currentSnake.pop()
  squares[tail].classList.remove('snake')
  currentSnake.unshift(currentSnake[0] + direction)
  squares[currentSnake[0]].classList.add('snake')
  if (squares[currentSnake[0]].classList.contains('apple')) {
    squares[currentSnake[0]].classList.remove('apple')
    squares[tail].classList.add('snake')
    currentSnake.push(tail)
    generateApples()
    scoreCount += 50
    score.forEach((score) => (score.textContent = scoreCount)) // updating score in modal and main display
    clearInterval(timerId)
    if (timeInterval >= 60) {
      timeInterval *= speed //setting speed increase
    }
    timerId = setInterval(move, timeInterval)
    console.log(timeInterval)
  }
}

const generateApples = () => {
  do {
    appleIndex = Math.floor(Math.random() * squares.length)
  } while (squares[appleIndex].classList.contains('snake'))
  squares[appleIndex].classList.add('apple')
}

generateApples()

document.addEventListener('keydown', control)
startBtn.addEventListener('click', () => startGame(globalBoardSize))

restart.addEventListener('click', function () {
  modalContainer.style.display = 'none'
})

function resize() {
  generateApples()
  squares[appleIndex].classList.remove('apple')
  clearInterval(timerId)
  scoreCount = 0
  direction = 1
  score[0].textContent = scoreCount
  timeInterval = 500
}

smallBtn.addEventListener('click', () => {
  smallBtn.classList.add('selected')
  largeBtn.classList.remove('selected')
  medBtn.classList.remove('selected')
  resizeBoard('small')})

medBtn.addEventListener('click', () => {
  medBtn.classList.add('selected')
  smallBtn.classList.remove('selected')
  largeBtn.classList.remove('selected')
  resizeBoard('med')})

largeBtn.addEventListener('click', () => {
  largeBtn.classList.add('selected')
  smallBtn.classList.remove('selected')
  medBtn.classList.remove('selected')
  resizeBoard('large')})
