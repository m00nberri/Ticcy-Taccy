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
      newSquare.classList.add("validPlay");
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
    _playRound();
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
      gameSquares[i].addEventListener("click", _gameClick);
    }
    _playRound();
  }

  function _playRound() {
    if (player1.side === turn) {
      if (player1.type === 1) {
        console.log("player 1 play please");
      } else if (player1.type === 0) {
        let chosenSquare = player1.computerPlay(turn);
        chosenSquare.removeEventListener("click", _gameClick);
        chosenSquare.classList.remove("validPlay");
        changeTurn();
      }
    } else {
      if (player2.type === 1) {
        console.log("player 2 play please");
      } else if (player2.type === 0) {
        let chosenSquare = player2.computerPlay(turn);
        chosenSquare.removeEventListener("click", _gameClick);
        chosenSquare.classList.remove("validPlay");
        changeTurn();
      }
    }
  }
  function _gameClick(e) {
    if (player1.side === turn) {
      player1.play(e, turn);
    } else {
      player2.play(e, turn);
    }
    e.target.removeEventListener("click", _gameClick);
    e.target.classList.remove("validPlay");
    changeTurn();
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
  function play(e, turn) {
    e.target.textContent = turn;
    pointsList.push(e.target.id);
    checkWin();
  }
  function computerPlay(turn) {
    let validSquares = document.getElementsByClassName("validPlay");
    let computerChoice = Math.floor(Math.random() * (validSquares.length + 1));
    let computerSquare = validSquares[computerChoice];
    computerSquare.textContent = turn;
    pointsList.push(computerSquare.id);
    checkWin();
    return {
      computerSquare,
    };
  }
  function checkWin() {
    for (i = 0; i < winningCombos.length; i++) {
      if (
        pointsList.filter((point) => winningCombos[i].includes(point))
          .length === 3
      ) {
        alert("woopiedoo");
      }
    }
  }
  const obj = {
    name,
    side,
    type,
    pointsList,
    isHuman,
    isComputer,
    play,
    computerPlay,
  };
  return obj;
};

gameBoard.newGame();
gameBoard.initializeButtons();
