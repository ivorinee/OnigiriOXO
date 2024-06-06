import Button from "./Button";

function GameStatus({ win, gameOnGoing, currentPlayer, restartGame }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-center mt-8 text-lg font-semibold text-neutral-600">
        {win
          ? `${currentPlayer} won the game!`
          : gameOnGoing
          ? `${currentPlayer}'s Turn!`
          : "Draw!"}
      </p>
      {!gameOnGoing && (
        <Button
          name="restartButton"
          onClick={restartGame}
          desc="Restart Game"
        />
      )}
    </div>
  );
}

export default GameStatus;
