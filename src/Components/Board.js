function Board({ boardMark, handlePlayerChoice, win }) {
    return (
        <div className=" grid grid-rows-3 grid-cols-5 gap-1 items-center justify-center">
        {Object.keys(boardMark).map((pos) => (
          <button
            key={pos}
            type="button"
            name={pos}
            className={`btn-primary items-center justify-center row-start-${boardMark[pos][1][0]} col-start-${boardMark[pos][1][1]}  col-span-1`}
            onClick={handlePlayerChoice}
            disabled={win === true}
          >
            {boardMark[pos][0]}
          </button>
        ))}
      </div>
    );
  }
  
  export default Board;