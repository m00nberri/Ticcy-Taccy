const gameBoard = (() => {
  let _startRestart = document.getElementById("startRestart");
  let _playButton = document.getElementById("playButton");
  let _closeButton = document.getElementById("closeButton");

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

  function initializeButtons() {
    _startRestart.addEventListener("click", () => {
      document.getElementById("popUpContainer").style.display = "grid";
    });
    _playButton.addEventListener("click", () => {
      gameControl.initializePlayers(
        document.getElementById("p1Name").value,
        document.getElementById("p2Name").value
      );
      gameControl.startGame();
    });
    _closeButton.addEventListener("click", () => {
      document.getElementById("popUpContainer").style.display = "none";
      document.getElementById("popUp").reset();
    });
  }
  function newGame() {
    _clearBoard();
    _populateBoard();
  }
  return {
    newGame: newGame,
    initializeButtons: initializeButtons,
  };
})();

const gameControl = (() => {
  let turn = "X";

  function _coinFlip() {
    if (Math.random() >= 0.5) {
      return "heads";
    } else {
      return "tails";
    }
  }

  function changeTurn() {
    if (turn === "X") {
      turn = "O";
    } else {
      turn = "X";
    }
  }
  function initializePlayers(p1n, p2n) {
    player1 = Player(p1n);
    player2 = Player(p2n);
    document.getElementById("p1Type").checked
      ? player1.isComputer()
      : player1.isHuman();
    document.getElementById("p2Type").checked
      ? player2.isComputer()
      : player2.isHuman();
    if (_coinFlip() === "heads") {
      player1.side = "X";
      player2.side = "O";
    } else {
      player2.side = "X";
      player1.side = "O";
    }
    return {
      player1,
      player2,
      turn,
    };
  }

  function startGame() {
    document.getElementById("popUpContainer").style.display = "none";
    let gameSquares = document.getElementsByClassName("gameSquare");
    for (let i = 0; i < gameSquares.length; i++) {
      gameSquares[i].addEventListener("click", (e) => {
        e.target.textContent = turn;
        changeTurn();
      });
    }
  }

  return {
    initializePlayers,
    startGame,
    changeTurn,
    turn,
  };
})();

const Player = (name, side) => {
  let type = 0;
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
    obj.type = 1;
  }
  function isComputer() {
    obj.type = 0;
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
  const obj = { name, side, type, pointsList, isHuman, isComputer };
  return obj;
};

gameBoard.newGame();
gameBoard.initializeButtons();
