import React from "react";

const ScoreDisplay = ({ linesCount, gameOver }) => {
  return (
    <div className="score-display">
      {gameOver ? (
        <p>
          {linesCount > 0
            ? `Congratulations, you have ${linesCount} lines!`
            : "You have no lines, try again!"}
        </p>
      ) : (
        <p>Game in progress...</p>
      )}
    </div>
  );
};

export default ScoreDisplay;
