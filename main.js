import './style.css';

document.querySelector('#app').innerHTML = `
  <pre id="food-config"></pre>
  <pre id="snake-config"></pre>
  <pre id="board"></pre>
`;

const boardWidth = 20;
const boardHeight = 16;
const board = document.getElementById('board');

const keyToDirection = {
  ArrowUp: { x: 0, y: -1 },
  ArrowRight: { x: 1, y: 0 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
};

const snake = {
  x: boardWidth / 2,
  y: boardHeight / 2,
  direction: { x: 1, y: 0 },
  length: 1,
  body: [],
};

let food = generateFood();

function generateFood() {
  return {
    x: Math.floor(Math.random() * boardWidth - 1) + 1,
    y: Math.floor(Math.random() * boardHeight - 1) + 1,
  };
}

function updateSnakeBody() {
  if (snake.length > 0) {
    snake.body.unshift({ x: snake.x, y: snake.y });

    if (snake.body.length > snake.length) {
      snake.body.pop();
    }
  }
}

function renderBoard() {
  let newBoard = '';

  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      if (x === snake.x && y === snake.y) {
        newBoard += '*';
      } else if (snake.body.some((part) => part.x === x && part.y === y)) {
        newBoard += '*';
      } else if (x === food.x && y === food.y) {
        newBoard += '+';
      } else {
        newBoard += ' ';
      }
    }
    newBoard += '\n';
  }

  board.textContent = newBoard;
}

function handleBoardBoundries(snake) {
  if (snake.x >= boardWidth) {
    snake.x = 0;
  }
  if (snake.x <= -1) {
    snake.x = boardWidth - 1;
  }

  if (snake.y >= boardHeight) {
    snake.y = 0;
  }

  if (snake.y <= -1) {
    snake.y = boardHeight - 1;
  }
}

function handleSnakeFoodCollision() {
  if (snake.x === food.x && snake.y === food.y) {
    food = generateFood();
    snake.length += 1;
  }
}

function gameLoop() {
  snake.x += snake.direction.x;
  snake.y += snake.direction.y;

  handleBoardBoundries(snake);
  handleSnakeFoodCollision();
  updateSnakeBody();

  renderBoard();
}

renderBoard();
let gameloop = setInterval(gameLoop, 150);

document.addEventListener('keydown', (e) => {
  if (keyToDirection[e.key]) {
    snake.direction = keyToDirection[e.key];
  }
});
