const gameBoard = (() => {
  let _startRestart = document.getElementById("startRestart");
  let _playButton = document.getElementById("playButton");
  let _closeButton = document.getElementById("closeButton");
  let gameDisplay = document.getElementById("gameInfo");

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
      newSquare.innerHTML = "&nbsp";
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
    newGame,
    initializeButtons,
    gameDisplay,
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

  function _checkChange() {
    if (player1.checkWin()) {
      gameBoard.gameDisplay.textContent = `${player1.name} wins!`;
      let remaining = document.querySelectorAll(".validPlay");
      console.log(remaining);
      for (i = 0; i < remaining.length; i++) {
        remove(remaining[i]);
      }
    } else if (player2.checkWin()) {
      gameBoard.gameDisplay.textContent = `${player2.name} wins!`;
      let remaining = document.querySelectorAll(".validPlay");
      for (i = 0; i < remaining.length; i++) {
        remove(remaining[i]);
      }
    } else if (document.getElementsByClassName("validPlay").length === 0) {
      gameBoard.gameDisplay.textContent = `No Winner :(`;
    } else {
      if (turn === "X") {
        turn = "O";
        _playRound();
      } else {
        turn = "X";
        _playRound();
      }
    }
  }

  function remove(targetSquare) {
    targetSquare.removeEventListener("click", _gameClick);
    targetSquare.classList.remove("validPlay");
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
    gameBoard.newGame();
    document.getElementById("popUpContainer").style.display = "none";
    document.getElementById("popUp").reset();
    document.getElementById("startRestart").textContent = "New Game";
    let gameSquares = document.getElementsByClassName("gameSquare");
    for (let i = 0; i < gameSquares.length; i++) {
      gameSquares[i].addEventListener("click", _gameClick);
    }
    _playRound();
  }

  function _playRound() {
    if (player1.side === turn) {
      if (player1.type === 1) {
        gameBoard.gameDisplay.textContent = `${player1.name}'s turn! ( ${player1.side} )`;
      } else if (player1.type === 0) {
        player1.computerPlay(turn);
        _checkChange();
      }
    } else {
      if (player2.type === 1) {
        gameBoard.gameDisplay.textContent = `${player2.name}'s turn! ( ${player2.side} )`;
      } else if (player2.type === 0) {
        player2.computerPlay(turn);
        _checkChange();
      }
    }
  }
  function _gameClick(e) {
    if (player1.side === turn) {
      player1.play(e, turn);
    } else {
      player2.play(e, turn);
    }
    remove(e.target);
    _checkChange();
  }

  return {
    initializePlayers,
    startGame,
    turn,
    remove,
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
    pointsList.push(Number(e.target.id));
  }
  function randomChoice() {
    return (Math.floor(Math.random() * 9) + 1).toString();
  }
  function computerPlay(turn) {
    let computerSquare = document.getElementById(randomChoice());
    console.log(computerSquare);
    if (computerSquare.classList.contains("validPlay")) {
      computerSquare.textContent = turn;
      pointsList.push(Number(computerSquare.id));
      console.log(
        `computer's points list is ${pointsList} after adding ${computerSquare.id}`
      );
      gameControl.remove(computerSquare);
    } else {
      computerPlay(turn);
    }
  }
  function checkWin() {
    console.log(`Checking win for ${name}... points list is ${pointsList}`);
    console.log(pointsList);
    for (i = 0; i < winningCombos.length; i++) {
      let temp = pointsList.filter((point) => winningCombos[i].includes(point));
      if (temp.length === 3) {
        for (w = 0; w < temp.length; w++) {
          document.getElementById(temp[w].toString()).style.backgroundColor =
            "gold";
        }
        return true;
      }
    }
  }
  const obj = {
    name,
    side,
    type,
    isHuman,
    isComputer,
    play,
    computerPlay,
    checkWin,
  };
  return obj;
};

gameBoard.initializeButtons();
