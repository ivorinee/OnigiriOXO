import { useState } from "react";
import Board from "./Components/Board";
import "./index.css";
import GameStatus from "./Components/GameStatus";
import Button from "./Components/Button";

function App() {
  const initialBoardState = {
    position1: ["", [1, 3]],
    position2: ["", [2, 2]],
    position3: ["", [2, 3]],
    position4: ["", [2, 4]],
    position5: ["", [3, 1]],
    position6: ["", [3, 2]],
    position7: ["", [3, 3]],
    position8: ["", [3, 4]],
    position9: ["", [3, 5]],
  };

  const [startBtn, setStartBtn] = useState(true);
  const [gameOnGoing, setGameOnGoing] = useState(false);
  const [pyramid, setPyramid] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [prevMove, setPrevMove] = useState("");
  const [boardMark, setBoardMark] = useState(initialBoardState);
  const [win, setWin] = useState(false);

  function handleStartClick() {
    setStartBtn(false);
    setPyramid(true);
    setGameOnGoing(true);
  }

  function handlePlayerChoice(event) {
    const pos = event.target.name;
    setBoardMark((prevValue) => {
      // Check whether grid is empty
      if (prevValue[pos][0] === "") {
        const newBoardMark = {
          ...prevValue,
          [pos]: [currentPlayer, prevValue[pos][1]],
        };

        // Check whether player has won or board is full
        if (checkWin(newBoardMark, currentPlayer)) {
          setGameOnGoing(false);
          setWin(true);
        } else if (isBoardFull(newBoardMark)) {
          setGameOnGoing(false);
        } else {
          setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
          setPrevMove(pos);
        }

        return newBoardMark;
      } else {
        return prevValue;
      }
    });
  }

  function handleUndo() {
    setBoardMark((prevValue) => {
      // Check if undo has been done
      if (boardMark[prevMove][0] === "") {
        return boardMark;
      } else {
        // Removes mark on square
        const newBoardMark = {
          ...prevValue,
          [prevMove]: ["", prevValue[prevMove][1]],
        };
        setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));

        return newBoardMark;
      }
    });
  }

  function checkWin(board, player) {
    const directions = [
      [1, 0], // vertical
      [0, 1], // horizontal
      [1, 1], // diagonal down-right
      [1, -1], // diagonal down-left
    ];

    const playerCoords = Object.keys(board)
      .filter((pos) => board[pos][0] === player)
      .map((pos) => board[pos][1]);

    for (const [dx, dy] of directions) {
      for (const [x, y] of playerCoords) {
        if (
          playerCoords.some(([x1, y1]) => x1 === x + dx && y1 === y + dy) &&
          playerCoords.some(
            ([x2, y2]) => x2 === x + 2 * dx && y2 === y + 2 * dy
          )
        ) {
          return true;
        }
      }
    }
    return false;
  }

  function isBoardFull(board) {
    return Object.values(board).every((value) => value[0] !== "");
  }

  function restartGame() {
    setGameOnGoing(true);
    setCurrentPlayer("X");
    setBoardMark(initialBoardState);
    setWin(false);
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-orange-200">
      <div className="w-1/2 h-2/3 flex flex-col items-center justify-center gap-y-10 p-2 rounded-3xl bg-white drop-shadow-2xl small-container">
        {startBtn && (
          <div>
            <h1>Pyramid</h1>
            <h1>TicTacToe</h1>
            <p className="text-center font-bold pt-5">How to play?</p>
            <p className="text-center">
              Player X and O will alternate turns.
            </p>
            <p className="w-96 text-center">
              The first player to get three-in-a-row vertically, horizontally or
              diagonally wins.
            </p>
            <p className="w-96 text-center italic font-semibold">
              Have Fun!
            </p>
          </div>
        )}
        {startBtn && (
          <Button name="startButton" onClick={handleStartClick} desc="Start" />
        )}
        {pyramid && (
          <div>
            <Board
              boardMark={boardMark}
              handlePlayerChoice={handlePlayerChoice}
              handleUndo={handleUndo}
              win={win}
            />
            <GameStatus
              win={win}
              gameOnGoing={gameOnGoing}
              currentPlayer={currentPlayer}
              restartGame={restartGame}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
