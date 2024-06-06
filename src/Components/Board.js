import redoArrow from "../redo-arrow.svg";

function Board({ boardMark, handlePlayerChoice, win, handleUndo }) {
  const isBoardEmpty = Object.values(boardMark).every((pos) => pos[0] === "");

  return (
    <div className=" grid grid-rows-3 grid-cols-5 gap-1 items-center justify-center">
      <button
        name="undo"
        className="col-span-1 size-12 place-self-center"
        onClick={handleUndo}
        disabled={isBoardEmpty || win}
      >
        <img src={redoArrow} alt="Redo"/>
      </button>
      {Object.keys(boardMark).map((pos) => (
        <button
          key={pos}
          type="button"
          name={pos}
          className={`btn-primary items-center justify-center row-start-${boardMark[pos][1][0]} col-start-${boardMark[pos][1][1]} col-span-1`}
          onClick={handlePlayerChoice}
          disabled={win}
        >
          {boardMark[pos][0]}
        </button>
      ))}
    </div>
  );
}

export default Board;
