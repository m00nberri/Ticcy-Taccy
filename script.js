const gameBoard = (() => {
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
      board.appendChild(newSquare);
    }
  }

  function newGame() {
    _clearBoard();
    _populateBoard();
  }
  return {
    newGame: newGame,
  };
})();

gameBoard.newGame();
