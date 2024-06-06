import Button from "./Button";

function GameStatus({ win, gameOnGoing, currentPlayer, restartGame }) {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-bungee text-center mt-6 text-4xl font-black text-blue-800 small-text">
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
