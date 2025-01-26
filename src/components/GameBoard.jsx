import { useState } from "react";
import ResetButton from "./ResetButton";
import ScoreDisplay from "./ScoreDisplay";

const GameBoard = () => {
  const initialGrid = Array(5).fill(null).map(() => Array(5).fill(null));

  const [grid, setGrid] = useState(initialGrid);
  const [currentChar, setCurrentChar] = useState("C");
  const [linesCount, setLinesCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleCellClick = (row, col) => {
    if (grid[row][col] || gameOver) return;

    const newGrid = [...grid];
    newGrid[row][col] = currentChar;
    setGrid(newGrid);
    countLines();

    setCurrentChar(currentChar === "C" ? "M" : currentChar === "M" ? "T" : "C");

    if (!newGrid.flat().includes(null)) {
      setGameOver(true);
    }
  };

  const countLines = () => {
    const rowCount = grid.length;
    const colCount = grid[0].length;
    let totalCount = 0;

    function countMatchesInDiagonal(startRow, startCol, rowStep, colStep) {
      let current = null;
      let streak = 0;
      let diagonalCount = 0;

      while (
        startRow >= 0 &&
        startRow < rowCount &&
        startCol >= 0 &&
        startCol < colCount
      ) {
        if (grid[startRow][startCol] === current) {
          streak++;
        } else {
          current = grid[startRow][startCol];
          streak = 1;
        }

        if (streak === 3) {
          diagonalCount++;
        }

        startRow += rowStep;
        startCol += colStep;
      }

      return diagonalCount;
    }

    for (let i = 0; i < rowCount; i++) {
      let current = null;
      let streak = 0;

      for (let j = 0; j < colCount; j++) {
        if (grid[i][j] === current) {
          streak++;
        } else {
          current = grid[i][j];
          streak = 1;
        }

        if (streak === 3) {
          totalCount++;
        }
      }
    }

    for (let j = 0; j < colCount; j++) {
      let current = null;
      let streak = 0;

      for (let i = 0; i < rowCount; i++) {
        if (grid[i][j] === current) {
          streak++;
        } else {
          current = grid[i][j];
          streak = 1;
        }

        if (streak === 3) {
          totalCount++;
        }
      }
    }

    for (let row = 0; row < rowCount; row++) {
      totalCount += countMatchesInDiagonal(row, 0, 1, 1);
    }
    for (let col = 1; col < colCount; col++) {
      totalCount += countMatchesInDiagonal(0, col, 1, 1);
    }

    for (let row = 0; row < rowCount; row++) {
      totalCount += countMatchesInDiagonal(row, 0, -1, 1);
    }
    for (let col = 1; col < colCount; col++) {
      totalCount += countMatchesInDiagonal(rowCount - 1, col, -1, 1);
    }

    setLinesCount(totalCount);
  }

  const resetGame = () => {
    setGrid(initialGrid);
    setCurrentChar("C");
    setGameOver(false);
  };

  return (
    <div>
      <table>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell ? cell : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <ScoreDisplay linesCount={linesCount} gameOver={gameOver} />
      <ResetButton onReset={resetGame} />
    </div>
  );
};

export default GameBoard;
