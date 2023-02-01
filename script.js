const gameBoard = (() => {
  let _startRestart = document.getElementById("startRestart");

  function _clearBoard() {
    let board = document.getElementById("gameBoard");
    let boardChild = board.firstElementChild;
    while (boardChild) {
      boardChild.remove();
      boardChild = board.firstElementChild;
    }
  }
  function _populateBoard() {
    let board = document.getElementById("gameBoard");
    for (let i = 1; i <= 9; i++) {
      let newSquare = document.createElement("div");
      newSquare.classList.add("gameSquare");
      newSquare.id = i;
      newSquare.textContent = i;
      board.appendChild(newSquare);
    }
  }

  function initializeButton() {
    _startRestart.addEventListener("click", () => {
      document.getElementById("popUpContainer").style.display = "grid";
    });
  }
  function newGame() {
    _clearBoard();
    _populateBoard();
  }
  return {
    newGame: newGame,
    initializeButton: initializeButton,
  };
})();

const gameControl = (() => {})();

const Player = (name, side) => {
  let playerType = 0;
  let pointsList = [];
  let winningCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  function isHuman() {
    playerType = 1;
  }
  function isComputer() {
    playerType = 0;
  }
  function checkWin() {
    for (i = 0; i < winningCombos.length; i++) {
      if (
        pointsList.filter((point) => winningCombos[i].includes(point))
          .length === 3
      ) {
        //win!
      }
    }
  }
};

gameBoard.newGame();
gameBoard.initializeButton();
