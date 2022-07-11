let ROW = 3,
  COL = 3;

let gameBord = document.querySelector(".game-bord");
let boxes = gameBord.childNodes;
let gameOverCover = document.querySelector(".game-over");
let wins = document.querySelector(".wins");
let reset = document.querySelector(".reset");

gameBord.addEventListener("mousedown", (e) => e.preventDefault());
gameOverCover.addEventListener("mousedown", (e) => e.preventDefault());
wins.addEventListener("mousedown", (e) => e.preventDefault());

gameBord.addEventListener("touchstart", (e) => e.preventDefault());
gameOverCover.addEventListener("touchstart", (e) => e.preventDefault());
wins.addEventListener("touchstart", (e) => e.preventDefault());

for (let i = 0; i < 9; i++) {
  let div = document.createElement("div");
  gameBord.appendChild(div);
}

let game = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function apllyChanges() {
  let i = 0;
  for (let row = 0; row < ROW; row++) {
    for (let col = 0; col < COL; col++) {
      boxes[i++].textContent = game[row][col];
    }
  }
}

for (let i = 0; i < ROW * COL; i++) {
  boxes[i].addEventListener("mousedown", (event) => change(event, i));
}

let numberOfMoves = 0;
function change(Event, i) {
  let char = "O";
  if (numberOfMoves % 2 == 1) char = "X";

  let row = Math.floor(i / ROW),
    col = i % COL;

  if (game[row][col] != "") return;
  game[row][col] = char;

  if (checkIfWin(char, row, col)) {
    hasAWinner(char);
    apllyChanges();
    return;
  }
  apllyChanges();
  if (++numberOfMoves >= ROW * COL) {
    gameOver();
  }
}

function gameOver() {
  gameOverCover.style.display = "block";
  wins.style.display = "flex";
  wins.textContent = "Game Over";
}

function hasAWinner(char) {
  gameOverCover.style.display = "block";
  wins.style.display = "flex";
  wins.textContent = char + " Wins";
}

function checkIfWin(char, row, col) {
  console.log(row, col);
  if (game[row][col] == char) {
    try {
      if (game[row][col + 1] == char && game[row][col + 2] == char) return true;
    } catch (error) {}
    try {
      if (game[row][col - 1] == char && game[row][col - 2] == char) return true;
    } catch (error) {}
    try {
      if (game[row][col + 1] == char && game[row][col - 1] == char) return true;
    } catch (error) {}

    try {
      if (game[row + 1][col] == char && game[row + 2][col] == char) return true;
    } catch (error) {}
    try {
      if (game[row - 1][col] == char && game[row - 2][col] == char) return true;
    } catch (error) {}
    try {
      if (game[row + 1][col] == char && game[row - 1][col] == char) return true;
    } catch (error) {}

    try {
      if (game[row + 1][col + 1] == char && game[row + 2][col + 2] == char)
        return true;
    } catch (error) {}
    try {
      if (game[row - 1][col - 1] == char && game[row - 2][col - 2] == char)
        return true;
    } catch (error) {}
    try {
      if (game[row + 1][col + 1] == char && game[row - 1][col - 1] == char)
        return true;
    } catch (error) {}

    try {
      if (game[row - 1][col + 1] == char && game[row - 2][col + 2] == char)
        return true;
    } catch (error) {}
    try {
      if (game[row + 1][col - 1] == char && game[row + 2][col - 2] == char)
        return true;
    } catch (error) {}
    try {
      if (game[row - 1][col + 1] == char && game[row + 1][col - 1] == char)
        return true;
    } catch (error) {}
  }

  return false;
}

reset.addEventListener("mousedown", (e) => resetGame(e));

function resetGame(Event) {
  gameOverCover.style.display = "none";
  wins.style.display = "none";
  game = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  apllyChanges();
  numberOfMoves = 0;
}
